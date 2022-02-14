#!/bin/bash
<<comment
    Util bash script for creating components.
    ARG1: Component folder type(c for components or p for pages)
    ARG2: ComponentName
comment

ARG1=$1
ARG2=$2
FOLDER=''


function create_folder(){

    COMPONENT_NAME=${ARG2}

    mkdir ./src/${FOLDER}/${COMPONENT_NAME}

    cat > ./src/${FOLDER}/${COMPONENT_NAME}/${COMPONENT_NAME}.js <<EOM
import React, { useState, useEffect } from 'react';

import makeStyles from '@mui/styles/makeStyles';

import styles from './${COMPONENT_NAME}.styles.js'

const ${COMPONENT_NAME} = (props) => {

    const classes = makeStyles(styles())();

    return (
        <div className={classes.column}>
            ${COMPONENT_NAME}
        </div>
    )
};

export default ${COMPONENT_NAME};
EOM

    cat > ./src/${FOLDER}/${COMPONENT_NAME}/${COMPONENT_NAME}.styles.js <<EOM
export default function styles(){
    return {
        column: {
            display: 'flex',
            flexDirection: 'column',
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
        }
    }
};
EOM
    mkdir ./src/${FOLDER}/${COMPONENT_NAME}/state

    local FIRST_LETTER_LOWER_CASE="$(tr '[:upper:]' '[:lower:]' <<< ${COMPONENT_NAME:0:1})"
    local FORMATED_COMPONENT_NAME="${FIRST_LETTER_LOWER_CASE}${COMPONENT_NAME:1}"

    REDUX_ACTION_FILE_NAME="${FORMATED_COMPONENT_NAME}Actions"
    REDUX_REDUCERS_FILE_NAME="${FORMATED_COMPONENT_NAME}Reducers"

    cat > ./src/${FOLDER}/${COMPONENT_NAME}/state/${REDUX_ACTION_FILE_NAME}.js <<EOM
// Redux actions file
EOM
    cat > ./src/${FOLDER}/${COMPONENT_NAME}/state/${REDUX_REDUCERS_FILE_NAME}.js <<EOM
// Redux reducers file
EOM

    echo '------------'
    echo New folder ${ARG2} added. PATH: ./src/${FOLDER}/${COMPONENT_NAME}
    echo '------------'
}


if [ ${ARG1} == 'c' ]
    then
        FOLDER='components'
        create_folder
    fi
if [ ${ARG1} == 'p' ]
    then
        FOLDER='pages'
        create_folder
    fi
