import React from 'react'
import Paper from 'material-ui/Paper'
import styled from 'styled-components'
import { compose, withHandlers, setDisplayName } from 'recompose'
import { inject, observer } from 'mobx-react'
import Typography from 'material-ui/Typography'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import SubmissionCard from './SubmissionCard'

const enhance = compose(
    inject('submissionStore'),
    withHandlers({

    }),
    observer,
)

const Container = styled.div`
    min-height: 100vh;
    margin-left: 0px !important;
    padding: 80px 16px 16px 0px !important;
    overflow-y: auto;
    height: 100vh;

`

export default enhance((props) => {
    if (!props.submissionStore.submission) {
        return null
    }
    return (
        <Container>
            <SubmissionCard submission={props.submissionStore.submission} />
            {
                
            }
            <Typography>
            <pre>
                {JSON.stringify(props.submissionStore.replies, null, 2)}
            </pre>
            </Typography>
        </Container>
    )
})
