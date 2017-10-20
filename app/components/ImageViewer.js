import React, { Component } from 'react'
import styled from 'styled-components'
import { compose, withStateHandlers } from 'recompose'
import LightBox from 'react-image-lightbox'
import Paper from 'material-ui/Paper'
import { observer, inject } from 'mobx-react'

type ImageViewerProps = {
    submission: object
}

const Container = styled(Paper) `
    .ReactModal__Content--after-open{
        padding-top: 64px !important;
    }
`

const enhance = compose(
    inject('viewStore'),
    withStateHandlers({
        photoIndex: 0
    }, {
            handleNext: state => () => ({ photoIndex: state.photoIndex + 1 }),
            handlePrev: state => () => ({ photoIndex: state.photoIndex - 1 }),
            handleClose: (state, props) => () => props.viewStore.setPreviewSubmission(null),
        }),
    observer,
)

export default enhance(class ImageViewer extends Component {

    render() {
        let { photoIndex, handleNext, handlePrev, handleClose } = this.props
        if (!this.props.viewStore || !this.props.viewStore.previewSubmission) {
            return null
        }
        let images = []
        console.log(this.props.viewStore.previewSubmission.url)
        //TODO: Some url is a jpg but have no preview
        if (this.props.viewStore.previewSubmission.preview &&
            this.props.viewStore.previewSubmission.preview.images.length > 0) {
            images = [this.props.viewStore.previewSubmission.url.replace('.gifv', '.gif')]
        } else {
            images = [this.props.viewStore.previewSubmission.url]
        }
        return (
            <Container elevation={4}>
                <LightBox
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1)]}
                    prevSrc={images[(photoIndex - 1)]}
                    onCloseRequest={handleClose}
                    onMovePrevRequest={handlePrev}
                    onMoveNextRequest={handleNext}
                    reactModalStyle={{ content: { top: 64 } }}
                />
            </Container>
        )
    }
})