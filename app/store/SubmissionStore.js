import { observable, action, autorun } from 'mobx'
import RedditService from '../services/RedditService'
import Reply from '../models/Reply'


class SubmissionStore {
    @observable submission
    @observable replies: object[] = []
    @observable loading: boolean = false
    @observable collapseReplies: object = observable.map({})
    submissionProxy

    @action view = async (submission: object) => {
        this.submission = submission
        this.replies = []
        this.submissionProxy = await RedditService().getSubmission(this.submission.id)
        this.fetchComment()
    }

    @action fetchComment = async () => {
        this.loading = true
        this.replies = (await this.submissionProxy.comments).map(r => new Reply(r))
        this.loading = false
    }

    @action handleToggleReply = (replyName) => () => {
        if (this.collapseReplies.get(replyName)) {
            this.collapseReplies.delete(replyName)
        } else {
            this.collapseReplies.set(replyName, true)
        }
    }

    @action isExpanding = replyName => !this.collapseReplies.has(replyName)

}

const store = new SubmissionStore()
autorun(() => console.log('SubmissionStore', store))
// setInterval(() => store.submissions.push({title: 'fs'}), 1000)
export default store
