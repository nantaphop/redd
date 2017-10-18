import React from 'react'
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import { withTheme } from 'material-ui/styles';
import PersonIcon from 'material-ui-icons/Person';
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
            toggleUserMenu: (state, props) => (event) => ({
                showSort: !state.showSort,
                showSortAnchor: event.target,
            }),
            handleLogout: (state, props) => () => {
                props.viewStore.logout()
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
const _PersonIcon = styled(PersonIcon) `
    margin-right: 8px;
`

export default enhance((props) => (
    <Container theme={props.theme}>
        <Button
            color="contrast"
            onClick={props.toggleUserMenu}
        >
            <_PersonIcon />
            {props.viewStore.currentUser.name}
        </Button>
        <Menu
            id="lock-menu"
            anchorEl={props.showSortAnchor}
            open={props.showSort}
            onRequestClose={props.toggleUserMenu}
        >
            <MenuItem onClick={() => { props.handleLogout() }}>
                Logout
            </MenuItem>

        </Menu>
    </Container>
))