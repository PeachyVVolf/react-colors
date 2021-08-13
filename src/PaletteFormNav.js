import React, { Component } from 'react';
import PaletteMetaForm from './PaletteMetaForm';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { ValidatorForm } from 'react-material-ui-form-validator';

class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            newPaletteName: "",
            formShowing: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
    }

    handleChange(evt) {
        this.setState({
          [evt.target.name]: evt.target.value
        })
    }

    showForm() {
        this.setState({
            formShowing: true
        })
    }

    hideForm() {
        this.setState({
            formShowing: false
        })
    }

    render() { 
        const{ classes, open } = this.props
        return ( 
            <div>
                <CssBaseline />
                <AppBar
                position="fixed"
                color="default"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                >
                    <Toolbar>
                        <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={this.props.handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                        >
                        <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Create A Palette
                        </Typography>
                    </Toolbar>
                    <div className={classes.navBtns} >
                                                
                        <Link to='/'>
                            <Button variant="contained" color="secondary" className={classes.btnNav}> 
                                Back 
                            </Button>
                        </Link>
                        
                        <Button variant="contained" color="primary" onClick={this.showForm} className={classes.btnNav}>
                            Save Palette
                        </Button>
                    </div>
                </AppBar>
                { this.state.formShowing && (
                    <PaletteMetaForm palettes={this.props.palettes} handleSubmit={this.props.handleSubmit} hideForm={this.hideForm}/> 
                )}
            </div>
         );
    }
}
 
export default PaletteFormNav;