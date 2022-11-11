import React, { Component } from 'react';
import Slider from 'rc-slider';
import {Link} from 'react-router-dom';
import 'rc-slider/assets/index.css';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

import './Navbar.css'
import { IconButton } from '@mui/material';

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
        const { level, changeLevel, format } = this.props
        return (
            <header className='Navbar' >
                <div className='logo'>
                    <Link to='/'>reactColorPicker</Link>
                </div>
                <div className='slider-container'>
                    <span>Level: {level}</span>
                    <div className='slider'>
                        <Slider
                            defaultValue={level}
                            min={100}
                            max={900}
                            step={100}
                            onAfterChange={changeLevel} />
                    </div>
                </div>
                <div className='select-container'>
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


export default Navbar