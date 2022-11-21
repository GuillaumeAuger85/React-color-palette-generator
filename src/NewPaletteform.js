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


const drawerWidth = 400;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        height: `calc(100vh - 64px)`,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
});


class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    }
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            colors: this.props.palettes[0].colors,
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
    handleSubmit(newPaletteName) {
        const newPalette = {
            paletteName: newPaletteName,
            id: newPaletteName.toLowerCase().replace(/ /g, '-'),
            colors: this.state.colors
        }
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
    // addRandomColor() {
    //     const allColors = this.props.palettes.map(p => p.colors).flat();
    //     const rand = Math.floor(Math.random() * allColors.length);
    //     const randomColor = allColors[rand];
    //     this.setState ({colors:[...this.state.colors, randomColor]})
    // }
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
                    <Typography variant='h4'>Design Your Palette</Typography>
                    <div>
                        <Button
                            variant='contained'
                            color='secondary'
                            onClick={this.clearPalette}
                        >
                            Clear Palette
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            disabled={isPaletteFull}
                            onClick={this.addRandomColor}
                        >
                            Random Color
                        </Button>
                    </div>
                    <ColorPickerForm isPaletteFull={isPaletteFull} addNewColor={this.addNewColor} colors={colors}/>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <DraggableColorList colors={colors} deleteNewColor={this.deleteNewColor} axis='xy' onSortEnd={this.onSortEnd} />
                </main>
            </div>
        );
    }
}



export default withStyles(styles, { withTheme: true })(NewPaletteForm);