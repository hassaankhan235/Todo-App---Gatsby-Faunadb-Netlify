import React from 'react'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/client'
import {Box, Flex} from 'theme-ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../utils/font-awesome'

import styles from './icon.module.css'


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

const APOLLO_QUERY_WRITE = gql`
mutation Delete($ts: String!){
    del(ts: $ts){
        data{
            title
        }
    }
}
`

const Task = (props) => {
    const [del] = useMutation(APOLLO_QUERY_WRITE)
  const { tasks } = props;
  const {Uname} = props
  console.log("TASK", tasks);
  return (
    <Box
      p={2}
      color="white"
      bg="primary"
      sx={{ marginTop: "2px", borderRadius: "7px" }}
    >
      <Flex>
          {tasks.data.title}
          <div className={styles.iconTray}>
    <a className={styles.icon}>
      <FontAwesomeIcon icon={'check'} />
    </a>
          <a className={styles.icon}>
      <FontAwesomeIcon icon={'trash'} 
      onClick={ async(e, key = tasks.ref.id) => {
          console.log("KEY is", key)
          const ret = await del({variables:{ts:key},
                                refetchQueries:[{query: APOLLO_QUERY_READ,
                                  variables: {Uname}
                                }]})
          console.log('RETURNED',ret.data.del.data.title)
        }
          }/>
    </a>
    </div>
    </Flex>
    </Box>
  );
};

export default Task
        