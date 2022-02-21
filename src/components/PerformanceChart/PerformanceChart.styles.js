import { primaryColor } from "../../utils/constants/constants"
export default function styles() {
    return {
        column: {
            display: 'flex',
            flexDirection: 'column',
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
        },
        card: {
            padding: '1em',
        },
        main: {
            // backgroundColor: primaryColor,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0',
            borderRadius: '.3em',
            margin: '0 0 1em 0'
        },
        chartHeader: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '0 0 1em 0',
            width: '100%',
            padding: '0 .2em'
        },
        chartHeaderLeft: {
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '45%'
        },
        chartHeaderRight: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            maxWidth: '52%',
        },
        chart: {
            display: 'flex',
            flexDirection: 'column',
        },
        verticalText: {
            transform: 'rotate(-90deg)',
            margin: 0,
        },
        viewOption: {
            fontSize: '.8em',
            padding: '.5em 1em',
            borderRadius: '5px',
            height: '2em',
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: primaryColor
            }
        },
        viewOptionActive: {
            fontSize: '.8em',
            padding: '.5em 1em',
            borderRadius: '5px',
            height: '2em',
            backgroundColor: '#0288d1',
            color: 'white',
            '&:hover': {
                cursor: 'pointer'
            }
        },
        square: {
            width: '1.5em',
            height: '.2em',
            borderRadius: '5px',
        },
        date: {
            backgroundColor: '#0288d1',
            borderTopLeftRadius: '.3em',
            borderTopRightRadius: '.3em',
            color: 'white',
            width: '100%',
            padding: ".3em .5em",
            fontSize: '.8em'
        },
        performance: {
            padding: '.3em 0',
            fontSize: '.8em'
        },
        tooltip: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '.3em',
            padding: '0',
            width: '200px',
            zIndex: 100,
            position: 'relative',
            transition: 'ease .1s',
            backgroundColor: 'rgba(255, 255, 255, 0.7)'
        },
        actionBtn: {
            padding: '0 .2em'
        }
    }
};
