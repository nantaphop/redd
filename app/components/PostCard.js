import React from 'react'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import DateIcon from 'material-ui-icons/Timer'
import PersonIcon from 'material-ui-icons/Person'
import LabelIcon from 'material-ui-icons/Label'
import ArrowUpIcon from 'material-ui-icons/ArrowUpward'
import ArrowDownIcon from 'material-ui-icons/ArrowDownward'
import styled, { css } from 'styled-components'
import { compose, lifecycle, setDisplayName } from 'recompose'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import LineEllipsis from 'react-lines-ellipsis'


type PostCardProps = {
    post: object
}

const enhance = compose(
    inject('subreddit'),
    lifecycle({
        componentDidMount() {
        }

    }),
    setDisplayName('PostList'),
    observer,
)

const TopicCard = styled(Card) `
    margin-bottom: 8px;
    margin-left: 16px;
    margin-right: 16px;
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
    height: 200px;
`

export default enhance((props: PostCardProps) => {
    let { post } = props
    console.log(post.thumbnail, post)
    let preview
    if (post.preview && post.preview.images) {
        let resolutions: object[] = post.preview.images[0].resolutions
        let heightMoreThan200 = resolutions.filter(r => r.height > 200)
        preview = heightMoreThan200[0] && heightMoreThan200[0].url
    }
    return (
        <TopicCard key={post.name} raised active={post.active} elevation={1}>
            {preview && <Image

                image={preview}
                title="post.title"
            />
            }
            <Contents>
                <Typography type="body1">{post.title}</Typography>
                <MetaRow type="caption">
                    <_DateIcon /> {moment(post.created_utc * 1000).fromNow()}
                    <_PersonIcon /> {post.author.name}
                    <_LabelIcon /> {post.subreddit.display_name}
                </MetaRow>
                {
                    post.selftext && <SelfText>
                        <LineEllipsis
                            maxLine={3}
                            ellipsis='...'
                            trimRight
                            basedOn='letters'
                            text={post.selftext} />
                    </SelfText>
                }
                <CardActions disableActionSpacing>
                    <StatContainer>
                        <Typography type="caption">{post.score || '0'} points</Typography>
                        <Typography type="caption">{post.num_comment || '0'} comments</Typography>
                    </StatContainer>
                    <IconButton>
                        <ArrowUpIcon />
                    </IconButton>
                    <IconButton>
                        <ArrowDownIcon />
                    </IconButton>
                </CardActions>
            </Contents>
        </TopicCard >
    )
})

// Sample Post Item
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
          "can_mod_post" : false,
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
          "is_crosspostable" : true,
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
          "num_crossposts" : 0,
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