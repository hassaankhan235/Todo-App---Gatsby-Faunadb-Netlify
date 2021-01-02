import React from 'react'
import { Flex, NavLink } from 'theme-ui';
import {Link} from 'gatsby'

interface headerProps {
    user: string
}

function Header(props: headerProps) {
const {user} = props 

 return(   
    <Flex as='nav'>
    <NavLink as={Link} to={'/'} href='#!' p={2}>
    Home
    </NavLink>
    <NavLink as={Link} to={'/app'} href='#!' p={2}>
    Dashboard
    </NavLink>
    </Flex>
 )
}

export default Header