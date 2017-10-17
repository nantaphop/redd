import React from 'react'
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { CircularProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List'
import Typography from 'material-ui/Typography'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import styled from 'styled-components'
import { compose, lifecycle, setDisplayName, withHandlers } from 'recompose'
import { inject, observer } from 'mobx-react'
import SubmissionCard from './SubmissionCard'

const enhance = compose(
    inject('viewStore'),
    inject('subredditStore'),
    inject('submissionStore'),
    setDisplayName('SubmissionList'),
    observer,
)

const Container = styled.div`
    overflow-y: auto;
    height: 100vh;
    padding: 80px 0px 16px 0px !important;
`

const LoadingContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 16px;
`

export default enhance((props) => {
    return (
        <Container container direction='row' justify='center'>
            {
                props.subredditStore.loading
                    ? <LoadingContainer>
                        <CircularProgress />
                    </LoadingContainer>
                    : props.subredditStore.submissions.map(d => {
                        return (
                            <SubmissionCard submission={d} />
                        )
                    })
            }
        </Container>
    )
}
)
