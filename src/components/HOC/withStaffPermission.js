import React, { useState } from 'react'

import Unauthorized from '../../pages/Unauthorized/Unauthorized';



const withStaffPermission = (WrappedComponent) => {
    return (props) => {
        /**
         * Add staff permission logic bellow. 
         * If user is staff return component else return unauthorized.
         */
        const [isAuthorized, setIsAuthorized] = useState(true);

        return isAuthorized ? <WrappedComponent {...props}/> : <Unauthorized/>
    }
}

export default withStaffPermission;