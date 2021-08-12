import React, { Component } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            newPaletteName: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule("isPaletteNameUnique", value => 
        this.props.palettes.every(
          ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
          )
        );
    }

    handleChange(evt) {
        this.setState({
          [evt.target.name]: evt.target.value
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
                            Persistent drawer
                        </Typography>
                        <ValidatorForm onSubmit={() => this.props.handleSubmit(this.state.newPaletteName)}>
                            <TextValidator 
                            label="Palette Name" 
                            value={this.state.newPaletteName} 
                            name="newPaletteName" 
                            onChange={this.handleChange}
                            validaors={["required", "isPaletteNameUnique"]}
                            errorMessage={["Enter Palette Name", "Name already used"]}
                            />
                            <Link to='/'>
                            <Button variant="contained" color="secondary"> Back </Button>
                            </Link>
                            <Button variant="contained" color="primary" type="submit">Save Palette</Button>
                        </ValidatorForm>
                    </Toolbar>
                </AppBar>
            </div>
         );
    }
}
 
export default PaletteFormNav;