import React from 'react'
import Paper from 'material-ui/Paper'
import styled from 'styled-components'
import { compose, withHandlers, setDisplayName } from 'recompose'
import { inject, observer } from 'mobx-react'
import Typography from 'material-ui/Typography'
import { CircularProgress } from 'material-ui/Progress';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import ContentBody from './ContentBody'


const enhance = compose(
    inject('subredditStore'),
    withHandlers({

    }),
    observer,
)

const Container = styled(Paper)`
    margin-left: 8px !important;
    padding: 80px 16px 16px 16px !important;
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
    return (
        <Container color="white">
            <ContentBody html={props.subredditStore.subreddit.description_html} />
        </Container>
    )
})
