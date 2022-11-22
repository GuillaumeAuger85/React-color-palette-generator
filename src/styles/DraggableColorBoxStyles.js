const styles = {
    root: {
        width: "20%",
        height: '25%',
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-4px",
        '&:hover svg': {
            color: '#fff',
            transform: 'scale(1.5)'
        }
    },
    boxContent: {
        position: "absolute",
        width: "100%",
        left: "0px",
        bottom: "0px",
        padding: "10px",
        color: "#000",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
        display: 'flex',
        justifyContent: 'space-between'
    },
    deleteIcon: {
        transition: 'all 0.3s ease-in-out',
        color: 'rgba(0, 0, 0, 0.5)'

    }
}

export default styles