export default function styles(){
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0',
            // backgroundColor: primaryColor,
            borderRadius: '5px',
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
            color: 'black',
        },
        performance: {
            color: 'black',
        },
        tooltip: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '5px',
            padding: '5px',
            maxWidth: '20em',
            zIndex: 100,
            position: 'fixed',
            transition: 'ease .1s',
        },
        btnContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: '.3em .3em .3em auto',
            minHeight: '4em',
        },
    }
};
