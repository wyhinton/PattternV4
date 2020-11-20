import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import PrimaryShape from './PrimaryShape'
import AddModifierMenu from './Modifier/AddModifierMenu'
import Modifier from './Modifier/Modifier'
import AcUnitIcon from '@material-ui/icons/AcUnit';
import DraggableList from './Modifier/draggableList/DraggableList'
import ModifierPanel from './Modifier/ModifierPanel'
import SourcePanel from './Source/SourcePanel'
import Panel from './Panel'
import sourceList from './Source/SourceList'
import modifierList from './Modifier/ModifierList'
// import ModifierMenuItems from '../StaticData/ModifierListItems';
import modifierMenuItems from '../StaticData/modifierListItems.js';
import { useState, useEffect } from 'react'
// import TestGraph from './TestGraph'
import { useStore } from 'easy-peasy'

// import { useStore, useStoreState, useStoreActions } from 'easy-peasy'
import { connect } from 'react-redux';
import { useHotkeys } from 'react-hotkeys-hook'
import PTestFlow from './PTestFlow';
import PopUpMenuContainer from './PopUpMenu/NodeMenuPopUp';
// import { HotKeys }
import SecondGraph from './SecondGraph';
import { useStoreState, ReactFlowProvider, useStoreActions } from 'react-flow-renderer';

const useStyles = makeStyles((testSources, testModifiers)=>({
  root: {
    backgroundColor: 'rgba(100, 100, 100, 0)',
    borderRadius: '27px 27px 0px 0px',
    paddingTop: '10px',
    height: '100%',
    overflow: 'sroll',
    boxShadow: 'inset 0 0 10px rgba(200,200,200,1);',
    marginTop: '0%',
    position: 'relative',
  },
  sourceShapeHeader: {
    marginBottom: 10,
    backgroundColor: 'black',
    color: '#ff4d00',
    fontSize: 24
  },
  primaryShape: {
    marginBottom: 10
  },

}));


const Editor =  ({testModifiers, testSources, global, addToRackMode}) => {
    const classes = useStyles();
    const [sources, setSources] = useState(testSources)
    const [sourceCount, setSourceCount] = useState(0)

    const [modifiers, setModifiers] = useState(testModifiers)
    const [modifierCount, setModifierCount]  = useState(0)
    const [editorData, setEditorData] = useState([])
    const [panel, setPanel] = useState()
    const [showMenu, setShowMenu] = useState(false)

    const [position, setPosition] = useState([0,0])
    const [mousePosition, setMousePosition] = useState([0,0])
    const [shouldStore, setShouldStore] = useState(false)

    // const initialElements = useStoreState(state=>state.global.nodes.activeNodes)
    const editorContainer = React.useRef(null)
    const setElements = useStoreActions(actions=>actions.setElements)
    const elements = useStoreState(state=>state.elements)

    // useHotkeys('shift+d', ()=> setShowMenu(true))
    // useHotkeys('alt+m', ()=> setShowMenu(false))
    // useHotkeys('ctrl+m', ()=> popUpMenu())

    const onHover = (e) =>{
      let currentTargetRect = e.currentTarget.getBoundingClientRect();
      const event_offsetX = e.pageX - currentTargetRect.left, event_offsetY = e.pageY - currentTargetRect.top;
      console.log([event_offsetX, event_offsetY]);
      setMousePosition([event_offsetX, event_offsetY])
    }

    const popUpMenu = () => {
      console.log('doing pop up ');
      setShowMenu(true)
      setShouldStore(true)
      // editorContainer.current.removeEventListener("mousemove", onHover);
    }

    const onChildClick = (value) => {
      setSourceCount(sourceCount => sourceCount + 1)
      var prevArray = [...sources]
      setSources(prevArray => [...prevArray, {
        id: sourceCount,
        text: 'blablahblah',
        type: value,
        open: false,
      }])
      console.log(prevArray)
      console.log(sources)
      console.log('should add new source')
    }

    const modifierPanel  =
          <Panel
            position = {'75%'}
            label = "MODIFIERS"
            dropDownItems = {modifierList}
            activeItems = {testModifiers}
            onChange = {onChildClick}
            dropDownlabel = {'Add Modifier'}
            useInput = {true}
            useOutput = {false}
            startTabs  = {1}
            nodeId = {'modifiers'}
            />

    var sourcePanel =
          <Panel
            label = "SOURCES"
            dropDownItems = {sourceList}
            activeItems = {testSources}
            onChange = {onChildClick}
            dropDownlabel = {'Add Source'}
            position = {'25%'}
            useInput = {false}
            useOutput = {true}
            startTabs = {1}
            nodeId = {'sources'}
            />

    const nodes = useStoreState(state=>state.nodes)

  const handleClick = (e) => {
    let currentTargetRect = e.currentTarget.getBoundingClientRect();
    const event_offsetX = e.pageX - currentTargetRect.left, event_offsetY = e.pageY - currentTargetRect.top;
    console.log(event_offsetX, 'offset x is');
    setPosition([event_offsetX, event_offsetY])
  }

  useEffect(()=>{
   let newNodes = []
   nodes.forEach((item, i) => {
     console.log('item');
     addToRackMode ? item.data.className = 'addNodeRackClass' : item.data.className = 'baseClass'
     newNodes.push(item)
   });
 }, [addToRackMode])

  const secondTest = (testModifiers.length)

  // const setActiveNode = useStoreActions(actions=>actions.global.setActiveNode)
  // const duplicateNode = useStoreActions(actions=>actions.global.duplicateNode)
  // const deleteActiveNode = useStoreActions(actions=>actions.global.deleteActiveNode)
  // const addToSelection = useStoreActions(actions=>actions.global.addToSelection)

  // const addNode = useStoreActions(actions => actions.panels.addNode)

  const handleAddNode = (newNodeType) => {
    // addNode(newNodeType)
    console.log('firing handle add');
    setShowMenu(false)
  }

  const PopUpMenuProps = { handleAddNode, position, showMenu}

  return (
      null
  )
}


export default connect(
    (state) => ({
      testModifiers: state.panels.modifiers,
      testSources: state.panels.sources,
      test: state.global
    })
    // (dispatch)
) (Editor)
// export default Editor;
