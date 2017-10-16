import { observable, action, autorun, extendObservable } from 'mobx'
import Snoowrap, { } from 'snoowrap'
import RedditService from '../services/RedditService'


class SubredditStore {
    @observable submissions = []
    @observable loading: boolean = false
    @observable count = 8
    @observable mode = 'getHot'
    @observable subreddit = 'android'
    @observable test = 1

    @action view = async (subredditName: string) => {
        this.subreddit = subredditName
        this.fetch()
    }

    @action fetch = async () => {
        this.loading = true
        this.submissions = await RedditService()[this.mode](this.subreddit, {
            limit: 10,
        })
        this.loading = false
    }

    @action fetchMore = async () => {
        this.loading = true
        this.submissions = this.submissions.concat(await RedditService()[this.mode](this.subreddit, {
            after: this.submissions[this.submissions.length - 1].name,
            count: this.submissions.length,
            limit: 10,
        }))
        this.loading = false
    }

}

const store = new SubredditStore()
autorun(() => console.log(store))
// setInterval(() => store.submissions.push({title: 'fs'}), 1000)
export default store
