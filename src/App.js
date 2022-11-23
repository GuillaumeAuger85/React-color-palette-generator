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
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css';



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
      <Route render={({ location }) =>
        <TransitionGroup>
          <CSSTransition key={location.key} classNames='fade' timeout={500}>
            <Switch location={location}>
              <Route
                exact
                path='/palette/new'
                render={(routeProps) =>
                  <div className='page'>
                    <NewPaletteForm savePalette={this.savePalette} {...routeProps} palettes={this.state.palettes} />
                  </div>
                }
              />
              <Route
                exact
                path='/palette/:paletteId/:colorId'
                render={(routeProps) =>
                  <div className='page'>
                    <SingleColorPalette
                      palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
                      colorId={routeProps.match.params.colorId}
                    />
                  </div>
                }
              />
              <Route
                exact
                path='/'
                render={(routeProps) =>
                  <div className='page'>
                    <PaletteList palettes={this.state.palettes} deletePalette={this.deletePalette} {...routeProps} />
                  </div>
                }
              />
              <Route
                exact
                path='/palette/:id'
                render={(routeProps) =>
                  <div className='page'>
                    <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />
                  </div>
                }
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      } />
    )
  }
}

export default App;
