import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete'

class MiniPalette extends PureComponent {
    constructor(props) {
        super(props)
        this.deletePalette = this.deletePalette.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    deletePalette(evt){
        evt.stopPropagation()
        this.props.openDialog(this.props.id)
    }
    handleClick(){
        this.props.goToPalette(this.props.id)
    }
    render() {
        const { classes, paletteName, emoji, colors } = this.props;
        const miniColorBoxes = colors.map(c =>
            <div
                className={classes.miniColor}
                style={{ backgroundColor: c.color }}
                key={c.name}
            />)
        function containsAnyLetters(str) {
            return /[a-zA-Z]/.test(str);
        }
        const span = containsAnyLetters(emoji.toUpperCase().toLowerCase()) ? <span className={`fi fi-${emoji.toLowerCase()} ${classes.emoji}`}></span> : <span className={classes.emoji}>{emoji}</span>;
        return (
            <div className={classes.root} onClick={this.handleClick}>
                <DeleteIcon
                    className={classes.deleteIcon}
                    onClick={this.deletePalette}
                />
                <div className={classes.colors}>
                    {miniColorBoxes}
                </div>
                <h5 className={classes.title}>{paletteName}{span}</h5>
            </div>
        )
    }

}

export default withStyles(styles)(MiniPalette)