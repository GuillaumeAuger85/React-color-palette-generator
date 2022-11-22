import React, { Component } from 'react'
import './App.css'
import Palette from './Palette';
import seedColors from './seedColors';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import { generatePalette } from './colorHelpers';
import { Route, Switch } from 'react-router-dom';
import { palette } from '@mui/system';



class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'))
    this.state = {
      palettes: savedPalettes || seedColors
    };
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }
  findPalette = (id) => this.state.palettes.find(palette => palette.id === id);
  deletePalette(id) {
    this.setState(st =>
      ({ palettes: st.palettes.filter(palette => palette.id !== id) }),
      this.syncLocalStorage
    )
  }
  savePalette(newPalette) {
    this.setState({ palettes: [...this.state.palettes, newPalette] }, this.syncLocalStorage)
  }
  syncLocalStorage() {
    const palettes = JSON.stringify(this.state.palettes)
    window.localStorage.setItem('palettes', palettes)
  }
  render() {

    return (
      <Switch>
        <Route
          exact
          path='/palette/new'
          render={(routeProps) => <NewPaletteForm savePalette={this.savePalette} {...routeProps} palettes={this.state.palettes} />} />
        <Route
          exact
          path='/palette/:paletteId/:colorId'
          render={(routeProps) =>
            <SingleColorPalette
              palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
              colorId={routeProps.match.params.colorId}
            />}
        />
        <Route
          exact
          path='/'
          render={(routeProps) => <PaletteList palettes={this.state.palettes} deletePalette={this.deletePalette} {...routeProps} />} />
        <Route
          exact
          path='/palette/:id'
          render={(routeProps) => <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />} />
      </Switch>
    )
  }
}

export default App;
