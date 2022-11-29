import React, { Component } from 'react';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import "flag-icons/css/flag-icons.css";
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteStyles';

class Palette extends Component {
    constructor(props) {
        super(props)
        this.state = {
            level: 500,
            format: 'hex'
        }
        this.changeLevel = this.changeLevel.bind(this)
        this.changeFormat = this.changeFormat.bind(this)
    }
    changeFormat(evt) {
        this.setState({ format: evt.target.value })
    }
    changeLevel(level) {
        this.setState({ level })
    }
    render() {
        const { colors, paletteName, emoji, id } = this.props.palette;
        const {classes} =this.props;
        const { level, format } = this.state;
        function containsAnyLetters(str) {
            return /[a-zA-Z]/.test(str);
        }
        const span = containsAnyLetters(emoji) ? <span className={`emoji fi fi-${emoji.toLowerCase()}`}></span> : <span className='emoji'>{emoji}</span>;
        const colorBoxes = colors[level].map(color => (
            <ColorBox background={color[format]} name={color.name} key={color.id} colorId={color.id} paletteId={id} showingFullPalette={true} />
        ))
        return (
            <div className={classes.Palette}>
                <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} format={this.state.format} showingAllColors />
                <div className={classes.PaletteColors}>
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

export default withStyles(styles)(Palette)