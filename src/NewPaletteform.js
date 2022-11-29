import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PaletteFormNav from './PaletteFormNav';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import seedColors from './seedColors';
import { arrayMove } from "react-sortable-hoc";
import ColorPickerForm from './ColorPickerForm';
import styles from './styles/NewPaletteFormStyles'

class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    }
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            colors: seedColors[0].colors,
            randomColors: seedColors.map(palette => (
                palette.colors
            )).flat(),
        };
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteNewColor = this.deleteNewColor.bind(this);
        this.clearPalette = this.clearPalette.bind(this);
        this.addRandomColor = this.addRandomColor.bind(this)
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    addNewColor(newColor) {
        this.setState({ colors: [...this.state.colors, newColor], newColorName: "" });
    }
    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    handleSubmit(newPalette) {
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
        newPalette.colors= this.state.colors;
        this.props.savePalette(newPalette);
        this.props.history.push('/')
    }
    deleteNewColor(name) {
        const colors = this.state.colors.filter(color => color.name !== name);
        this.setState({ colors: colors })
    }
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ colors }) => ({
            colors: arrayMove(colors, oldIndex, newIndex),
        }));
    };
    clearPalette() {
        this.setState({ colors: [] })
    }
    addRandomColor() {
        let { randomColors } = this.state;
        let currentColors = this.state.colors.map(color => color)
        for (let currentColor of currentColors) {
            randomColors = randomColors.filter(randomColor => (randomColor.name !== currentColor.name))
        }
        let newColor = randomColors[Math.floor(Math.random() * randomColors.length)];
        randomColors = randomColors.filter(randomColor => (randomColor.name !== newColor.name))
        this.setState({ colors: [...this.state.colors, newColor], randomColors: randomColors })
    }
    render() {
        const { classes, maxColors, palettes } = this.props;
        const { open, colors } = this.state;
        const isPaletteFull = colors.length >= maxColors;
        return (
            <div className={classes.root}>
                <PaletteFormNav
                    open={open}
                    palettes={palettes}
                    handleSubmit={this.handleSubmit}
                    handleDrawerOpen={this.handleDrawerOpen}
                />
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <div className={classes.container}>
                        <Typography variant='h4' gutterBottom>Design Your Palette</Typography>
                        <div className={classes.buttons}>
                            <Button
                                variant='contained'
                                color='secondary'
                                onClick={this.clearPalette}
                                className={classes.button}
                            >
                                Clear Palette
                            </Button>
                            <Button
                                variant='contained'
                                color='primary'
                                disabled={isPaletteFull}
                                onClick={this.addRandomColor}
                                className={classes.button}
                            >
                                Random Color
                            </Button>
                        </div>
                        <ColorPickerForm isPaletteFull={isPaletteFull} addNewColor={this.addNewColor} colors={colors} />
                    </div>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <DraggableColorList colors={colors} deleteNewColor={this.deleteNewColor} axis='xy' onSortEnd={this.onSortEnd} distance={20}/>
                </main>
            </div>
        );
    }
}



export default withStyles(styles, { withTheme: true })(NewPaletteForm);