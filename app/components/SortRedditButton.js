import React from 'react'
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import { withTheme } from 'material-ui/styles';
import MenuIcon from 'material-ui-icons/Menu';
import styled from 'styled-components'
import { compose, withStateHandlers } from 'recompose'
import { inject, observer } from 'mobx-react'
import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';


const enhance = compose(
    inject('viewStore'),
    inject('subredditStore'),
    withStateHandlers({
        showSort: false,
        showSortAnchor: null,
    }, {
            toggleSortMenu: (state, props) => (event) => ({
                showSort: !state.showSort,
                showSortAnchor: event.target,
            }),
            selectSort: (state, props) => sortMode => {
                props.subredditStore.setMode(sortMode)
                return {
                    showSort: false,

                }
            },

        }),
    withTheme(),
    observer,
)

const Container = styled.div`
    h3{
        color: ${props => props.theme.palette.getContrastText(props.theme.palette.action.active)} !important;
    }
`

export default enhance((props) => (
    <Container theme={props.theme}>
        <List>
            <ListItem
                button
                aria-haspopup="true"
                aria-controls="lock-menu"
                aria-label="When device is locked"
                onClick={props.toggleSortMenu}
            >
                <ListItemText
                    primary={props.subredditStore.mode}
                />
            </ListItem>
        </List>
        <Menu
            id="lock-menu"
            anchorEl={props.showSortAnchor}
            open={props.showSort}
            onRequestClose={props.toggleSortMenu}
        >
            {
                ['Hot', 'Top', 'New'].map(m => (
                    <MenuItem onClick={() => props.selectSort(m)} selected={props.subredditStore.mode === m}>
                        {m}
                    </MenuItem>
                ))
            }
        </Menu>
    </Container>
))