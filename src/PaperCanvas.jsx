import React, { Component, findDOMNode } from 'react'
import Paper from './containers/Paper/Paper.js'
import { compose } from 'recompose'
// for development without internet connection
// import Pa from '';
import withPaperViewport from './containers/NodeCanvas/hoc/withPaperViewport';
import 'material-design-icons/iconfont/material-icons.css'

import './App.css'

import MR_BUBBLES_JSON from './mr-bubbles.json'
import MR_BUBBLES_IMAGE_480 from './mr-bubbles-480.jpg'
import MR_BUBBLES_IMAGE_720 from './mr-bubbles-720.jpg'
import MR_BUBBLES_IMAGE_1080 from './mr-bubbles-1080.jpg'

const IMAGE_WIDTH = 1920
const IMAGE_HEIGHT = 870

const IMAGES = {
  480: MR_BUBBLES_IMAGE_480,
  720: MR_BUBBLES_IMAGE_720,
  1080: MR_BUBBLES_IMAGE_1080,
}

const testCircles = [
  {
    color: 'red',
    data: 'M674,492c0,-32.03252 25.96748,-58 58,-58c32.03252,0 58,25.96748 58,58c0,32.03252 -25.96748,58 -58,58c-32.03252,0 -58,-25.96748 -58,-58z'
  },
  {
    color: 'blue',
    data: 'M731.5,476c0,-25.95738 21.04262,-47 47,-47c25.95738,0 47,21.04262 47,47c0,25.95738 -21.04262,47 -47,47c-25.95738,0 -47,-21.04262 -47,-47z'
  },
  {
    color: 'yellow',
    data: 'M372,294.5c0,-10.49341 8.50659,-19 19,-19c10.49341,0 19,8.50659 19,19c0,10.49341 -8.50659,19 -19,19c-10.49341,0 -19,-8.50659 -19,-19z'
  }
]

function generateIntial(intialStoreData){
  var generatedShapes = []
  intialStoreData.map((item, index)=>{
    var initalItem = {
      id: item.id,
      type: "Layer",
      children: [{
        id: item.id + '_child_'+index,
        type: "Circle",
        fillColor: testCircles[index].color,
        pathData: testCircles[index].data,
      }]
    }
    generatedShapes.push(initalItem)
  })
  console.log('generated shapes are: ', generatedShapes);
  return generatedShapes
}


class PaperCanvas extends Component {

  constructor(props) {
    super(props)
    this.state = {
      imageSize: 720,
      mounted: false,
      // intialData: generateIntial(this.props.panels.sources),
      initialData: props.testInitialData

    }
    this._box = null
    this._request = null
  }

  resizeWindow = () => {
    if (!this._request) {
      this._request = requestAnimationFrame(this.resizePaper)
    }

  }

  resizePaper = () => {
    this.forceUpdate()
    this._request = null
  }

  setImageSize = ({ size }) => {
    this.setState({ imageSize: size })
  }

  componentDidMount() {
    this.setState({ mounted: true })
    console.log(this.state.initialData, 'state of intial data')

    window.addEventListener('resize', this.resizeWindow)
  }

  componentDidUpdate(nextProps) {
    console.log(this.state.initialData);
    console.log(nextProps.testInitialData);
    if (this.props.testInitialData !== nextProps.testInitialData){
      console.log('new intial data at papercanvas');
      this.setState({initialData: this.props.testInitialData})
      this.forceUpdate()
    }
    console.log('new initial data is', this.state.initialData );
  }

  componentWillUnmount() {
    if (this._request) {
      cancelAnimationFrame(this._request)
      this._request = null
    }
    window.removeEventListener('resize', this.resizeWindow)
  }

  render() {
    const { sayHello } = this.props
    const { imageSize, mounted, initialData } = this.state
    const box = this._box && this._box.getBoundingClientRect()
    return (
      <div className="App" ref={ref => this._box = ref} onClick = {sayHello}>
      {/*<div style = {{zIndex: 10, width: '25%', height: '25%', backgroundColor: 'red', position: 'absolute', top: 0}}> {JSON.stringify(this.props.panels)} </div>*/}
        {mounted &&
          <Paper
            initialData={initialData}
            image={IMAGES[imageSize]}
            imageWidth={IMAGE_WIDTH}
            imageHeight={IMAGE_HEIGHT}
            imageSize={imageSize}
            width={box.width}
            height={box.height}
            setImageSize={this.setImageSize}
            passed = {this.props.panels}
            sayHello = {sayHello}
          />}
      </div>
    )
  }

}

export default compose (withPaperViewport)(PaperCanvas)
