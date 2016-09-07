# color-palettes
Get color from image

## Install
```bash
npm install color-palettes
```

## Usage
```js
import colorPalettes from 'color-palettes'

let cp = new colorPalettes('pic.jpg')
cp.getPalettes({
  colorCount: 6
}).then( (result) => {
  console.log(result) // [ [51, 94, 123], [210, 186, 185], ...[114, 192, 174]]
})
```

```js
import colorPalettes from 'color-palettes'

let cp = new colorPalettes('pic.jpg')
cp.dominantThree({
  format: 'hex'
}).then( (result) => {
  console.log(result) // #
})
```

## Credits

* Basic Javascript port of the MMCQ (modified median cut quantization) from Nick Rabinowitz. (http://gist.github.com/1104622)
