import React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import styled from 'styled-components'

const _AppBar = styled(AppBar)`
    margin-bottom: 2px;
`

export default (props) => {
    return (
        <_AppBar position="static" color="white" elevation={2} square>
            <Toolbar>
                {props.children}
            </Toolbar>
        </_AppBar>
    )
}