import React from 'react'

import { Outlet } from 'react-router-dom'


const withOutlet = (WrappedComponent) => {

    return props => {
        return (
            <div>
                <WrappedComponent {...props}/>
                <Outlet/>
            </div>
        )
    }
}

export default withOutlet