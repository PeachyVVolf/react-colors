import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './css/Pallete.css'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

class Pallete extends Component {
    constructor(props) {
        super(props);
        this.state = { level: 500 }
        this.changeLevel = this.changeLevel.bind(this);
    }

    changeLevel(newLevel) {
        this.setState({ level: newLevel })
    }

    render() { 
        const colorBoxes = this.props.palette.colors[this.state.level].map(color => (
            <ColorBox background={color.hex} name={color.name} />
        ))
        return (
            <div className='Pallete'>
                <Slider 
                    defaultValue={this.state.level} 
                    min={100} 
                    max={900} 
                    step={100}
                    onAfterChange={this.changeLevel}
                />
                {/* Navbar here */}
                <div className='Pallete-colors'>
                    {colorBoxes}
                </div>
                {/* Footer */}
            </div>
        );
    }
}
 
export default Pallete;