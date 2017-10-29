import { observable, action } from 'mobx'

export default class Subreddit {

    @observable display_name: string
    @observable description_html: string
    api: object

    constructor(subreddit, lazy) {
        this.display_name = subreddit.display_name
        if (!lazy) {
            if (this.display_name !== 'all' && this.display_name !== 'hot') {
                this.description_html = subreddit.description_html
            } else {
                this.description_html = ""
            }
        }
        this.api = subreddit
        console.log('Subreddit', this)
    }
}