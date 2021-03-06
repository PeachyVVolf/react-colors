import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import PaletteFormNav from './PaletteFormNav';
import DraggableColorList from './DraggableColorList';
import ColorPickerForm from './ColorPickerForm';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import { arrayMove } from 'react-sortable-hoc';
import styles from './styles/NewPaletteFormStyles';
import seedColors from './seedColors';

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  }

  constructor(props) {
      super(props);
      this.state = { 
        open: true, 
        colors: seedColors[0].colors
      };
      this.setOpen = this.setOpen.bind(this);
      this.handleDrawerClose =  this.handleDrawerClose.bind(this);
      this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
      this.addNewColor = this.addNewColor.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.removeColor = this.removeColor.bind(this);
      this.clearColors = this.clearColors.bind(this);
      this.addRandomColor = this.addRandomColor.bind(this);
  };

  setOpen(val) {
      this.setState(
          {open: val}
      );
  };

  handleDrawerOpen() {
      this.setOpen(true);
  };

  handleDrawerClose() {
      this.setOpen(false);
  };

  addNewColor(newColor) {
    this.setState({colors: [...this.state.colors, newColor], newColorName: "" })
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(newPalette) {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
    newPalette.colors =  this.state.colors;

    this.props.savePalette(newPalette)
    this.props.history.push("/");
  }

  removeColor(colorName) {
    this.setState({
      colors: this.state.colors.filter(color => color.name !== colorName)
    });
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({colors}) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

  clearColors() {
    this.setState({ colors: [] })
  }

  addRandomColor() {
    const allColors = this.props.palettes.map(p => p.colors).flat();
    let rand;
    let randomColor;
    let isDuplicateColor = true;
    while(isDuplicateColor) {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      isDuplicateColor = this.state.colors.some(color => color.name === randomColor.name);
    }
    this.setState({ colors: [...this.state.colors, randomColor]})
  }

  render() {
      const { classes, theme, maxColors } = this.props;
      const paletteIsFull = this.state.colors.length >= maxColors;

      return (
          <div className={classes.root}>
            <PaletteFormNav 
              open={this.state.open} 
              classes={classes} 
              palettes={this.props.palettes}
              handleSubmit={this.handleSubmit}
              handleDrawerOpen={this.handleDrawerOpen}
            />
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={this.state.open}
              classes={{
                  paper: classes.drawerPaper,
              }}
            >
            <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            <div className={classes.container}>
              <Typography variant="h4" gutterBottom>Design You Palette</Typography>
                <div className={classes.buttons}>
                    <Button className={classes.button} variant="contained" color="secondary" onClick={this.clearColors} >Clear Palette</Button>
                    <Button className={classes.button} variant="contained" color="primary" onClick={this.addRandomColor} disabled={paletteIsFull}>Random Color</Button>
                </div>

              <ColorPickerForm paletteIsFull={paletteIsFull} addNewColor={this.addNewColor} colors={this.state.colors}/>
            </div>
            </Drawer>
            <main
              className={clsx(classes.content, {
                  [classes.contentShift]: this.state.open,
              })}
              >
              <div className={classes.drawerHeader} />
              <DraggableColorList 
                colors={this.state.colors} 
                removeColor={this.removeColor} 
                axis="xy"
                onSortEnd={this.onSortEnd}
                distance={20}
              />
            </main>
        </div>
      );
  }
}
 
export default withStyles(styles, {withTheme: true })(NewPaletteForm);