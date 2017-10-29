import React from 'react'
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import { withTheme } from 'material-ui/styles';
import SortIcon from 'material-ui-icons/Sort';
import styled from 'styled-components'
import { compose, withStateHandlers } from 'recompose'
import { inject, observer } from 'mobx-react'
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
const _SortIcon = styled(SortIcon)`
    margin-right: 8px;
`

export default enhance((props) => (
    <Container theme={props.theme}>
            <Button
                onClick={props.toggleSortMenu}
            >
                <_SortIcon />
                {props.subredditStore.mode}
            </Button>
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