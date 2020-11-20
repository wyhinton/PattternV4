import React, { Component, useState, useCallback, useEffect } from 'react'
import { ModifierContext } from './ModifierContext'
import { useStoreState, useStoreActions } from 'easy-peasy'

// for development without internet connection
import 'material-design-icons/iconfont/material-icons.css'
import Grid from '@material-ui/core/Grid'
import Editor from './containers/Editor/Editor'
import AppModals from './containers/Editor/Modals/AppModals'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import { makeStyles, withStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from './theme'
import PaperCanvas from './PaperCanvas'
import AppToolbar from './containers/AppToolbar/AppToolbar';
import NodeRack from './containers/Editor/NodeRack/NodeRack';
import firebase from 'firebase'
import model from './model'
import { useToggle } from './containers/Editor/Util/UseToggle'
import {ReactFlowProvider} from 'react-flow-renderer';
// import { HotKeys } from 'react-hotkeys';
import SecondGraph from './containers/Editor/SecondGraph';
import {DB_CONFIG} from './config.js'
import './App.css'
import NewModifier from './containers/Editor/ModifierHOC/NewModifier';
import Debugger from './containers/Editor/Util/Debugger';

import { connect } from 'react-redux';
import { compose } from 'recompose'
import { useHotkeys } from 'react-hotkeys-hook'

import withAppToolbar from './containers/AppHoc/withAppToolbar';

function generateNewLayer(scope, id, index){
  var testChild = randomCircleItem(scope, id)
  var newLayer = {
    id: 'new generated layer_'+id,
    type: "Layer",
    children: [testChild]
  }
  console.log(newLayer);
  return newLayer
}

function randomCircleItem(scope, id){
  const newItem = {
    type: 'Circle',
    pathData: 'M856.06359,482.32447c0,-28.16652 22.83348,-51 51,-51c28.16652,0 51,22.83348 51,51c0,28.16652 -22.83348,51 -51,51c-28.16652,0 -51,-22.83348 -51,-51z',
    fillColor: 'black',
    id: 'generated circle_'+ id
  }
  console.log(newItem, 'new cirlce');
  return newItem

}

const keyMap = {
  SNAP_LEFT: "command+left",
  DELETE_NODE: "u"
};

const useStyles = makeStyles((theme)=>({
  editor: {
    zIndex: 1
  },
  root: {
    height: '100%',
    padding: 0
  },
  graphContainerHorizontal: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '25%'
  },
  graphContainerVertical: {
    position: 'absolute',
    display: 'none',
    right: 0,
    top: 0,
    width: '25%',
    height: '100%'
  },
  graphContainerFull: {
    display: 'block',
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
    height: '100%'
  },
  testClass: {
    position: 'absolute',
    width: '100%',
    top: 0,
    height: '10%',
    textAlign: 'center',
    backgroundColor: 'black',
    zIndex: 100,
    color: ''
  }

}));


// const store = createStore()

export function App({
  panels,
  testProp,
  viewMode,
  modalActive,
  closeModal,
  setNodeView,
  setCanvasView,
  setSeeThroughView,
  setSettingsView,
  setExportView,
  setMappingView,
  setIntroView,
  setExplanationView,
  setFeedbackView,
  setBackgroundVisibility,
  backgroundVisible,
  setShortcutView,
  seeThrough,
  addToRackMode,
  setAddToRackMode,
  nodeViewOptions,
  checkNodeViewOption,
  setNodeViewProp,
  nodeView,
}) {

  const classes = useStyles()

  const toolbarProps = {
    viewMode,
    modalActive,
    setSeeThroughView,
    setNodeView,
    setCanvasView,
    setSettingsView,
    setExportView,
    setMappingView,
    setIntroView,
    setExplanationView,
    setFeedbackView,
    setBackgroundVisibility,
    backgroundVisible,
    setShortcutView,
    seeThrough,
    addToRackMode,
    setAddToRackMode,
    nodeViewOptions,
    checkNodeViewOption,
    setNodeViewProp,
    nodeView,
  }

  const modalProps = {
    viewMode,
    modalActive,
    closeModal
  }

  const initialData = panels.sources.map(source => (
    generateNewLayer('blah', source.id, source.index)
  ));

  const addRackNode = useStoreActions(actions=>actions.global.nodes.addRackNode)

  const blah = () =>{
    console.log(initialData);
  }
  useEffect(()=>{
    // console.log('global state is: ', globalState);
    console.log('backgroundVisible at app: ', backgroundVisible);
    // console.log(setNodeViewOptions);
  })

    return (
            <ThemeProvider theme = {theme}>
                <div style = {{position: 'absolute', width: '100vw', height: '100vh', overflow: 'hidden', top: 0}} >
                  <AppModals {...modalProps}/>
                  <AppToolbar {...toolbarProps}/>

                  {viewMode}
                  <NodeRack   style ={{opacity: seeThrough ? '50%' : '100%'}}/>
                    <Grid container spacing = {0} className = {classes.root}>
                      <Grid item xs = {12} style =
                      {
                        {
                          display: backgroundVisible ? 'block' : 'none',
                        }
                      }>
                          <PaperCanvas testInitialData = {initialData} panels = {panels} />
                      </Grid>
                    </Grid>
                    <div className = {
                        (viewMode === 'canvas') ? classes.graphContainerVertical :
                        (viewMode === 'node') ? classes.graphContainerFull :
                        classes.graphContainerVertical
                       }
                        style ={{opacity: seeThrough ? '50%' : '100%'}}
                      >
                      <SecondGraph nodeView = {nodeView} addRackNode = {addRackNode} addToRackMode = {addToRackMode} viewMode = {viewMode}/>
                    </div>
                </div>
            </ThemeProvider>
    )

}

// export default connect(
//     (state) => ({
//       panels: state.panels
//     })
// ) (App)
const basicApp = connect(
    (state) => ({
      panels: state.panels
    })
)(App)

export default compose(
  withAppToolbar
)(basicApp)
