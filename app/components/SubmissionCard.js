import React from 'react'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import DateIcon from 'material-ui-icons/Timer'
import PersonIcon from 'material-ui-icons/Person'
import LabelIcon from 'material-ui-icons/Label'
import ArrowUpIcon from 'material-ui-icons/ArrowUpward'
import ArrowDownIcon from 'material-ui-icons/ArrowDownward'
import ChatIcon from 'material-ui-icons/Forum'
import styled, { css } from 'styled-components'
import { compose, lifecycle, setDisplayName, withHandlers } from 'recompose'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import LineEllipsis from 'react-lines-ellipsis'
import electron from 'electron'
import GifPlayer from './GifView'
import { SubmissionPreview } from './'
// import GifPlayer from 'react-gif-player'

type SubmissionCardProps = {
    submission: object
}

const enhance = compose(
    inject('subredditStore'),
    inject('submissionStore'),
    lifecycle({

    }),
    withHandlers({
        viewSubmission: props => () => console.log(props.submissionStore) || props.submissionStore.view(props.submission),
        viewUrl: props => url => {
            let previewWindow = new electron.remote.BrowserWindow({
                // width: 800,
                // height: 600,
                show: false,
                title: 'Redd',
                'node-integration': false,
                'web-security': false,
                parent: electron.remote.getCurrentWindow(),
            });
            previewWindow.loadURL(url);
            previewWindow.show();
        },
    }),
    withHandlers({
        handlePreviewClick: props => (e) => {
            e.stopPropagation()
            if (props.submission.url) {
                props.viewUrl(props.submission.url)
            } else {
                props.viewSubmission()
            }
        },
    }),
    setDisplayName('SubmissionList'),
    observer,
)

const TopicCard = styled(Card) `
    margin-bottom: 8px;
    width: 100%;
`

const Contents = styled(CardContent) `
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
    align-items: center !important;
    margin-top: 8px !important;
    font-size: 10px !important;
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
const GifPlayerContainer = styled.div`
    height: 300px;
`

export default enhance((props: SubmissionCardProps) => {
    let { submission } = props
    console.log(submission.thumbnail, submission)
    return (
        <TopicCard
            key={submission.name}
            raised
            active={submission.active}
            elevation={1}
            onClick={props.viewSubmission}
        >
            <SubmissionPreview submission={submission} />
            <Contents>
                <Typography type="body1"
                    component="a"
                    onClick={props.viewSubmission}
                >
                    {submission.title}
                </Typography>
                <MetaRow type="caption">
                    <_DateIcon /> {moment(submission.created_utc * 1000).fromNow()}
                    <_PersonIcon /> {submission.author.name}
                    <_LabelIcon /> {submission.subreddit.display_name}
                </MetaRow>
                {
                    submission.selftext && <SelfText component="a" onClick={props.viewSubmission}>
                        <LineEllipsis
                            maxLine={3}
                            ellipsis='...'
                            trimRight
                            basedOn='letters'
                            text={submission.selftext} />
                    </SelfText>
                }
                <CardActions disableActionSpacing>
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

                </CardActions>
            </Contents>
        </TopicCard >
    )
})

// Sample Submission Item
/**
 * {
        "kind" : "t3",
        "data" : {
          "media" : null,
          "brand_safe" : true,
          "score" : 0,
          "id" : "76av4r",
          "edited" : false,
          "is_self" : true,
          "visited" : false,
          "can_mod_submission" : false,
          "banned_by" : null,
          "created" : 1507996446,
          "quarantine" : false,
          "title" : "Anyone else disconcerted that in 2049 they're still not using ISO dates? 😖",
          "approved_at_utc" : null,
          "thumbnail" : "self",
          "thumbnail_height" : null,
          "contest_mode" : false,
          "url" : "https://www.reddit.com/r/geek/comments/76av4r/anyone_else_disconcerted_that_in_2049_theyre/",
          "link_flair_css_class" : null,
          "is_crosssubmissionable" : true,
          "permalink" : "/r/geek/comments/76av4r/anyone_else_disconcerted_that_in_2049_theyre/",
          "mod_reports" : [

          ],
          "is_reddit_media_domain" : false,
          "over_18" : false,
          "locked" : false,
          "archived" : false,
          "whitelist_status" : "all_ads",
          "ups" : 0,
          "is_video" : false,
          "subreddit" : "geek",
          "spoiler" : false,
          "selftext" : "",
          "subreddit_id" : "t5_2qh17",
          "selftext_html" : null,
          "author_flair_text" : null,
          "author_flair_css_class" : null,
          "secure_media_embed" : {

          },
          "name" : "t3_76av4r",
          "approved_by" : null,
          "media_embed" : {

          },
          "hide_score" : false,
          "subreddit_type" : "public",
          "author" : "urbanabydos",
          "can_gild" : true,
          "stickied" : false,
          "subreddit_name_prefixed" : "r/geek",
          "link_flair_text" : null,
          "report_reasons" : null,
          "secure_media" : null,
          "downs" : 0,
          "domain" : "self.geek",
          "suggested_sort" : null,
          "banned_at_utc" : null,
          "thumbnail_width" : null,
          "view_count" : null,
          "user_reports" : [

          ],
          "num_crosssubmissions" : 0,
          "hidden" : false,
          "removal_reason" : null,
          "created_utc" : 1507967646,
          "clicked" : false,
          "gilded" : 0,
          "parent_whitelist_status" : "all_ads",
          "pinned" : false,
          "num_comments" : 0,
          "likes" : null,
          "num_reports" : null,
          "saved" : false,
          "distinguished" : null
        }
      }
 * 
 */