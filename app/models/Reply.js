import { observable, action } from 'mobx'
import RedditUser from './RedditUser'
import Subreddit from './Subreddit'

export default class Reply {

    @observable id: string
    @observable name: string
    @observable created_utc: number
    @observable likes: boolean
    @observable body_html: string
    @observable score: number
    @observable replies: object[]
    @observable.ref author: object
    api: object
    
    constructor(reply){
        this.id = reply.id
        this.name = reply.name
        this.created_utc = reply.created_utc
        this.likes = reply.likes
        this.body_html = reply.body_html
        this.score = reply.score
        this.replies = reply.replies.map(r => new Reply(r))
        this.author = new RedditUser(reply.author)
        this.api = reply
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
