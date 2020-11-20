import React, { Component, useContext } from 'react'
import PropTypes from 'prop-types'
// import { ModifierContext } from '../ModifierContext'
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

import GridPaper from '../Editor/GridPaper/GridPaper'

import Editor from '../Editor/Editor'
import { connect } from 'react-redux';


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

function addAnother(hist){
  const item = Object.assign({}, hist[hist.length -1])
  hist.push(item)
  return hist
}

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

    this.containerRef = React.createRef()
    this.state = {
      imageLoaded: false,
      loaded: false,
      showLayers: true,
      showGrid: true,
      size: [randomInt(40,320),randomInt(40,320)],
      open: false,
      grid: []
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

  toggleGrid = () =>{
    console.log('prev grid state: ', this.state.showGrid);
    this.setState({
      showGrid: !this.state.showGrid
    })
    console.log('post grid state: ', this.state.showGrid);
  }

  imageLoaded = (image) => {
    this._loaded = true
    this.props.fitImage(image)
    this.setState({ imageLoaded: true, loaded: true })
  }

  componentDidMount(){
    console.log(this._view);
    console.log('container ref is: ', this.containerRef.current, 'its id is: ', this.containerRef.current.id);
    console.log('canvas element id is: ', this._view.canvas.current.id);
    console.log('paper prjoect is: ', this._view.scope.project);
    console.log('panels are: ', this.props.panels);
  }

  componentDidUpdate(nextProps) {
    // window.gridPaper = new GridPaper({ elementID: 'preview' });

    console.log('%cupdated paper', "color: blue");
    const { image } = this.props
    if (image !== nextProps.image) {
      this.setState({ imageLoaded: false })
    }
    if (this.props.initialData !== nextProps.initialData) {
      console.log('got new intial data');
      this.forceUpdate()
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
      box, sayHello
    } = this.props

    const { loaded, imageLoaded, showLayers, showGrid} = this.state

    const toolbarProps = assign(pick(this.props, [
      'activeTool', 'animate', 'fullscreen', 'imageSize',
      'canUndo', 'canRedo', 'undo', 'redo', 'clearHistory',
      'setTool', 'setImageSize', 'toggleAnimation', 'toggleFullscreen',
      'panels', 'viewMode'
    ]), {
      showLayers,
      showGrid,
      save: this.save,
      toggleLayers: this.toggleLayers,
      toggleGrid: this.toggleGrid,

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

    // const testCirc = <Circle center= {[width/2, height/2]} radius = {30} strokeColor = {'black'}/>
    // var testCirc = Paper.Circle(new Point(50, 50), 25)
    // var copy = testCirc.clone();
    // testCirc


    return (

    <div>
      {/*<div style = {{
          position: 'absolute',
          right: 0,
          top: 0,
          width: '25%',
          height: '100%'}}>
        {JSON.stringify(this.props.panels)}
      </div>*/}

      <div className={`Paper tool-${activeTool}`} ref = {this.containerRef} id = {'gridContainer'} style = {{height: '100vh'}}>

        <Toolbar {...toolbarProps} />
          {/*{loaded &&
          <Menu {...menuProps} />}*/}
          {!imageLoaded &&
          <Loader color={'orange'} />}
          {/*{loaded && showLayers &&
          <Layers {...layerProps} />}*/}
        <View {...viewProps}>
          <Layer name={'raster'}>
            <Raster locked source={image} onLoad={this.imageLoaded} visible = {false}/>
          </Layer>
          <Layer children = {this.state.grid}/>
          <Layer name={'rectangle'} visible={imageLoaded}>
            <Motion style={{size: spring(this.state.open ? 400 : 100)}}>
              {({size}) =>
                <Rectangle
                  center={[width/2,height/2]}
                  size={[size,size]}
                  opacity={0.8}
                  fillColor={'#ffffff'}
                  // onClick={() => this.setState({ open: !this.state.open })}
                  onClick={() => sayHello}
                />
              }
            </Motion>
            <PointText
              point={[width/2-34,height/2+5]}
              content={'Click Me'}
              fillColor={'#000000'}
              fontSize={18}
              onClick={() => this.setState({ open: !this.state.open })}
              // onClick={() => this.setState(sayHello)}
            />
            <PointText
              point={[width/2-34,height/2+5]}
              content={'Click Me'}
              fillColor={'#000000'}
              fontSize={18}
              onClick={() => this.setState({ open: !this.state.open })}
            />
            <Circle center= {[width/2, height/2]} radius = {30} strokeColor = {'black'}/>


          {
            this.props.panels.sources.map((item, index)=>
              <Circle key = {index} center = {[width/(index+1), height/3]} radius = {30} fillColor = {'blue'}/>
            )
          }

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

        </View>.
      </div>
    </div>
    )
  }
}

// const PaperEnhanced  = compse()
const PaperEnhanced =  compose(
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

export default connect(
    (state) => ({
      panels: state.panels,
      viewMode: state.global.viewMode
    })
) (PaperEnhanced)

//
