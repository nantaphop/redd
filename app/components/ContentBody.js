import React from 'react'
import styled from 'styled-components'
import Typography from 'material-ui/Typography'


type ContentBodyProps = {
    html: string
}

const Body = styled(Typography) `
margin-bottom: 8px;
padding-right: 16px;
word-break: break-all;
*{
    color: rgba(0, 0, 0, 0.87);
    font-size: 14px;
    font-weight: 400;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    line-height: 20px;
    p {
        margin-top: 0px !important;
    }
}
`

export default (props: ContentBodyProps) => (
    <Body type='body1'>
        <span dangerouslySetInnerHTML={{__html: props.html}}></span>
    </Body>
)