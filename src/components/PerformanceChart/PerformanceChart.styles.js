import { primaryColor } from "../../utils/constants/constants"
export default function styles() {
    return {
        column: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        card: {
            padding: '1em',
        },
        main: {
            backgroundColor: primaryColor,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0',
            borderRadius: '.3em',
        },
        chartHeader: {
            fontSize: '1.3em',
            fontWeight: '600',
            color: 'black',
            margin: '0 auto',
        },
        chart: {
            display: 'flex',
            flexDirection: 'column',
        },
        verticalText: {
            transform: 'rotate(-90deg)',
            margin: 0,
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
        btnContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: '0.5em 0.5em .5em auto',
        },
        actionBtn: {
            padding: '0 .2em'
        }
    }
};
