import React from 'react'
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { CircularProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List'
import Typography from 'material-ui/Typography'
import styled from 'styled-components'
import { compose, lifecycle, setDisplayName } from 'recompose'
import { inject, observer } from 'mobx-react'

const enhance = compose(
    inject('subreddit'),
    lifecycle({
        componentDidMount() {
            setTimeout(() => SubredditStore.fetch(), 2000)
        }

    }),
    setDisplayName('PostList'),
    observer,
)

const Container = styled(Grid)`
    overflow-y: auto;
    height: 100vh;
`

const StyledCircularProgress = styled(CircularProgress)`
    width: 100%;
    padding: 16px;
`

const TopicCard = styled(Card) `
    background-color: ${props => props.active ? '#fff' : '#f4f6fa'} !important;
    ${props => props.active ? 'margin: 30px 0px;' : ''}
    width: 100%;
`

export default enhance((props) => {
    return (
        <Container container direction='row' justify='center'>
            {
                props.subreddit.loading
                    ? <StyledCircularProgress />
                    : props.subreddit.posts.map(d => {
                        return (
                            <TopicCard key={d.name} active={d.active} elevation={d.active ? 0 : 0}>
                                <CardContent>
                                    <Typography title>{d.title}</Typography>
                                </CardContent>
                            </TopicCard>
                        )
                    })
            }
        </Container>
    )
}
)
