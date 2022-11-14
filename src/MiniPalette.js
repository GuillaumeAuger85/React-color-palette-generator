import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
        backgroundColor: 'white',
        border:'1px black solid',
        borderRadius: '5px',
        padding: '0.5rem',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    colors: {
   backgroundColor:'grey',

    },
    title: {
        display:'flex',
        justifyContent: 'space-between',
        alignitems:'center',
        margin:'0',
        color:'black',
        paddingTop: '0.5rem',
        fontsize:'1rem',
        postion:'relative'
    },
    emoji: {
        marginLeft:'0.5rem',
        fontSize:'1.5rem'
    }
}



function MiniPalette(props) {
    const { classes, paletteName, emoji } = props;
    function containsAnyLetters(str) {
        return /[a-zA-Z]/.test(str);
      }
      const span = containsAnyLetters(emoji) ? <span className={`fi fi-${emoji.toLowerCase()} ${classes.emoji}`}></span> :<span className={classes.emoji}>{emoji}</span>;
    return (
        <div className={classes.root}>
            <div className={classes.color}></div>
            <h5 className={classes.title}>{paletteName}{span}</h5>
        </div>
    )
}

export default withStyles(styles)(MiniPalette)