// @flow
import React, { Component } from 'react';
import styled from 'styled-components'
import Grid from 'material-ui/Grid'
import Collapse from 'material-ui/transitions/Collapse';
import Drawer from 'material-ui/Drawer';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { withTheme } from 'material-ui/styles';
import { SubmissionList, SubmissionDetail, Sidebar, ImageViewer, Header, SubredditDescription } from '../components'
import getTheme from '../themes'
import { observer, inject } from 'mobx-react'
import { compose } from 'recompose'
import { transition } from '../utils/TransitionUtils'


const enhance = compose(
  inject('viewStore'),
  inject('submissionStore'),
  inject('subredditStore'),
  withTheme(),
  observer,
)

const selectedTheme = createMuiTheme(getTheme());
console.log("selectedTheme", selectedTheme)
const TopicListGrid = styled(Grid) `
  // padding-right: 0px !important;
`
const StyledGrid = styled(Grid) `
  transition: ${transition(['padding-left'])};
  ${props => (props.showSidebar ? 'padding-left: 248px' : 'padding-left: 0px')}
`
const _Drawer = styled(Drawer) `

  .paper{
    transition: ${transition(['margin-left'])};
    width: 240px;
    margin-left: ${props => (props.open ? '0px' : '-240px')};
  }
`

export default enhance(function HomePage(props) {
  let { viewStore: { showSidebar } } = props

  return (
    <MuiThemeProvider theme={selectedTheme}>
      <div>
        <_Drawer
          theme={props.theme}
          type="permanent"
          open={showSidebar}
          classes={{
            paper: 'paper',
          }}
        >
          <Sidebar />
        </_Drawer>
        <div>
          <Header />
          <StyledGrid
            theme={props.theme}
            container
            spacing={0}
            justify="center"
            showSidebar={showSidebar}
          >
            <TopicListGrid item md={4} >
              <SubmissionList />
              <ImageViewer />
            </TopicListGrid>
            {
              props.subredditStore.showDescription
                ? <Grid item md={8}>
                  <SubredditDescription />
                </Grid>
                : props.submissionStore.submission && <Grid item md={8}>
                  <SubmissionDetail />
                </Grid>
            }
          </StyledGrid>
        </div>
      </div>
    </MuiThemeProvider>
  )
})
