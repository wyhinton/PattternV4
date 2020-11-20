import React, { useState, useEffect } from 'react';
import ReactFlow, { removeElements, addEdge, Background } from 'react-flow-renderer';
import { makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import SourceNode from './CustomNodes/SourceNode'
import BasicNode from './CustomNodes/BaseNode'
import MathNode from './CustomNodes/MathNode'
import BaseListNode from './CustomNodes/ListNodes/BaseListNode';
import withReactFlowStore from './withReactFlowStore';
import { useStore, useStoreState, useStoreActions } from 'easy-peasy'
import { compose } from 'recompose'

import { useHotkeys  } from 'react-hotkeys-hook'

const useStyles = makeStyles((theme)=>({
  root: {
    borderRadius: 10,
    height: 10,
    width: 10,
    border: '1px solid black'
  },
  node: {
    width: '100%',
    padding: 0,
    // background: '#fff0',
    border: 'none',
    color: "white",
    // backgroundColor: 'red'
  }
}));



export function TestGraph(props) {
  // const classes = useStyles();
  //
  // // const toggle = useStoreActions(actions => actions.panels.toggle)
  //
  // const nodeTypes = {
  //   sourceNode: SourceNode,
  //   listNode: BaseListNode,
  //   mathNode: MathNode,
  //   // basicNode: BasicNode
  // };
  // // const addToRackMode = useStoreState(state=>state.global.nodeView.addToRackMode)
  // // const testElements = useStoreState(state=>state.global.nodes.activeNodes)
  // const [elements, setElements] = useState(testElements);
  // // const onElementsRemove = (elementsToRemove) =>setElements((els) => removeElements(elementsToRemove, els));
  //
  // // const onConnect = (params) => setElements((els) => addEdge(params, els));
  // // onConnect = (params) => setElements((els)=)
  // const onConnect = (params) => {console.log(params)}
  //
  // // const setActiveNode = useStoreActions(actions=>actions.global.setActiveNode)

  // const setActiveNode = useStoreActions(actions=>actions.global.setActiveNode)
  // const duplicateNode = useStoreActions(actions=>actions.global.duplicateNode)
  // const deleteActiveNode = useStoreActions(actions=>actions.global.deleteActiveNode)
  // const addToSelection = useStoreActions(actions=>actions.global.addToSelection)
  // const addRackNode = useStoreActions(actions=>actions.global.nodes.addRackNode)
  //
  // const onRemove = (toRemove) =>{
  //   console.log('to remove elements are: ', toRemove);
  //   deleteActiveNode(toRemove)
  // }
  //
  // const testDelete = () =>{
  //   console.log('fired delete');
  //   deleteActiveNode()
  // }
  // // useHotkeys('delete', ()=> testDelete())
  // const [clickedNode, setClickedNode] = useState({})
  //
  // const onDragStart = (e, node) =>{
  //   console.log('drag started');
  //   console.log('drag start event is: ', e);
  //   console.log('target is: ', e.target);
  //   console.log('alt is: ', e.altKey);
  //   console.log('shfit is: ', e.shiftKey);
  //   // console.log('target id is: ', e.id);
  //   console.log('node info is: ', node);
  //   // setActiveNode(node)
  //   if (e.altKey) {
  //       duplicateNode(node);
  //   }
  //   if (e.shitKey) {
  //     addToSelection(node)
  //   }
  // }
  //
  // const handleClick = (e, node) => {
  //   console.log('event is: ', e);
  //     console.log('clicked node is: ', node);
  //     console.log('node click event: ', e);
  //     console.log('node click shift key: ', e.shiftKey);
  //     if (addToRackMode) {
  //       console.log('adding node to rack: ', node);
  //       addRackNode(node)
  //     }
  //     // setActiveNode({event: e, node: node})
  // }
  //
  // const handleSelectionDrag = (e, nodes) =>{
  //   console.log('selection drag event: ', e);
  //   console.log('nodes are: ', nodes);
  // }
  //
  // const test = (e) =>{
  //   console.log(e);
  // };
  // const onConnectStart = (e, info) =>{
  //   console.log('on connect start event is: ', e);
  //   console.log('on connect start info is: ', info);
  // }
  //
  // useEffect(()=>{
  //   console.log(props.activeNodes);
  //   // const flowState = useFlowState(state=>state.nodes)
  //   // console.log('flow state is: ', flowState);
  // })
  //
  // const [elements, setElements] = useState(initialElements);
  // const onElementsRemove = (elementsToRemove) =>
  // setElements((els) => removeElements(elementsToRemove, els));
  // const onConnect = (params) => setElements((els) => addEdge(params, els));
  //
  // // useEffect(()=>{
  // //   // setElements(initialElements)
  // //   console.log('elements are: ', elements);
  // // })
  // return (
  //   <div style={{ height: '100%', width: '100%'}}>
  //       <ReactFlow
  //         elements = {testElements}
  //         onElementsRemove={onRemove}
  //         onConnect={onConnect}
  //         minZoom = {1}
  //         maxZoom = {1}
  //         deleteKeyCode={46} /* 'delete'-key */
  //         nodeTypes = {nodeTypes}
  //         onNodeDragStart = {onDragStart}
  //         onSelectionChange = {handleSelectionDrag}
  //         onConnectStart = {onConnectStart}
  //       >
  //       {props.debugger}
  //       <Background
  //         variant="dots"
  //         gap={20}
  //         size={1}
  //       />
  //       </ReactFlow>
  //   </div>
  // );
}

export default compose(withReactFlowStore)(TestGraph)
