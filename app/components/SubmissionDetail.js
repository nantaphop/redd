import React from 'react'
import Paper from 'material-ui/Paper'
import styled from 'styled-components'
import { compose, withHandlers, setDisplayName } from 'recompose'
import { inject, observer } from 'mobx-react'
import Typography from 'material-ui/Typography'
import { CircularProgress } from 'material-ui/Progress';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import SubmissionCard from './SubmissionCard'
import ReplyCard from './ReplyCard'

const enhance = compose(
    inject('submissionStore'),
    withHandlers({

    }),
    observer,
)

const Container = styled.div`
    margin-left: 0px !important;
    padding: 80px 0px 16px 8px !important;
    overflow-y: auto;
    height: calc(100vh - 64px);

`
const LoadingContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 16px;
`

export default enhance((props) => {
    if (!props.submissionStore.submission) {
        return null
    }
    return (
        <Container>
            <SubmissionCard submission={props.submissionStore.submission} fullContent/>
            {
                props.submissionStore.loading
                    ? <LoadingContainer>
                        <CircularProgress />
                    </LoadingContainer>
                    : props.submissionStore.replies.map(reply => <ReplyCard reply={reply} />)
            }
        </Container>
    )
})
