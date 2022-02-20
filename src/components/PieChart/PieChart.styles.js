export default function styles(){
    return {
        mainRow: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
        },
        mainColumn: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        labelRow: {
            '&:hover': {
                backgroundColor: '#f9f9f9',
                cursor: 'pointer',
            },
        },
        cellL: {
            padding: '.2em 1em .2em 0.5em',
        },
        cellC: {
            padding: '.2em 1em .2em 0',
            fontSize: '1.3em',
        },
        cellR: {
            padding: '.2em 0.5em .2em 0',
            fontSize: '1.3em',
        },
        square: {
            width: '1.3em',
            height: '1.3em',
            borderRadius: '5px',
        },
    }
};
