import CanvasWriter from '../CanvasWriter';


// Extends CanvasWriter functionality
export default class GIFWriter extends CanvasWriter {

  constructor(options){
    super(options)

  }
  //blah super blah
  //second canvas here (not in paper class)

  //spread into same array in constructor?
  //more dom nodes :
  // - animationstart
  // - speed
  // - etc (see original)
  // - output img/link?

  // onRecorded // onSaved callbacks [probs used to update UI]

  animate() {}

  record() {}

  save() {
    //save as img
  }
}
