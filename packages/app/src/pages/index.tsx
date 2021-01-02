import React, { useContext } from 'react'
import { Container, Flex, Button, 
        Heading, Message } from 'theme-ui';
import netlifyIdentity from 'netlify-identity-widget'


import Layout from '../components/Layout'
import IdentityContext from '../../identityContext'


export default props => {
    const {user} = useContext(IdentityContext)

    return(
        <Container sx={{paddingLeft:'100px',
        paddingRight:'100px' }} >
        <Layout>
        <Flex sx={{flexDirection: 'column', padding:3}}>
        <Heading>TODO APP </Heading>
        <Message sx={{padding:3, marginTop:4 }}>
        { user ? 'Welcome ' + user.user_metadata.full_name +
            " Please proceed to the Dashboard to use the App" : 
            'Please Login to use the App'}      
        </Message>
        <Button sx={{marginLeft:'auto', marginTop:4, width:'180px' }}
        onClick={() => netlifyIdentity.open()}> 
        Login
        </Button>
        </Flex>
        </Layout>
        </Container>
        )
};