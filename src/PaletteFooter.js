import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteFooterStyles';

function PaletteFooter(props) {
    function containsAnyLetters(str) {
        return /[a-zA-Z]/.test(str);
    }
    const { paletteName, emoji, classes } = props;
    const span = containsAnyLetters(emoji) ? <span className={`${classes.emoji} fi fi-${emoji.toLowerCase()}`}></span> : <span className={classes.emoji}>{emoji}</span>;
    return (
        <footer className={classes.PaletteFooter}>
            {paletteName}
            {span}
        </footer>
    )
}

export default withStyles(styles)(PaletteFooter)
