import React, { Component, useContext } from 'react'
import PropTypes from 'prop-types'
import { ModifierContext } from '../ModifierContext'
import { compose } from 'recompose'
import assign from 'object-assign'
import pick from 'lodash.pick'
import randomInt from 'random-int'
import paper from 'paper'
import { Motion, spring } from 'react-motion'
import randomColor from 'randomcolor'
import {
  Layer, Raster, Tool, View,
  Circle, Path, Rectangle, PointText, Point // eslint-disable-line no-unused-vars
} from 'react-paper-bindings'

import Loader from './Loader/Loader'
import Toolbar from './Toolbar/Toolbar'
import Menu from './Menu/Menu'
import Layers from './Layers/Layers'

import withHistory from './hoc/withHistory'
import withFullscreen from './hoc/withFullscreen'
import withTools from './hoc/withTools'
import withMoveTool from './hoc/withMoveTool'
import withSelectTool from './hoc/withSelectTool'
import withPenTool from './hoc/withPenTool'
import withCircleTool from './hoc/withCircleTool'
import withRectangleTool from './hoc/withRectangleTool'
import withDeleteTool from './hoc/withDeleteTool'
import withGrid from './hoc/withGrid'

import './Paper.css'

import { useStore } from 'easy-peasy'

function allElements(paperData){
  var allPaperObjs = []
  for (var i = 0; i < paperData.length; i++) {
    let curLayer = paperData[i]
    for (var j = 0; j < curLayer.children.length; j++) {
      let curPaperObj = curLayer.children[j]
      allPaperObjs.push(curPaperObj)
    }
  }
  return allPaperObjs
}

function setFillColor(paperObjArray, color){
  for (var i = 0; i < paperObjArray.length; i++) {
    let curPaperObj = paperObjArray[i]
    if (curPaperObj.type = 'Path') {
      curPaperObj.strokeColor = color
    }
    if (curPaperObj.hasOwnProperty('fillColor')){
      curPaperObj.fillColor = color
    }
  }
}

function randomCircleItem(scope){
  const paper = scope
  const newCircle = new paper.Path.Circle({
    center: new paper.Point(481,262),
    fillColor: randomColor(),
    size: randomInt(20,120),
  })
  console.log('new paper circle', newCircle);
  const newItem = {
    type: 'Circle',
    // pathData: 'M318.5,121c0,-30.92795 25.07205,-56 56,-56c30.92795,0 56,25.07205 56,56c0,30.92795 -25.07205,56 -56,56c-30.92795,0 -56,-25.07205 -56,-56z',
    // pathData: newCircle.getPathData(),
    pathData: 'M856.06359,482.32447c0,-28.16652 22.83348,-51 51,-51c28.16652,0 51,22.83348 51,51c0,28.16652 -22.83348,51 -51,51c-28.16652,0 -51,-22.83348 -51,-51z',
    // pathData: newCircle.getPathData(),
    fillColor: newCircle.fillColor.toCSS(true),
    id: 'generated cirlce'
  }
  return newItem
  console.log(newItem);
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
// "id":1,
// "type":"Layer",
// "children":[{
//   "id":2,
//   "type":"Path",
//   "strokeColor":"red",
//   "strokeScaling":false,
//   "strokeWidth":2,
//   "pathData":"M177.02128,699.17021c14.25138,-14.25138 31.86427,-36.4945 40.85106,-54.46809c3.12112,-6.24223 0.90261,-39.93287 2.7234,-43.57447c6.67805,-13.3561 6.94469,-30.2298 13.61702,-43.57447c19.24589,-38.49177 46.93214,-79.61299 76.25532,-108.93617c0.9078,-0.9078 1.8156,-7.26241 2.7234,-8.17021c5.44352,-5.44352 15.59321,-15.59321 21.78723,-21.78723c0.9078,-0.9078 1.8156,-7.26241 2.7234,-8.17021c5.25033,-5.25033 19.26031,-8.36669 24.51064,-13.61702c8.71923,-8.71923 36.0829,-28.93507 49.02128,-35.40426c2.17872,-1.08936 5.99149,1.08936 8.17021,0c11.23195,-5.61598 18.72549,-18.89466 29.95745,-24.51064c5.37154,-2.68577 10.83304,-5.41652 16.34043,-8.17021c1.64432,-0.82216 6.91128,1.25893 8.17021,0c4.99894,-4.99894 14.04119,-9.744 21.78723,-13.61702c11.08241,-5.5412 24.60593,-21.83488 35.40426,-27.23404c1.65055,-0.82527 7.02899,-1.58218 8.17021,-2.7234c6.44051,-6.44051 19.68055,-22.09559 29.95745,-27.23404c2.47043,-1.23521 9.11605,-3.66924 10.89362,-5.44681c4.5806,-4.5806 9.0661,-15.42667 16.34043,-19.06383c13.35675,-6.67838 26.62094,-21.48068 38.12766,-27.23404c2.80818,-1.40409 20.90203,-7.28501 21.78723,-8.17021c21.266,-21.266 40.61421,-35.1674 59.91489,-54.46809c7.55898,-7.55898 22.41113,-30.26939 32.68085,-35.40426c14.6744,-7.3372 26.80547,-18.63526 38.12766,-29.95745c14.0874,-14.0874 26.92826,-23.89908 35.40426,-40.85106c1.86848,-3.73695 7.1589,-13.61702 10.89362,-13.61702"
// },{
//   "id":3,
//   "type":"Circle",
//   "fillColor":"red",
//   "pathData":"M140.02128,693.7234c0,-20.43454 16.56546,-37 37,-37c20.43454,0 37,16.56546 37,37c0,20.43454 -16.56546,37 -37,37c-20.43454,0 -37,-16.56546 -37,-37z"
// }]
// },{
function generateNewLayer(scope){
  var testChild = randomCircleItem(scope)
  var newLayer = {
    id: 'new generated layer',
    type: "Layer",
    children: [testChild]
  }
  return newLayer
}

class Paper extends Component {

  static propTypes = {
    image: PropTypes.any.isRequired,
    imageWidth: PropTypes.number.isRequired,
    imageHeight: PropTypes.number.isRequired,
    imageSize: PropTypes.number.isRequired,
    initialData: PropTypes.any.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    activeTool: PropTypes.string.isRequired,
    activeLayer: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    selectedItem: PropTypes.number.isRequired,
    fitImage: PropTypes.func.isRequired,
    setTool: PropTypes.func.isRequired,
    selectItem: PropTypes.func.isRequired,
    setImageSize: PropTypes.func.isRequired,
    selectToolKeyDown: PropTypes.func.isRequired,
    selectToolKeyUp: PropTypes.func.isRequired,
    selectToolMouseDown: PropTypes.func.isRequired,
    selectToolMouseDrag: PropTypes.func.isRequired,
    selectToolMouseUp: PropTypes.func.isRequired,
    moveToolMouseDown: PropTypes.func.isRequired,
    moveToolMouseDrag: PropTypes.func.isRequired,
    moveToolMouseUp: PropTypes.func.isRequired,
    moveToolMouseWheel: PropTypes.func.isRequired,
    penToolMouseDown: PropTypes.func.isRequired,
    penToolMouseDrag: PropTypes.func.isRequired,
    penToolMouseUp: PropTypes.func.isRequired,
    circleToolMouseDown: PropTypes.func.isRequired,
    rectangleToolMouseDown: PropTypes.func.isRequired,
    deleteToolMouseDown: PropTypes.func.isRequired,
    gridToolMouseDown: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      imageLoaded: false,
      loaded: false,
      showLayers: true,
      size: [randomInt(40,320),randomInt(40,320)],
      open: false,
    }
    this._view = null
  }

  save = () => {
    const json = this._view._scope.project.exportJSON()
    const svg = this._view._scope.project.exportSVG({ embedImages: false })
    console.log(json)
    console.log(svg)
  }

  toggleLayers = () => {
    this.setState({
      showLayers: !this.state.showLayers,
    })
  }

  imageLoaded = (image) => {
    this._loaded = true
    this.props.fitImage(image)
    this.setState({ imageLoaded: true, loaded: true })
  }

  componentDidUpdate(nextProps) {
    console.log('%cupdated paper', "color: blue");
    const { image } = this.props
    if (image !== nextProps.image) {
      this.setState({ imageLoaded: false })
    }
    if (this.props.passed.sources !== nextProps.passed.sources){
      // console.log('change in source');
      // var newTestLayer = (generateNewLayer(this._view.scope))
      // var newData =
      // this.props.data.push(newTestLayer)
      //
      // this.props.data = generateIntial(nextProps.passed.sources)
      // this.forceUpdate()
    }


    var allmyobjs = allElements(this.props.data)
    console.log('paper content is: ', this.props.data, 'node state is: ',this.props.passed, 'all objs is: ', allmyobjs,  'background: black')
    var testModifier = this.props.passed.modifiers[0]
    var testControls = testModifier.controls
    var testColor = 'rgb('+testControls.subdivValue0 + ',' +  testControls.subdivValue1 +  ',' + testControls.subdivValue2 + ')'
    console.log('newest source object is', this.props.passed.sources[this.props.passed.sources.length-1]);



    /* vendors contains the element we're looking for */
    // }
  }


  render() {
    const {
      activeTool, activeLayer, image, data,
      selectedItem, setTool, width, height,
      box
    } = this.props



    const { loaded, imageLoaded, showLayers, } = this.state

    const toolbarProps = assign(pick(this.props, [
      'activeTool', 'animate', 'fullscreen', 'imageSize',
      'canUndo', 'canRedo', 'undo', 'redo', 'clearHistory',
      'setTool', 'setImageSize', 'toggleAnimation', 'toggleFullscreen',
    ]), {
      showLayers,
      save: this.save,
      toggleLayers: this.toggleLayers,
    })

    const layerProps = {
      data,
      activeLayer,
      selectedItem,
      selectItem: this.props.selectItem,
    }

    const menuProps = {
      activeTool,
      setTool,
      x: width / 2,
      y: height - 60,
      tools: [
        { tool: 'delete', icon: 'delete', title: 'Delete Tool (D)' },
        { tool: 'pen', icon: 'create', title: 'Pen Tool (P)' },
        { tool: 'select', icon: 'touch_app', title: 'Select Tool (A)' },
        { tool: 'move', icon: 'pan_tool', title: 'Move Tool (V)' },
        { tool: 'circle', icon: 'add_circle', title: 'Circle Tool (C)' },
        { tool: 'rectangle', icon: 'add_box', title: 'Rectangle Tool (R)' },
      ],
    }

    const viewProps = assign(
      pick(this.props, ['activeTool', 'activeLayer', 'width', 'height']),
      {
        ref: ref => this._view = ref,
        onWheel: this.props.moveToolMouseWheel,
        matrix: pick(this.props, ['sx', 'sy', 'tx', 'ty', 'x', 'y', 'zoom'])
      }
    )

    var drawGridLines = function(num_rectangles_wide, num_rectangles_tall, boundingRect) {
        var width_per_rectangle = boundingRect.width / num_rectangles_wide;
        var height_per_rectangle = boundingRect.height / num_rectangles_tall;
        for (var i = 0; i <= num_rectangles_wide; i++) {
            var xPos = boundingRect.left + i * width_per_rectangle;
            var topPoint = new paper.Point(xPos, boundingRect.top);
            var topPoint = new paper.Point(xPos, boundingRect.top);
            var bottomPoint = new paper.Point(xPos, boundingRect.bottom);
            var aLine = new paper.Path.Line(topPoint, bottomPoint);
            aLine.strokeColor = 'black';
        }
        for (var i = 0; i <= num_rectangles_tall; i++) {
            var yPos = boundingRect.top + i * height_per_rectangle;
            var leftPoint = new paper.Point(boundingRect.left, yPos);
            var rightPoint = new paper.Point(boundingRect.right, yPos);
            var aLine = new paper.Path.Line(leftPoint, rightPoint);
            aLine.strokeColor = 'black';
        }
    }

    // const testCirc = <Circle center= {[width/2, height/2]} radius = {30} strokeColor = {'black'}/>
    // var testCirc = Paper.Circle(new Point(50, 50), 25)
    // var copy = testCirc.clone();
    // testCirc


    return (


      <div className={`Paper tool-${activeTool}`}>

        <Toolbar {...toolbarProps} />
          {loaded &&
          <Menu {...menuProps} />}
          {!imageLoaded &&
          <Loader color={'orange'} />}
          {loaded && showLayers &&
          <Layers {...layerProps} />}
        <View {...viewProps}>
          <Layer name={'raster'}>
            <Raster locked source={image} onLoad={this.imageLoaded} visible = {false}/>
          </Layer>
          <Layer name = {'testGrid'}>
            <Path name = {'testPath'}/>
          </Layer>
          <Layer name={'rectangle'} visible={imageLoaded}>
            <Motion style={{size: spring(this.state.open ? 400 : 100)}}>
              {({size}) =>
                <Rectangle
                  center={[width/2,height/2]}
                  size={[size,size]}
                  opacity={0.8}
                  fillColor={'#ffffff'}
                  onClick={() => this.setState({ open: !this.state.open })}
                />
              }
            </Motion>
            <PointText
              point={[width/2-34,height/2+5]}
              content={'Click Me'}
              fillColor={'#000000'}
              fontSize={18}
              onClick={() => this.setState({ open: !this.state.open })}
            />
            <PointText
              point={[width/2-34,height/2+5]}
              content={'Click Me'}
              fillColor={'#000000'}
              fontSize={18}
              onClick={() => this.setState({ open: !this.state.open })}
            />
            <Circle center= {[width/2, height/2]} radius = {30} strokeColor = {'black'}/>
            {this.props.passed.sources.map((item, index)=>(
              <Layer>
                <Circle center= {[width/2, height/2]} radius = {30} strokeColor = {'black'}/>
              </Layer>
            ))}




          </Layer>
          {data.map(({ id: layerId, type, children }) =>
            <Layer
              key={layerId}
              data={{ id: layerId, type }}
              visible={imageLoaded}
              active={layerId === activeLayer}>
              {children.map(({ id: itemId, type: Item, ...props }) =>
                <Item
                  key={itemId}
                  {...props}
                  data={{ id: itemId, type: Item }}
                  selected={(
                    (activeTool === 'select') &&
                    (itemId === selectedItem || layerId === selectedItem)
                  )}
                />
              )}
            </Layer>
          )}
          <Tool
            activeTool={activeTool}
            active={activeTool === 'select'}
            name={'select'}
            onKeyDown={this.props.selectToolKeyDown}
            onKeyUp={this.props.selectToolKeyUp}
            onMouseDown={this.props.selectToolMouseDown}
            onMouseDrag={this.props.selectToolMouseDrag}
            onMouseUp={this.props.selectToolMouseUp}
          />
          <Tool
            activeTool={activeTool}
            active={activeTool === 'move'}
            name={'move'}
            onMouseDown={this.props.moveToolMouseDown}
            onMouseDrag={this.props.moveToolMouseDrag}
            onMouseUp={this.props.moveToolMouseUp}
          />
          <Tool
            activeTool={activeTool}
            active={activeTool === 'pen'}
            name={'pen'}
            onMouseDown={this.props.penToolMouseDown}
            onMouseDrag={this.props.penToolMouseDrag}
            onMouseUp={this.props.penToolMouseUp}
          />
          <Tool
            activeTool={activeTool}
            active={activeTool === 'circle'}
            name={'circle'}
            onMouseDown={this.props.circleToolMouseDown}
          />
          <Tool
            activeTool={activeTool}
            active={activeTool === 'rectangle'}
            name={'rectangle'}
            onMouseDown={this.props.rectangleToolMouseDown}
          />
          <Tool
            activeTool={activeTool}
            active={activeTool === 'delete'}
            name={'delete'}
            onMouseDown={this.props.deleteToolMouseDown}
          />
          <Tool
            activeTool={activeTool}
            active={activeTool === 'grid'}
            name={'grid'}
            onMouseDown={this.props.gridToolMouseDown}
          />
        </View>
      </div>
    )
  }
}

export default compose(
  withHistory,
  withFullscreen,
  withTools,
  withMoveTool,
  withSelectTool,
  withPenTool,
  withCircleTool,
  withRectangleTool,
  withDeleteTool,
  withGrid
)(Paper)
