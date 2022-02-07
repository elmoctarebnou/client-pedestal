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

import styles from './${COMPONENT_NAME}.style.js';

const ${COMPONENT_NAME} = (props) => {

    return (
        <div>
            ${COMPONENT_NAME}
        </div>
    )
};

export default ${COMPONENT_NAME};
EOM

    cat > ./src/${FOLDER}/${COMPONENT_NAME}/${COMPONENT_NAME}.style.js <<EOM
export default function styles(){
    return {

    }
};
EOM

    echo '------------'
    echo Folder ${ARG2} added to ./src/${FOLDER}/${COMPONENT_NAME}
    echo '------------'
}


if [ ${ARG1} == 'component' ]
    then
        FOLDER='components'
        create_folder
    fi
if [ ${ARG1} == 'domain' ]
    then
        FOLDER='domains'
        create_folder
    fi
