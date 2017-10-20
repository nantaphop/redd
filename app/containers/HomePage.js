// @flow
import React, { Component } from 'react';
import styled from 'styled-components'
import Grid from 'material-ui/Grid'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { SubmissionList, SubmissionDetail, Sidebar, ImageViewer } from '../components'
import getTheme from '../themes'

const selectedTheme = createMuiTheme(getTheme());
console.log('selectedTheme', selectedTheme)
const TopicListGrid = styled(Grid) `
  // padding-right: 0px !important;
`
export default function HomePage(props) {
  return (
    <MuiThemeProvider theme={selectedTheme}>
      <Grid container spacing={16}>
        <Grid item md={3}>
          <Sidebar />
        </Grid>
        <TopicListGrid item md={4} >
          <SubmissionList />
          <ImageViewer />
        </TopicListGrid>
        <Grid item md={5}>
          <SubmissionDetail />
        </Grid>
      </Grid>
    </MuiThemeProvider>
  )
}
