import React from 'react'
import {Box, Flex} from 'theme-ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../utils/font-awesome'

import styles from './icon.module.css'

const Task = (props) => {
  const { tasks } = props;
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
      onClick={(e, k = tasks.ts) => console.log("KEY is", k)}/>
    </a>
    </div>
    </Flex>
    </Box>
  );
};

export default Task
        