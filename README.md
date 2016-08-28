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
  colorCount: 3
}).then( (result) => {
  console.log(result) // [ [51, 94, 123], [210, 186, 185], [114, 192, 174]]
})
```
