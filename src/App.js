import React, { Component } from 'react'
import './App.css'
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import { Route, Switch } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' render={()=> <h1>Palette list goes here</h1>}/>
        <Route exact path='/palette/:id' render={()=> <h1> Individual Palette goes here</h1>}/>
      </Switch>
      // <div>
      // <Palette palette={generatePalette(seedColors[4])}/>
      // </div >
    )
  }
}

export default App;
