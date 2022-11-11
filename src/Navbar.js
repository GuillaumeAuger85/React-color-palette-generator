import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './Navbar.css'

class Navbar extends Component {
    render() {
        const { level, changeLevel, handleChange } = this.props
        return (
            <header className='Navbar' >
                <div className='logo'>
                    <a href='#'>reactcolorpicker</a>
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
                    <Select defaultValue='hex' onChange={handleChange}>
                        <MenuItem value='hex'>HEX- #fffffff</MenuItem>
                        <MenuItem value='rgb'>RGB- rgb(255, 255 ,255)</MenuItem>
                        <MenuItem value='rgba'>RGBA- rgba( 255, 255, 255, 1.0)</MenuItem>
                    </Select>
                </div>
            </header>
        )
    }
}


export default Navbar