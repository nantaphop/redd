import Snoowrap from 'snoowrap'
import config from '../config'
import StorageService from './StorageService'
import SubredditStore from '../store/SubredditStore'

const DEFAULT_SCOPE = [
    'identity',
    'edit',
    'flair',
    'history',
    'modconfig',
    'modflair',
    'modlog',
    'modposts',
    'modwiki',
    'mysubreddits',
    'privatemessages',
    'read',
    'report',
    'save',
    'submit',
    'subscribe',
    'vote',
    'wikiedit',
    'wikiread',
]

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'

let r: Snoowrap
(async () => {
    let refreshToken = await StorageService.refreshToken()
    if (refreshToken) {
        r = await new Snoowrap({
            clientId: config.clientId,
            refreshToken,
            userAgent: USER_AGENT,
            accessToken: 'expired',
        })
        SubredditStore.fetch()
    }
})()

export const getAuthUrl = (state: string) => Snoowrap.getAuthUrl({
    clientId: config.clientId,
    // redirectUri: 'http://oauthcallback',
    redirectUri: 'http://oauthcallback',
    permanent: true,
    scope: DEFAULT_SCOPE,
    state,
})
export const fromAuthCode = async (code: string) => {
    r = await Snoowrap.fromAuthCode({
        clientId: config.clientId,
        redirectUri: 'http://oauthcallback',
        code,
        userAgent: USER_AGENT,
    })
    StorageService.refreshToken(r.refreshToken)
    console.log('fromAuthCode', r)
    return r
}

export default () => r
