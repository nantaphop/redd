import { observable, action, autorun, extendObservable, computed } from 'mobx'
import Snoowrap, { } from 'snoowrap'
import RedditService from '../services/RedditService'


class SubredditStore {
    @observable submissions = []
    @observable loading: boolean = false
    @observable loadingMore: boolean = false
    @observable count = 8
    @observable mode = 'Hot'
    @observable subreddit = ''
    @observable test = 1

    @computed get fetchFunction() {
        const modeMapping = {
            Hot: 'getHot',
            Top: 'getTop',
            New: 'getNew',
        }
        return modeMapping[this.mode]
    }

    @action view = async (subredditName: string) => {
        this.subreddit = subredditName
        this.fetch()
    }

    @action fetch = async () => {
        this.loading = true
        this.submissions = await RedditService()[this.fetchFunction](this.subreddit, {
            limit: 10,
        })
        this.loading = false
    }

    @action setMode = async (newMode) => {
        this.mode = newMode
        this.fetch()
    }

    @action fetchMore = async () => {
        if (this.submissions.length > 0) {
            this.loadingMore = true
            this.submissions = this.submissions.concat(await RedditService()[this.fetchFunction](this.subreddit, {
                after: this.submissions[this.submissions.length - 1].name,
                count: this.submissions.length,
                limit: 10,
            }))
            this.loadingMore = false
        }
    }

}

const store = new SubredditStore()
autorun(() => console.log(store))
// setInterval(() => store.submissions.push({title: 'fs'}), 1000)
export default store
