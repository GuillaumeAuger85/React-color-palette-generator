import sizes from './sizes';
import bg from './bg.svg'

export default {
  '@global':{
        '.fade-exit':{
          opacity:1
        },
        '.fade-exit-active':{
          opacity:0,
          transition:'opacity 500ms ease-out'
        }
  },
  root: {
    backgroundColor: 'blue',
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    /* background by SVGBackgrounds.com */
    backgroundImage: `url(${bg})`,
    overflow: 'scroll'
  },
  container: {
    width: '50%',
    display: 'flex',
    alignItems: 'flex-start',
    flexdirection: 'column',
    flexWrap: 'wrap',
    [sizes.down('xl')]: {
      width: '80%'
    },
    flexWrap: 'wrap',
    [sizes.down('xs')]: {
      width: '75%'
    }
  },
  nav: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    '& a': {
      color: '#FFF',
      fontWeight:'700',
      fontSize:'1.3rem'
    }
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '2.5rem',
    [sizes.down('md')]: {
      gridTemplateColumns: 'repeat(2, 50%)'
    },
    [sizes.down('xs')]: {
      gridTemplateColumns: 'repeat(1, 100%)',
      gridGap: '1.4rem'
    }
  },
  heading: {
    fontSize: '2rem',
    color: '#FFF'
  }
}
