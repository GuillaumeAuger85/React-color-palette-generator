import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles';

function MiniPalette(props) {
    const { classes, paletteName, emoji, colors } = props;
    const miniColorBoxes = colors.map(c =>
        <div
            className={classes.miniColor}
            style={{ backgroundColor: c.color }}
            key={c.name}
        />)
    function containsAnyLetters(str) {
        return /[a-zA-Z]/.test(str);
    }
    const span = containsAnyLetters(emoji) ? <span className={`fi fi-${emoji.toLowerCase()} ${classes.emoji}`}></span> : <span className={classes.emoji}>{emoji}</span>;
    return (
        <div className={classes.root} onClick={props.handleClick}>
            <div className={classes.colors}>
                {miniColorBoxes}
            </div>
            <h5 className={classes.title}>{paletteName}{span}</h5>
        </div>
    )
}

export default withStyles(styles)(MiniPalette)