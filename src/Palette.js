import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import './css/Palette.css';

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = { level: 500, format: "hex" }
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat =  this.changeFormat.bind(this);
    }

    changeLevel(newLevel) {
        this.setState({ level: newLevel })
    }

    changeFormat(val) {
        this.setState({ format: val })
    }

    render() { 
        const colorBoxes = this.props.palette.colors[this.state.level].map(color => (
            <ColorBox background={color[this.state.format]} name={color.name} key={color.id} id={color.id} paletteId={this.props.palette.id} showLink={true}/>
        ))
        return (
            <div className='Palette'>
                <Navbar level={this.state.level} changeLevel={this.changeLevel} handleChange={this.changeFormat} showingAllColors/>
                <div className='Palette-colors'>
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={this.props.palette.paletteName} emoji={this.props.palette.emoji}/>
            </div>
        );
    }
}
 
export default Palette;