import React from 'react'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import DateIcon from 'material-ui-icons/Timer'
import PersonIcon from 'material-ui-icons/Person'
import LabelIcon from 'material-ui-icons/Label'
import { withTheme } from 'material-ui/styles';
import ArrowUpIcon from 'material-ui-icons/ArrowUpward'
import ArrowDownIcon from 'material-ui-icons/ArrowDownward'
import ChatIcon from 'material-ui-icons/Forum'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
import styled, { css } from 'styled-components'
import { compose, lifecycle, setDisplayName, withStateHandlers } from 'recompose'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import LineEllipsis from 'react-lines-ellipsis'
import Collapse from 'material-ui/transitions/Collapse';
import ContentBody from './ContentBody'


type ReplyCardProps = {
    reply: object
}

const enhance = compose(
    inject('subredditStore'),
    inject('submissionStore'),
    lifecycle({

    }),
    setDisplayName('ReplyCard'),
    withTheme(),    
    observer,
)

const ReplyCard = styled(Card) `
    margin-bottom: 1px;
    padding-bottom: 8px;
    width: 100%;
`

const Contents = styled(CardContent) `
    padding: 0px 1px 16px 16px !important;
    :last-child{
        padding-bottom: 0px !important;
    }
`

const IconStyle = css`
    width: 12px !important;
    height: 12px !important;
    margin-right: 4px;
`

const _DateIcon = styled(DateIcon) `
    ${IconStyle}
`
const _PersonIcon = styled(PersonIcon) `
    ${IconStyle}
    margin-left: 4px;
`
const _LabelIcon = styled(LabelIcon) `
${IconStyle}
margin-left: 4px;
`

const MetaRow = styled(Typography) `
    display: flex !important;
    font-size: 10px !important;
    align-items: center;
    height: 48px;
`
const SelfText = styled(Typography).attrs({
    type: 'caption',
}) `
    word-break: break-word;
    margin-top: 8px !important;
`
const ActionBar = styled.div`
    display: flex;
    align-items: center;
`
const StatContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`
const Image = styled(CardMedia) `
    height: 300px;
`
const RepliesContainer = styled(Collapse) `
    padding: 2px;
`

const renderReply = (props, reply) => (
    <ReplyCard
        key={reply.name}
        raised
        elevation={1}
    >
        <Contents>
            <MetaRow type="caption">
                <_DateIcon /> {moment(reply.created_utc * 1000).fromNow()}
                <_PersonIcon /> {reply.author.name}
                <_LabelIcon /> {reply.score}
                <IconButton onClick={reply.handleUpvote}>
                    <ArrowUpIcon color={reply.likes === true && props.theme.palette.accent[500]} />
                </IconButton>
                <IconButton onClick={reply.handleDownvote}>
                    <ArrowDownIcon color={reply.likes === false && props.theme.palette.accent[500]} />
                </IconButton>
                {
                    reply.replies.length ?
                        <IconButton onClick={props.submissionStore.handleToggleReply(reply.name)}>
                            {
                                !props.submissionStore.collapseReplies.has(reply.name)
                                    ? <ExpandLess />
                                    : <ExpandMore />
                            }
                        </IconButton>
                        : null
                }
            </MetaRow>
            {
                reply.body_html && <ContentBody html={reply.body_html} />
            }
            {/* <CardActions disableActionSpacing>
            <Typography type="body1">{submission.score || '0'}</Typography>
            <IconButton>
                <ArrowUpIcon />
            </IconButton>
            <IconButton>
                <ArrowDownIcon />
            </IconButton>
            <Typography type="body1">{submission.num_comments || '0'}</Typography>
            <IconButton>
                <ChatIcon />
            </IconButton>

        </CardActions> */}
            {reply.replies
                && <RepliesContainer in={!props.submissionStore.collapseReplies.has(reply.name)} transitionDuration="auto">
                    {reply.replies.map(r => renderReply(props, r))}
                </RepliesContainer>
            }
        </Contents>
    </ReplyCard >
)

export default enhance((props: ReplyCardProps) => {
    let { reply } = props
    let preview
    return renderReply(props, reply)
})

// Sample Submission Item
/**
 * {
    "subreddit_id": "t5_2qh17",
    "approved_at_utc": null,
    "banned_by": null,
    "removal_reason": null,
    "link_id": "t3_76j1iz",
    "likes": null,
    "user_reports": [],
    "saved": false,
    "id": "doeimc8",
    "banned_at_utc": null,
    "gilded": 0,
    "archived": false,
    "report_reasons": null,
    "author": "spilk",
    "can_mod_post": false,
    "ups": 464,
    "parent_id": "t3_76j1iz",
    "score": 464,
    "approved_by": null,
    "downs": 0,
    "body": "10BASE-Tea",
    "edited": false,
    "author_flair_css_class": null,
    "collapsed": false,
    "is_submitter": false,
    "collapsed_reason": null,
    "body_html": "<div class=\"md\"><p>10BASE-Tea</p>\n</div>",
    "stickied": false,
    "can_gild": true,
    "subreddit": "geek",
    "score_hidden": false,
    "subreddit_type": "public",
    "name": "t1_doeimc8",
    "created": 1508114485,
    "author_flair_text": null,
    "created_utc": 1508085685,
    "subreddit_name_prefixed": "r/geek",
    "controversiality": 0,
    "depth": 0,
    "mod_reports": [],
    "num_reports": null,
    "distinguished": null,
    "replies": [
      {
        "subreddit_id": "t5_2qh17",
        "approved_at_utc": null,
        "banned_by": null,
        "removal_reason": null,
        "link_id": "t3_76j1iz",
        "likes": null,
        "replies": [],
        "user_reports": [],
        "saved": false,
        "id": "doejumn",
        "banned_at_utc": null,
        "gilded": 0,
        "archived": false,
        "report_reasons": null,
        "author": "codepoet",
        "can_mod_post": false,
        "ups": 43,
        "parent_id": "t1_doeimc8",
        "score": 43,
        "approved_by": null,
        "downs": 0,
        "body": "Sigh. Take your damned upvote. (Bravo.)",
        "edited": false,
        "author_flair_css_class": null,
        "collapsed": false,
        "is_submitter": false,
        "collapsed_reason": null,
        "body_html": "<div class=\"md\"><p>Sigh. Take your damned upvote. (Bravo.)</p>\n</div>",
        "stickied": false,
        "can_gild": true,
        "subreddit": "geek",
        "score_hidden": false,
        "subreddit_type": "public",
        "name": "t1_doejumn",
        "created": 1508115991,
        "author_flair_text": null,
        "created_utc": 1508087191,
        "subreddit_name_prefixed": "r/geek",
        "controversiality": 0,
        "depth": 1,
        "mod_reports": [],
        "num_reports": null,
        "distinguished": null
      },
      {
        "subreddit_id": "t5_2qh17",
        "approved_at_utc": null,
        "banned_by": null,
        "removal_reason": null,
        "link_id": "t3_76j1iz",
        "likes": null,
        "replies": [],
        "user_reports": [],
        "saved": false,
        "id": "doeu00g",
        "banned_at_utc": null,
        "gilded": 0,
        "archived": false,
        "report_reasons": null,
        "author": "aerger",
        "can_mod_post": false,
        "ups": 7,
        "parent_id": "t1_doeimc8",
        "score": 7,
        "approved_by": null,
        "downs": 0,
        "body": "I hoped to find this here. And I did. Nice.",
        "edited": false,
        "author_flair_css_class": null,
        "collapsed": false,
        "is_submitter": false,
        "collapsed_reason": null,
        "body_html": "<div class=\"md\"><p>I hoped to find this here. And I did. Nice.</p>\n</div>",
        "stickied": false,
        "can_gild": true,
        "subreddit": "geek",
        "score_hidden": false,
        "subreddit_type": "public",
        "name": "t1_doeu00g",
        "created": 1508126536,
        "author_flair_text": null,
        "created_utc": 1508097736,
        "subreddit_name_prefixed": "r/geek",
        "controversiality": 0,
        "depth": 1,
        "mod_reports": [],
        "num_reports": null,
        "distinguished": null
      },
      {
        "subreddit_id": "t5_2qh17",
        "approved_at_utc": null,
        "banned_by": null,
        "removal_reason": null,
        "link_id": "t3_76j1iz",
        "likes": null,
        "replies": [],
        "user_reports": [],
        "saved": false,
        "id": "dof3vvy",
        "banned_at_utc": null,
        "gilded": 0,
        "archived": false,
        "report_reasons": null,
        "author": "ditrone",
        "can_mod_post": false,
        "ups": 6,
        "parent_id": "t1_doeimc8",
        "score": 6,
        "approved_by": null,
        "downs": 0,
        "body": "Thats the U.S. version, the UK is on 10GBase-tea",
        "edited": false,
        "author_flair_css_class": null,
        "collapsed": false,
        "is_submitter": false,
        "collapsed_reason": null,
        "body_html": "<div class=\"md\"><p>Thats the U.S. version, the UK is on 10GBase-tea</p>\n</div>",
        "stickied": false,
        "can_gild": true,
        "subreddit": "geek",
        "score_hidden": false,
        "subreddit_type": "public",
        "name": "t1_dof3vvy",
        "created": 1508137942,
        "author_flair_text": null,
        "created_utc": 1508109142,
        "subreddit_name_prefixed": "r/geek",
        "controversiality": 0,
        "depth": 1,
        "mod_reports": [],
        "num_reports": null,
        "distinguished": null
      },
      {
        "subreddit_id": "t5_2qh17",
        "approved_at_utc": null,
        "banned_by": null,
        "removal_reason": null,
        "link_id": "t3_76j1iz",
        "likes": null,
        "replies": [],
        "user_reports": [],
        "saved": false,
        "id": "dofbisw",
        "banned_at_utc": null,
        "gilded": 0,
        "archived": false,
        "report_reasons": null,
        "author": "_Noah271",
        "can_mod_post": false,
        "ups": 1,
        "parent_id": "t1_doeimc8",
        "score": 1,
        "approved_by": null,
        "downs": 0,
        "body": "Sounds like Comcast's backbone! ",
        "edited": false,
        "author_flair_css_class": null,
        "collapsed": false,
        "is_submitter": false,
        "collapsed_reason": null,
        "body_html": "<div class=\"md\"><p>Sounds like Comcast&#39;s backbone! </p>\n</div>",
        "stickied": false,
        "can_gild": true,
        "subreddit": "geek",
        "score_hidden": false,
        "subreddit_type": "public",
        "name": "t1_dofbisw",
        "created": 1508147790,
        "author_flair_text": null,
        "created_utc": 1508118990,
        "subreddit_name_prefixed": "r/geek",
        "controversiality": 0,
        "depth": 1,
        "mod_reports": [],
        "num_reports": null,
        "distinguished": null
      }
    ],
  }
 * 
 */