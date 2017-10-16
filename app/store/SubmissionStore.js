import { observable, action, autorun } from 'mobx'
import RedditService from '../services/RedditService'


class SubmissionStore {
    @observable submission
    @observable replies: object[] = []
    @observable loading: boolean = false
    submissionProxy

    @action view = async (submission: object) => {
        this.submission = submission
        this.replies = []
        this.submissionProxy = await RedditService().getSubmission(this.submission.id)        
        this.fetchComment()
    }

    @action fetchComment = async () => {
        this.loading = true
        this.replies = await this.submissionProxy.comments
        this.loading = false
    }

}

const store = new SubmissionStore()
autorun(() => console.log('SubmissionStore', store))
// setInterval(() => store.submissions.push({title: 'fs'}), 1000)
export default store
