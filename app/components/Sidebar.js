import React from 'react'
import styled from 'styled-components'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import { withTheme } from 'material-ui/styles';
import Header from './Header'
import { getAuthUrl, fromAuthCode } from '../services/RedditService'
import electron from 'electron'
import { compose, withHandlers } from 'recompose'
import { inject, observer } from 'mobx-react'
import type {Subreddit } from 'snoowrap'
import {transition} from '../utils/TransitionUtils'


const authUrl = getAuthUrl('sdfsdfwef8373')


const enhance = compose(
    inject('viewStore'),
    inject('subredditStore'),
    withHandlers({
        handleViewSubreddit: props => subreddit => () => props.subredditStore.view(subreddit),
        isActive: props => subredditName => {
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
const Container = styled(Paper) `
    padding-top: 64px;
    padding-bottom: 16px;
    position: fixed;
    left: 0;
    transition: ${transition(['width'])};
    width: ${props => props.showSidebar ? '240px' : '0px'};
    height: 100%;
`

export default enhance((props: Props) => {
    return (
        <Container showSidebar={props.viewStore.showSidebar} theme={props.theme}>
            <StyledList>
                <StyledListItem
                    button
                    onClick={props.handleViewSubreddit('')}
                    active={props.isActive('')}
                    theme={props.theme}
                >
                    <SubredditName primary="Front Page" />
                </StyledListItem>
                <StyledListItem
                    button
                    onClick={props.handleViewSubreddit('all')}
                    active={props.isActive('all')}
                    theme={props.theme}
                >
                    <SubredditName primary="All" />
                </StyledListItem>
                {
                    props.viewStore.subscriptions
                        ? props.viewStore.subscriptions.map(subreddit => (
                            <StyledListItem
                                button
                                onClick={props.handleViewSubreddit(subreddit)}
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