import React from 'react'
import styled from 'styled-components'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import { compose, withPropsOnChange, withStateHandlers } from 'recompose'
import ImageViewer from './ImageViewer'
import { inject } from 'mobx-react'
import electron from 'electron'


type SubmissionPreviewProps = {
    submission: object,
    preview?: string,
    previewType?: string,
    viewMode?: string,
    fullContent?: boolean,
}

const enhance = compose(
    inject('viewStore'),
    withPropsOnChange(['submission'], props => {
        let { submission } = props
        let preview

        // Try to find submission preview
        if (submission.preview && submission.preview.images) {
            let resolutions = submission.preview.images[0].resolutions
            let heightMoreThan200 = resolutions.filter(r => r.height > 200)
            preview = heightMoreThan200[0] && heightMoreThan200[0].url
        } else if (submission.thumbnail && (submission.thumbnail !== 'self')){
            preview = submission.thumbnail
        }else if (submission.url) {
            let extension = submission.url.split('.').pop()
            if (['jpg', 'png'].includes(extension)) {
                preview = submission.url
            }
        }
        let previewType
        let gifUrl
        if (submission.url.endsWith('.gif') || submission.url.endsWith('.gifv')) {
            previewType = 'gif'
            gifUrl = submission.url
            if (gifUrl.indexOf('imgur') > 0 && gifUrl.endsWith('.gifv')) {
                gifUrl = gifUrl.substring(0, gifUrl.length - 1)
            }
        } else {
            previewType = 'image'
        }
        console.log('Preview', submission.url, submission.preview, preview)
        return {
            preview,
            previewType,
        }
    }),
    withStateHandlers({

    }, {
            handlePreviewClick: (state, props) => (e) => {
                e.stopPropagation()

                let extension = props.submission.url.split('.').pop()
                if (['jpg', 'png', 'gif', 'gifv'].includes(extension)) {
                    props.viewStore.setPreviewSubmission(props.submission)
                } else {
                    electron.shell.openExternal(props.submission.url)
                }
            },
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
        })
)

const Image = styled(CardMedia) `
    height: 300px;
`

export default enhance((props: SubmissionPreviewProps) => {
    let { preview, previewType, submission } = props
    if (!preview) {
        return null
    }
    return (
        <div>
            <Image
                onClick={props.handlePreviewClick}
                image={preview}
                title={submission.title}
            />
        </div>
    )
})