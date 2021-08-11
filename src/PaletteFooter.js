import { mergeClasses } from '@material-ui/styles';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import styles from "./styles/PaletteFooterStyles";

function PaletteFooter(props){
    const { classes } = props;
    return(
        <footer className={classes.paletteFooter}>
            {props.paletteName}
            <span className={classes.emoji}>{props.emoji}</span>
        </footer>
    )
}

export default withStyles(styles)(PaletteFooter);