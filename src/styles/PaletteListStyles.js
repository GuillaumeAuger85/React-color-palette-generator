import sizes from './sizes';

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
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    /* background by pixabay.com */
    backgroundImage: `url(https://pixabay.com/get/g64a0e21b6cab98170765d94607f78c6fcbf076ce4fed9c3fc52814d54ca79846747601b9fcff548663ded57a6713e6b48e1c4766df6e65a7038ee5abe31732205dee867eb77267332d62cf49c3f313c1_1920.jpg)`,
    overflowY: 'scroll'
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
