import { observable, action } from 'mobx'
import RedditUser from './RedditUser'
import Subreddit from './Subreddit'

export default class Submission {

    @observable id: string
    @observable url: string
    @observable title: string
    @observable name: string
    @observable thumbnail: object
    @observable likes: boolean
    @observable created_utc: number
    @observable active: boolean
    @observable selftext: string
    @observable selftext_html: string
    @observable score: number
    @observable num_comments: number
    @observable.ref author: object
    @observable.ref subreddit: object
    api: object
    
    constructor(submission){
        this.id = submission.id
        this.url = submission.url
        this.title = submission.title
        this.name = submission.name
        this.thumbnail = submission.thumbnail
        this.created_utc = submission.created_utc
        this.likes = submission.likes
        this.active = submission.active
        this.selftext = submission.selftext
        this.selftext_html = submission.selftext_html
        this.score = submission.score
        this.num_comments = submission.num_comments
        this.author = new RedditUser(submission.author)
        this.subreddit = new Subreddit(submission.subreddit)
        this.api = submission
    }

    @action.bound handleUpvote = (e) => {
        e.stopPropagation()
        this.api.upvote()
        this.likes = true
    }

    @action.bound handleDownvote = (e) => {
        e.stopPropagation()
        this.api.downvote()
        this.likes = false
    }
}
