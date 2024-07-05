import React, { Children } from 'react'

import  Header  from './Header';

const Layout = ({children}) => {
  return (
    <>
        {children}
    </>
  )
}

export default Layout

/* 
    The use of children over here is very useful
    for the following example we may consider
    <Layout>
        What where we display over here will be displayed just below header
    </Layout>
*/