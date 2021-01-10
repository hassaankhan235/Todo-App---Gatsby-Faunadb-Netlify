import React, {useContext} from "react"
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import IdentityContext from '../../identityContext'
import Layout from "../components/Layout"
import {Spinner,Container, Message} from 'theme-ui'

import Task from '../components/Task'
import WelcomenInput from "../components/WelcomenInput"



export default props => {

    const {user} = useContext(IdentityContext)
    const Uname = user && user.email

    const APOLLO_QUERY_READ = gql`
    query All_posts($Uname: String!){
    Aposts(Uname: $Uname){
        ref{
          id
        }
        data{
          title
        }
      }
    }
`
    const {loading, error, data} = useQuery(APOLLO_QUERY_READ,
      {variables: {Uname}})
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
        <WelcomenInput Uname = {Uname} />
        {loading && "Loading" && <Spinner/> }
        {error && "Error Loading"}
        {data && data.Aposts.map(tasks => {
          if (tasks == null)
          return(<dav>No data to show </dav>)
           return (
            <Task tasks= {tasks} key={tasks.ref.id} Uname = {Uname} />
            )
        })}
        </div>
        }
        </Layout>
        </Container>
        )
    }