import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import makeStyles from '@mui/styles/makeStyles';

import styles from './Onboard.styles.js'

const Onboard = (props) => {

    const classes = makeStyles(styles())();

    // Use dispatch to update state
    const dispatch = useDispatch();

    return (
        <div className={classes.column}>
            Onboard
        </div>
    )
};

export default Onboard;
