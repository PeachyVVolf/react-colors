import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { Link } from 'react-router-dom';
import './css/Palette.css';
import './css/ColorBox.css';

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        
        this.state = { format: "hex" }
        this.changeFormat =  this.changeFormat.bind(this);
    }

    gatherShades(palette, colorToFilterBy) {
        let shades = [];
        let allColors =  palette.colors;
        for(let key in allColors){
            shades = shades.concat(
                allColors[key].filter(color => color.id ===colorToFilterBy)
            );
        }

        return shades.slice(1);
    }

    changeFormat(val) {
        this.setState({ format: val })
    }

    render() { 
        const colorBoxes = this._shades.map(color => (
            <ColorBox background={color[this.state.format]} name={color.name} key={color.name} id={color.id} showLink={false}/>
        ));

        return ( 
            <div className='SingleColorPalette Palette'>
                <Navbar handleChange={this.changeFormat} showingAllColors={false}/>
                <div className='Palette-colors'>
                    {colorBoxes}
                <div className='go-back ColorBox'>
                    <Link to={`/palette/${this.props.palette.id}`} className='back-button'>GO BACK</Link>
                </div>
                </div>
                <PaletteFooter paletteName={this.props.palette.paletteName} emoji={this.props.palette.emoji}/>
            </div>
         );
    }
}
 
export default SingleColorPalette;