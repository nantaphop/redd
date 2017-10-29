import { observable, action, autorun, extendObservable, computed } from 'mobx'
import Snoowrap, { } from 'snoowrap'
import RedditService from '../services/RedditService'
import Submission from '../models/Submission'
import Subreddit from '../models/Subreddit'
import SubmissionStore from './SubmissionStore'

class SubredditStore {
    @observable submissions = []
    @observable loading: boolean = false
    @observable loadingMore: boolean = false
    @observable count = 8
    @observable mode = 'Hot'
    @observable subreddit
    @observable test = 1
    @observable showDescription = false

    @computed get fetchFunction() {
        const modeMapping = {
            Hot: 'getHot',
            Top: 'getTop',
            New: 'getNew',
        }
        return modeMapping[this.mode]
    }

    @action view = async (subreddit) => {
        this.subreddit = typeof subreddit === 'string' ? new Subreddit(RedditService().getSubreddit(subreddit)) : subreddit
        this.fetch()
    }

    @action.bound toggleDescription = () => {
        this.showDescription = !this.showDescription
        if (this.showDescription) {
            SubmissionStore.closeSubmission()
        }
    }

    @action.bound hideDescription = () => {
        this.showDescription = false
    }

    @action fetch = async () => {
        this.loading = true
        this.submissions = await RedditService()[this.fetchFunction](this.subreddit.display_name, {
            limit: 10,
        }).map(transformSubmission)
        this.loading = false
    }

    @action setMode = async (newMode) => {
        this.mode = newMode
        this.fetch()
    }

    @action fetchMore = async () => {
        if (this.submissions.length > 0) {
            this.loadingMore = true
            this.submissions = this.submissions.concat(await RedditService()[this.fetchFunction](this.subreddit.display_name, {
                after: this.submissions[this.submissions.length - 1].name,
                count: this.submissions.length,
                limit: 10,
            }).map(transformSubmission))
            this.loadingMore = false
        }
    }

}

const transformSubmission = submission => new Submission(submission)

const store = new SubredditStore()
autorun(() => console.log(store))
// setInterval(() => store.submissions.push({title: 'fs'}), 1000)
export default store
