import React, { Component } from 'react';


function PaletteFooter(props) {
    function containsAnyLetters(str) {
        return /[a-zA-Z]/.test(str);
      }
    const { paletteName, emoji } = props;
    const span = containsAnyLetters(emoji) ? <span className={`emoji fi fi-${emoji.toLowerCase()}`}></span> : <span className='emoji'>{emoji}</span>;
    return (
        <footer className='palette-footer'>
            {paletteName}
            {span}
        </footer>
    )
}

export default PaletteFooter
