import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css'

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stage: 'form',
            newPaletteName: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.showEmojiPicker = this.showEmojiPicker.bind(this);
        this.savePalette = this.savePalette.bind(this);
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
            this.props.palettes.every(palette => palette.paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    };
    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    };
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    showEmojiPicker() {
        this.setState({ stage: 'emoji' })
    }
    savePalette(emoji) {
        const newEmoji = emoji.name.toLowerCase().includes('flag') ? emoji.id.slice(-2) : emoji.native;
        const newPalette = { paletteName: this.state.newPaletteName, emoji: newEmoji.toLowerCase() };
        this.props.handleSubmit(newPalette)
    }

    render() {
        const { newPaletteName } = this.state;
        const { hideForm, handleSubmit } = this.props
        return (
            <div>
                <Dialog open={this.state.stage === 'emoji'} onClose={hideForm}>
                    <Picker
                        title='Pick a Palette Emoji'
                        onSelect={this.savePalette}
                    />
                </Dialog>
                <Dialog
                    onClose={hideForm}
                    open={this.state.stage === 'form'}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                    <ValidatorForm onSubmit={this.showEmojiPicker}>
                        <DialogContent>
                            <DialogContentText>
                                Please enter a name for your new palette. Make sure  it's unique!
                            </DialogContentText>
                            <TextValidator
                                value={newPaletteName}
                                label='Palette Name'
                                name='newPaletteName'
                                fullWidth
                                margin='normal'
                                onChange={this.handleChange}
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={['Enter Palette Name', 'Palette name already used']}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={hideForm} color="primary">
                                Cancel
                            </Button>
                            <Button variant='contained' color='primary' type='submit'>
                                Save Palette
                            </Button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>
        );
    }
}


export default PaletteMetaForm