import React, { useEffect } from 'react'
import { Container, Flex, Button, Heading } from 'theme-ui';
import netlifyIdentity from 'netlify-identity-widget'

export default props => {
    useEffect(() => {
        netlifyIdentity.init({})
    })
    return(
        <Container bg='muted' sx={{paddingLeft:'100px',
        paddingRight:'100px'}}>
        <Flex sx={{flexDirection: 'column', padding:3}}>
        <Heading>TODO APP </Heading>
        <Button onClick={() => netlifyIdentity.open()}> Submit </Button>
        </Flex>
        </Container>
        )
};