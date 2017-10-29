import { observable, action } from 'mobx'

export default class RedditUser {
    
    @observable name: string
    api

    constructor(redditUser){
        this.name = redditUser.name
        this.api = redditUser
    }
}