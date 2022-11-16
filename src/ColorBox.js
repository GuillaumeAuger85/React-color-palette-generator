import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './styles/colorBoxStyles';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';


class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            copied: false
        }
        this.changeCopyState = this.changeCopyState.bind(this);
    }
    PassColorBoxClassToParentComponent() {

    }
    changeCopyState() {
        this.setState({ copied: true }, () => {
            setTimeout(() => this.setState({ copied: false }), 1500);
        }
        )
    }
    render() {
        const { name, background, paletteId, colorId, showingFullPalette, classes } = this.props;
        const { copied } = this.state;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{ background }} className={classes.ColorBox}>
                    <div className={`${classes.copyOverlay} ${copied && classes.showOverlay}`} style={{ background }}></div>
                    <div className={`${classes.copyMsg} ${copied && classes.showMessage}`}>
                        <h1>Copied!</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>
                    <div>
                        <div className={classes.boxContent}>
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>Copy</button>
                    </div>
                    {showingFullPalette && (
                        <Link to={`/palette/${paletteId}/${colorId}`} onClick={e => e.stopPropagation()}>
                            <span className={`see-more ${classes.seeMore}`}>MORE</span>
                        </Link>)}
                </div>
            </CopyToClipboard>
        )
    }
}

export default withStyles(styles)(ColorBox);
