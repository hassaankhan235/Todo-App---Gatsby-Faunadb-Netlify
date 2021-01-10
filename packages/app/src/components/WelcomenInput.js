
import React, {useContext, useState} from 'react'
import {Textarea, Text} from 'theme-ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'

import IdentityContext from '../../identityContext'
import '../utils/font-awesome'
import styles from './input.module.css'

const APOLLO_QUERY_WRITE = gql`
mutation NEW_TASK($title: String!, $user: String!){
    New_task(title: $title, user: $user)
}
`
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

function WelcomenInput(props) {
  const {Uname} = props
  const [New_task] = useMutation(APOLLO_QUERY_WRITE)
  const [newTask, setNewTask]  = useState()
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    await New_task({variables: {title: newTask, user: Uname}, 
      refetchQueries: [{query: APOLLO_QUERY_READ,
                        variables: {Uname}}]})
  }
    
  const handle = (e) => {
      e.preventDefault()
      setNewTask(e.target.value)
}
    const {user} = useContext(IdentityContext)
    let userName = user && user.user_metadata.full_name
  return (
    <div>
    <Text sx={{fontSize:4, textTransform:'uppercase', color:'violet'}}>
    Welcome {userName}
    </Text>
    <form onSubmit={handleSubmit}>
    <div className={styles.inputBox}>
    <Textarea defaultValue='Add Todo Task' rows={1} 
     onChange = {handle} />
    <button type='submit' className={styles.btn} >
    <FontAwesomeIcon icon={'check'} />
    </button>
    </div>
    </form>
    </div>
  )
}

export default WelcomenInput
