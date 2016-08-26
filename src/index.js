import quantize from './MMCQ'

const componentToHex = (c) => {
  let hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex ;
}

const rgbToHex = (rgb) => {
  let c = '';
  for(let i=0; i<3; i++){
    c += componentToHex(rgb[i]);
  }
  return c;
}

export default class ColorPalettes {

  constructor(image) {
    if(image instanceof HTMLImageElement) {
      this._image = image;
      this.fetching = new Promise( (resolve) => {
        resolve();
      })
    }
    else if (typeof image === 'string'){
      this._imageUrl = image;
      this.fetching = new Promise( (resolve, reject) => {
        this._fetchImage(resolve, reject);
      })
    }
  }

  _fetchImage (resolve, reject) {
    this._image = new Image();
    this._image.crossOrigin = 'anonymous';
    this._image.src = this._imageUrl;
    this._image.onload = () => {
      resolve();
    }
  }

  _getPixelArray () {
		return this._getCanvas().getContext('2d').getImageData(0, 0, this._image.width, this._image.height).data;
  }

  _getCanvas () {
    if (this._canvas) {
			return this._canvas;
		}

		let canvas, context;

		this._canvas = document.createElement('canvas');
		this._canvas.width = this._image.width;
		this._canvas.height = this._image.height;
		context = this._canvas.getContext('2d');

		context.drawImage(this._image, 0, 0);

		return this._canvas;
  }

  dominantThree ({format = 'rgb'} = {}){

    return this.getPalettes({
      colorCount: 5,
      format: format
    }).then( (res) => {
      return res.slice(0,3);
    });
  }

  getPalettes ({colorCount = 10, format = 'rgb'} = {}) {

    return this.fetching.then( (res) => {
      let pixels = this._getPixelArray();
      let pixelCount = this._image.width * this._image.height;

      let pixelArray = [];
      for(let i=0, offset, r, g, b; i<pixelCount; i+=4) {
        r = pixels[i + 0];
        g = pixels[i + 1];
        b = pixels[i + 2];
        pixelArray.push([r, g, b]);
      }

      let cmap = quantize(pixelArray, colorCount);
      let palettes = cmap.palette();
      if(format === 'hex'){
        let hexPalettes = palettes.map( (p) => {
          return rgbToHex(p);
        });
        return hexPalettes;
      }
      else{
        return palettes;
      }
    });
  }
}

