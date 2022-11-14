import React from 'react';
import { withStyles } from '@material-ui/styles';
import { color } from '@mui/system';

const styles = {
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



function MiniPalette(props) {
    const { classes, paletteName, emoji, colors } = props;
    const miniColorBoxes = colors.map(c =>
        <div
            className={classes.miniColor}
            style={{ backgroundColor: c.color }}
            key={c.name}
        />)
    console.log(miniColorBoxes)
    function containsAnyLetters(str) {
        return /[a-zA-Z]/.test(str);
    }
    const span = containsAnyLetters(emoji) ? <span className={`fi fi-${emoji.toLowerCase()} ${classes.emoji}`}></span> : <span className={classes.emoji}>{emoji}</span>;
    return (
        <div className={classes.root}>
            <div className={classes.colors}>
                {miniColorBoxes}
            </div>
            <h5 className={classes.title}>{paletteName}{span}</h5>
        </div>
    )
}

export default withStyles(styles)(MiniPalette)