import chroma from "chroma-js";
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePalette(starterPalette) {
    let newPalette = {
        paletteName: starterPalette.paletteName,
        id: starterPalette.id,
        emoji: starterPalette.emoji,
        colors: {}
    }
    for (let level of levels) {
        newPalette.colors[level] = [];
    }
    for (let color of starterPalette.colors) {
        let scale = generateScale(color.color, 10).reverse();
        for (let i in scale) {
            newPalette.colors[levels[i]].push({
                name: `${color.name} ${levels[i]}`,
                id: color.name.toLowerCase(/ /g, '-'),
                hex: scale[i],
                rgb:chroma(scale[i]).css(),
                rgba: chroma(scale[i]).css().length < 17 ? chroma(scale[i]).css().replace('rgb','rgba').replace(')',',1.0)') : chroma(scale[i]).css()
            })
        }
    }
    return newPalette
}
function getRange(hexColor) {
    const end = '#fff';
    return [
        chroma(hexColor)
            .darken(1.4)
            .hex(),
        hexColor,
        end
    ]
}

function generateScale(hexColor, numberOfColors) {
    return chroma
        .scale(getRange(hexColor))
        .mode('lab')
        .colors(numberOfColors)
}


export { generatePalette }