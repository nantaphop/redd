import React from 'react'
import styled from 'styled-components'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
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
    }),
    observer,
)

const StyledList = styled(List) `
    overflow-y: auto;
    height: calc(100vh - 64px);
`
const Container = styled.div`
    
`

type Props = {
    sss: Subreddit
}

export default enhance((props: Props) => {

    console.log(JSON.stringify(props.view.subscriptions && JSON.stringify(props.view.subscriptions[0], null, 2)))
    return (
        <div>
            <Header />
            <StyledList>
                {
                    props.view.subscriptions
                        ? props.view.subscriptions.map(subreddit => (
                            <ListItem button>
                                <ListItemText primary={subreddit.display_name} onClick={props.handleViewSubreddit(subreddit.display_name)} />
                            </ListItem>
                        ))
                        : null
                }
            </StyledList>
        </div>
    )
})

/*

 */