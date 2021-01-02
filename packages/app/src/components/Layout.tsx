import React from 'react'
import Header from './header'
import Footer from './footer'


interface layoutProps {
    children : any,
}
function Layout(props: layoutProps) {
 const {children} = props
 const {user} = props
 
 console.log("USER IN LAYOUT", user)
 return(
    <>
    <Header user = {user}/>
        {children}
    <Footer />
    </>
 )
}

export default Layout