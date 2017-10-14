// @flow
import React, { Component } from 'react';
import styled from 'styled-components'
import Grid from 'material-ui/Grid'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { PostList, PostDetail, Sidebar } from '../components'
import getTheme from '../themes'

const selectedTheme = createMuiTheme(getTheme());
console.log('selectedTheme', selectedTheme)
const TopicListGrid = styled(Grid) `
  padding-right: 0px !important;
`
export default function HomePage(props) {
  return (
    <MuiThemeProvider theme={selectedTheme}>
      <Grid container spacing={0}>
        <Grid item md={3}>
          <Sidebar />
        </Grid>
        <TopicListGrid item md={4} >
          <PostList />
        </TopicListGrid>
        <Grid item md={5}>
          <PostDetail />
        </Grid>
      </Grid>
    </MuiThemeProvider>
  )
}
