import { observable, action, toJS, autorun } from 'mobx'
import electron from 'electron'
import RedditService, { getAuthUrl, fromAuthCode } from '../services/RedditService'
import StorageService from '../services/StorageService'
import { SubredditStore } from './'
const {TouchBarLabel, TouchBarButton, TouchBarSpacer, TouchBarSegmentedControl} = electron.remote.TouchBar


const authUrl = getAuthUrl('sdfsdfwef8373')

class ViewStore {
    @observable currentView: string = 'home'
    @observable viewData: object = {}

    @observable currentUser: string = null
    @observable subscriptions: SubReddit[] = null

    @action setView = (viewName: string, viewData: object) => {
        this.currentView = viewName
        this.viewData = viewData || {}
    }

    @action performLogin = async () => {
        let authWindow = new electron.remote.BrowserWindow({
            width: 800,
            height: 600,
            show: false,
            'node-integration': false,
            'web-security': false,
        });
        authWindow.loadURL(authUrl);
        authWindow.show();
        authWindow.webContents.on('will-navigate', async (event, newUrl) => {
            if (newUrl.startsWith('http://oauthcallback')) {
                await fromAuthCode(newUrl.split('code=')[1])
                this.currentUser = await RedditService().getMe()
                this.subscriptions = await RedditService().getSubscriptions()
                await StorageService.currentUser(toJS(this.currentUser))
                await StorageService.subscriptions(toJS(this.subscriptions))
                authWindow.close()
            } else {
                console.log('loginFail', newUrl)
                authWindow.close()
            }
        });
        authWindow.on('closed', function () {
            authWindow = null;
        });
    }

    @action reloadFromStorage = async () => {
        console.log('ViewStore start reloadFromStorage')
        this.currentUser = await StorageService.currentUser()
        this.subscriptions = await StorageService.subscriptions()
        console.log('ViewStore done reloadFromStorage')
    }
}

const store = new ViewStore()
store.reloadFromStorage()

autorun(() => {
    console.log('Update Current User', store.currentUser)
})
autorun(() => {
    console.log('Update Subscribtions', store.subscriptions)
    const subBtns = store.subscriptions.map(sub => {
        return new TouchBarButton({
            label: sub.display_name,
        })
    })
    let segment = new TouchBarSegmentedControl({
        segments: subBtns,
        mode: 'single',

    })
    const touchbar = new electron.remote.TouchBar([segment])
    electron.remote.getCurrentWindow().setTouchBar(touchbar)
})

export default store