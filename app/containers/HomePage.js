// @flow
import React, { Component } from 'react';
import styled from 'styled-components'
import Grid from 'material-ui/Grid'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { SubmissionList, SubmissionDetail, Sidebar, ImageViewer, Header } from '../components'
import getTheme from '../themes'
import { observer, inject } from 'mobx-react'
import { compose } from 'recompose'

const enhance = compose(
  inject('viewStore'),
  inject('submissionStore'),
  observer,
)

const selectedTheme = createMuiTheme(getTheme());
const TopicListGrid = styled(Grid) `
  // padding-right: 0px !important;
`
const StyledGrid = styled(Grid)`
  ${props => props.showSidebar ? 'padding-left: 208px' : 'padding-left: 0px'}
`

export default enhance(function HomePage(props) {
  let { viewStore: { showSidebar } } = props

  return (
    <MuiThemeProvider theme={selectedTheme}>
      <div>
        <Header />
        {
          showSidebar &&
          <Sidebar />
        }
        <StyledGrid container spacing={0} justify="center" showSidebar={showSidebar}>
          <TopicListGrid item md={4} >
            <SubmissionList />
            <ImageViewer />
          </TopicListGrid>
          {
            props.submissionStore.submission && <Grid item md={8}>
              <SubmissionDetail />
            </Grid>
          }
        </StyledGrid>
      </div>
    </MuiThemeProvider>
  )
})
