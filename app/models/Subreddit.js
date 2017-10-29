import { observable, action } from 'mobx'

export default class Subreddit {
    
    @observable display_name: string
    @observable description_html: string
    api: object

    constructor(subreddit){
        this.display_name = subreddit.display_name
        // this.description_html = subreddit.description_html
        this.api = subreddit
        console.log('Subreddit', this)
    }
}