export default {
    root: {
        backgroundColor: 'white',
        border: '1px black solid',
        borderRadius: '5px',
        padding: '0.5rem',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    colors: {
        backgroundColor: '#dae1e4',
        height: '150px',
        width: '100%',
        borderRadius: '5px',
        overflow: 'hidden'
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignitems: 'center',
        margin: '0',
        padding: '1rem 0',
        color: 'black',
        paddingTop: '0.5rem',
        fontsize: '1rem',
        postion: 'relative'
    },
    emoji: {
        marginLeft: '0.5rem',
        fontSize: '1.5rem'
    },
    miniColor: {
        height: '25%',
        width: '20%',
        display: 'inline-block',
        margin: '0 auto',
        postion: 'relative',
        marginBottom: '-4px'
    }
}