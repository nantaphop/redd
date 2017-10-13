import React from 'react'
import Paper from 'material-ui/Paper'
import styled from 'styled-components'

const Container = styled(Paper)`
    min-height: 100vh;
`

export default () => {
    return (
        <Container elevation={2}>
            <div>
                Hello
            </div>
        </Container>
    )
}
