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
    inject('view'),
    inject('subreddit'),
    withHandlers({
        handleViewSubreddit: props => subredditName => () => props.subreddit.view(subredditName),
        isActive: props => subredditName => {
            console.log('props.subreddit.subreddit === subredditName', props.subreddit.subreddit === subredditName)
            return props.subreddit.subreddit === subredditName
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
    
`

export default enhance((props: Props) => {

    console.log(JSON.stringify(props.view.subscriptions && JSON.stringify(props.view.subscriptions[0], null, 2)))
    return (
        <div>
            <Header />
            <StyledList>
                {
                    props.view.subscriptions
                        ? props.view.subscriptions.map(subreddit => (
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
        </div>
    )
})

/*

 */