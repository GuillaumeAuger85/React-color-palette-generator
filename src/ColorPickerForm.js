import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/ColorPickerFormStyles';


class ColorPickerForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentColor: 'teal',
            newColorName: "",
        }
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        ValidatorForm.addValidationRule("isColorNameUnique", value =>
            this.props.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule("isColorUnique", value =>
            this.props.colors.every(({ color }) => color !== this.state.currentColor)
        );

    }
    updateCurrentColor(newColor) {
        const { r, g, b, a } = newColor.rgb;
        const rgbaColor = `rgba(${r},${g},${b},${a})`;
        this.setState({ currentColor: rgbaColor });
    }
    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    handleSubmit() {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        };
        console.log(newColor)
        this.props.addNewColor(newColor);
        this.setState({ newColorName: '' });
    }
    render() {
        const { isPaletteFull, classes } = this.props;
        const { currentColor, newColorName } = this.state
        return (
            <div>
                <ChromePicker
                    className={classes.picker}
                    color={currentColor}
                    onChangeComplete={this.updateCurrentColor}
                />
                <ValidatorForm
                    onSubmit={this.handleSubmit}
                    ref='form'
                    instantValidate={false}
                >
                    <TextValidator
                        placeholder='Color Name'
                        variant='filled'
                        className={classes.colorNameInput}
                        value={newColorName}
                        margin='normal'
                        name='newColorName'
                        onChange={this.handleChange}
                        validators={["required", "isColorNameUnique", "isColorUnique"]}
                        errorMessages={[
                            "Enter a color name",
                            "Color name must be unique",
                            "Color already used!"
                        ]}
                    />
                    <Button
                        className={classes.addColor}
                        variant='contained'
                        type='submit'
                        color='primary'
                        disabled={isPaletteFull}
                        style={{ backgroundColor: isPaletteFull ? 'grey' : currentColor }}
                    >
                        {isPaletteFull ? 'Palette Full' : 'Add Color'}
                    </Button>
                </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles)(ColorPickerForm)