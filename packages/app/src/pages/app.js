import React, {useContext} from "react"
import { Router } from "@reach/router"
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import IdentityContext from '../../identityContext'
import Layout from "../components/Layout"
import {Spinner,Container, Message, 
        Textarea, Text} from 'theme-ui'

import Task from '../components/Task'

const APOLLO_QUERY = gql`
{
    Aposts{
        ts
        data{
          title
        }
      }
}
`

let Dash = () => {
    // const user = netlifyIdentity.currentUser()
    return(
        <IdentityContext.Consumer>
        {context => context.user && context.user.user_metadata.full_name}
        </IdentityContext.Consumer>
    )
}

export default props => {
    const {user} = useContext(IdentityContext)
    let userName = user && user.user_metadata.full_name
    const {loading, error, data} = useQuery(APOLLO_QUERY)
    console.log('HOOK VALUE', data)    
    return(
        <Container sx={{paddingLeft:'100px',
        paddingRight:'100px' }} >
        <Layout>
        { !user ?
            <Message sx={{padding:3, marginTop:4 }}> 
            'Please Login with a registered user id to use the App'
            </Message>
        :
        <div> 
        <Text sx={{fontSize:4, textTransform:'uppercase', color:'violet'}}>
        Welcome {userName}
        </Text>
        <Textarea defaultValue='Add Todo Task' rows={1}
        sx={{marginTop:'20px'}}/>
        {loading && "Loading" && <Spinner/> }
        {error && "Error Loading"}
        {data && data.Aposts.map(tasks => {
           return (
            <Task tasks= {tasks} key={tasks.ts}/>
            )
        })}
        </div>
        }
        </Layout>
        </Container>
        )
    }