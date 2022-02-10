<<comment
    Util shell script for creating components.
    ARG1: Component folder type(component or domain)
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

import styles from './${COMPONENT_NAME}.style.js';

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

    cat > ./src/${FOLDER}/${COMPONENT_NAME}/${COMPONENT_NAME}.style.js <<EOM
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

    echo '------------'
    echo New folder ${ARG2} added. PATH: ./src/${FOLDER}/${COMPONENT_NAME}
    echo '------------'
}


if [ ${ARG1} == 'component' ]
    then
        FOLDER='components'
        create_folder
    fi
if [ ${ARG1} == 'page' ]
    then
        FOLDER='pages'
        create_folder
    fi
