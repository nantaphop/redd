// @flow
import React, { Component } from 'react';
import styled from 'styled-components'
import Grid from 'material-ui/Grid'
import { PostList, PostDetail, Sidebar } from '../components'

const TopicListGrid = styled(Grid) `
  padding-right: 0px !important;
`
export default function HomePage(props) {
  return (
    <Grid container spacing={8}>
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
  );
}
