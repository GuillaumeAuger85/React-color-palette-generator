import React, { Component } from 'react'
import './App.css'
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import { Route, Switch } from 'react-router-dom';
import { palette } from '@mui/system';


class App extends Component {
  render() {
    const findPalette = (id) => seedColors.find(palette => palette.id === id)
    console.log(findPalette("flat-ui-colors-american"))
    return (
      <Switch>
        <Route exact path='/' render={() => <h1>Palette list goes here</h1>} />
        <Route exact path='/palette/:id' render={(routeProps) => <Palette palette={generatePalette(findPalette(routeProps.match.params.id))}/>} />
      </Switch>
      // <div>
      // <Palette palette={generatePalette(findPalette(routeProps.match.params.id))}
      // </div >
    )
  }
}

export default App;
