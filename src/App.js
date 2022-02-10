import React from 'react';
import { useRoutes } from 'react-router-dom';
/**
 * External Libraries
 */
import { StyledEngineProvider } from '@mui/material/styles';
/**
 * App Components
 */
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
/**
 * Utils
 */
import withAuthentication from './components/HOC/withAuthentication';
import { ROUTES } from './routes';

function App() {

    let routeElements = useRoutes(ROUTES);

    return (
        /**
         * StyledEngineProvider removes MUI styling precedence over custom css properties.
         */
        <StyledEngineProvider injectFirst>
            <div className="App">
                <NavBar/>
                {routeElements}
                <Footer/>
            </div>
        </StyledEngineProvider>
    );
}

export default withAuthentication(App);
