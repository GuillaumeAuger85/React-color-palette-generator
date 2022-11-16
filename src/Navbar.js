import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import styles from './styles/NavbarStyles';





class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
        this.closeSnackbar = this.closeSnackbar.bind(this);
        this.handleFormatChange = this.handleFormatChange.bind(this)
    }
    handleFormatChange(e) {
        this.props.handleChange(e)
        this.setState({ open: true });
    }
    closeSnackbar() {
        this.setState({ open: false })
    }
    render() {
        const { level, changeLevel, format, showingAllColors, classes } = this.props
        return (
            <header className={classes.Navbar} >
                <div className={classes.logo}>
                    <Link to='/'>reactColorPicker</Link>
                </div>
                {showingAllColors && <div>
                    <span>Level: {level}</span>
                    <div className={classes.slider}>
                        <Slider
                            defaultValue={level}
                            min={100}
                            max={900}
                            step={100}
                            onAfterChange={changeLevel} />
                    </div>
                </div>
                }
                <div className={classes.selectContainer}>
                    <Select defaultValue='hex' onChange={this.handleFormatChange}>
                        <MenuItem value='hex'>HEX- #fffffff</MenuItem>
                        <MenuItem value='rgb'>RGB- rgb(255, 255 ,255)</MenuItem>
                        <MenuItem value='rgba'>RGBA- rgba( 255, 255, 255, 1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    message={<span id='msg-id'>Format Changed to {format.toUpperCase()}</span>}
                    ContentProps={{
                        'aria-describedby': "msg-id"
                    }}
                    onClose={this.closeSnackbar}
                    action={[
                        <IconButton onClick={this.closeSnackbar} color='inherit' key='close' aria-label='close'>
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            </header>
        )
    }
}


export default withStyles(styles)(Navbar);