import React, { useState, useEffect } from  'react'

import LogIn from '../../pages/LogIn/LogIn'

const withAuthentication = (WrappedComponent) => {
    return (props) => {
        /**
         * Add authentication logic here. 
         * If authenticated return component else redirect to login.
         */
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        
        useEffect(() => {
            setTimeout(() => setIsAuthenticated(true), 1000)
        }, [])

        return isAuthenticated ? <WrappedComponent {...props}/> : <LogIn/>
    }
}

export default withAuthentication;