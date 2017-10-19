import React from 'react'
import styled from 'styled-components'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import { compose, withPropsOnChange } from 'recompose'


type SubmissionPreviewProps = {
    submission: object,
    preview?: string,
    previewType?: string
}

const enhance = compose(
    withPropsOnChange(['submission'], props => {
        let { submission } = props
        let preview
        if (submission.preview && submission.preview.images) {
            let resolutions: object[] = submission.preview.images[0].resolutions
            let heightMoreThan200 = resolutions.filter(r => r.height > 200)
            preview = heightMoreThan200[0] && heightMoreThan200[0].url
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
        return {
            preview,
            previewType,
        }
    }),
)

const Image = styled(CardMedia) `
height: 300px;
`

export default enhance((props: SubmissionPreviewProps) => {
    let { preview, previewType } = props
    if (!preview){
        return null
    }
    return (
        <div>
            <Image
                onClick={props.handlePreviewClick}
                image={preview}
                title="submission.title"
            />
        </div>
    )
})