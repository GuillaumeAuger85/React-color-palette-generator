import React, { Component } from 'react';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import './Palette.css'

class Palette extends Component {
    constructor(props) {
        super(props)
        this.state = {
            level: 500,
            format: 'hex'
        }
        this.changeLevel = this.changeLevel.bind(this)
        this.changeFormat=this.changeFormat.bind(this)
    }
    changeFormat(evt){
         this.setState({format :evt.target.value})
    }
    changeLevel(level) {
        this.setState({ level })
    }
    render() {
        const { colors } = this.props.palette;
        const { level, format } = this.state;
        const colorBoxes = colors[level].map(color => (
            <ColorBox background={color[format]} name={color.name} />
        ))
        return (
            <div className='Palette'>
                <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} format={this.state.format}/>
                {/* navbar goes here */}
                <div className='Palette-colors'>
                    {colorBoxes}
                </div>
                {/* footer */}
            </div>
        )
    }
}

export default Palette