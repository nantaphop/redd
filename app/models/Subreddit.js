import { observable, action } from 'mobx'

export default class Subreddit {
    
    @observable display_name: string
    api: object

    constructor(subreddit){
        this.display_name = subreddit.display_name
        this.api = subreddit
    }
}