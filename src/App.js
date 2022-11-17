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
    this.state = {
      palettes: seedColors
    };
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }
  findPalette = (id) => this.state.palettes.find(palette => palette.id === id);
  savePalette(newPalette) {
    this.setState({ palettes: [...this.state.palettes, newPalette] })
    console.log(this.state.palettes)
  }
  render() {

    return (
      <Switch>
        <Route
          exact
          path='/palette/new'
          render={(routeProps) => <NewPaletteForm savePalette={this.savePalette} {...routeProps} />} />
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
          render={(routeProps) => <PaletteList palettes={this.state.palettes} {...routeProps} />} />
        <Route
          exact
          path='/palette/:id'
          render={(routeProps) => <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />} />
      </Switch>
    )
  }
}

export default App;
