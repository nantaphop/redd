import React from 'react'
import styled from 'styled-components'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import { withTheme } from 'material-ui/styles';
import Header from './Header'
import { getAuthUrl, fromAuthCode } from '../services/RedditService'
import electron from 'electron'
import { compose, withHandlers } from 'recompose'
import { inject, observer } from 'mobx-react'
import type {Subreddit } from 'snoowrap'


const authUrl = getAuthUrl('sdfsdfwef8373')


const enhance = compose(
    inject('viewStore'),
    inject('subredditStore'),
    withHandlers({
        handleViewSubreddit: props => subredditName => () => props.subredditStore.view(subredditName),
        isActive: props => subredditName => {
            console.log('props.subredditStore.subreddit === subredditName', props.subredditStore.subreddit === subredditName)
            return props.subredditStore.subreddit === subredditName
        },
    }),
    withTheme(),
    observer,
)

const StyledList = styled(List) `
    overflow-y: auto;
    height: calc(100vh - 64px);
`
const SubredditName = styled(ListItemText) `
    
`


const StyledListItem = styled(ListItem) `
    ${props => props.active ? `
        background-color: ${props.theme.palette.action.active} !important;
        h3 {
            color: ${props.theme.palette.getContrastText(props.theme.palette.action.active)} !important;
            font-weight: bold;            
        }
    ` : ''}
    
`
const Container = styled.div`
    padding-top: 72px;
`

export default enhance((props: Props) => {

    console.log(JSON.stringify(props.viewStore.subscriptions && JSON.stringify(props.viewStore.subscriptions[0], null, 2)))
    return (
        <Container>
            <Header />
            <StyledList>
                {
                    props.viewStore.subscriptions
                        ? props.viewStore.subscriptions.map(subreddit => (
                            <StyledListItem
                                button
                                onClick={props.handleViewSubreddit(subreddit.display_name)}
                                active={props.isActive(subreddit.display_name)}
                                theme={props.theme}
                            >
                                <SubredditName primary={subreddit.display_name} />
                            </StyledListItem>
                        ))
                        : null
                }
            </StyledList>
        </Container>
    )
})

/*

 */