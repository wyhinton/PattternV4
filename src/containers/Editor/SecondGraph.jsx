import React, { useState, useEffect, useRef } from 'react';
import SourceNode from './CustomNodes/SourceNode'
import BasicNode from './CustomNodes/BaseNode'
import MathNode from './CustomNodes/MathNode'
import ViewNode from './CustomNodes/ViewNode';
import OutputNode from './CustomNodes/OutputNode';
import BaseListNode from './CustomNodes/ListNodes/BaseListNode';
// import FunctionTree from 'function-tree'
import RecursiveIterator from 'recursive-iterator';
import ReactFlow,  {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useStoreState,
  ReactFlowProvider,
  useStoreActions,
  getOutgoers,
  isNode
} from 'react-flow-renderer';
import NodeMenuPopUp from './PopUpMenu/NodeMenuPopUp';
import Editor from './Editor';
import { useHotkeys } from 'react-hotkeys-hook'
import GraphProcessing from './GraphProcessing';
import toposort from 'toposort';
// import dag from 'breeze-dag'
import dag from './Util/dag/dag.js'
import branch from 'branch-pipe'

// import {walk} from 'tree-walk';
// import crawl from 'tree-crawl'
import traverse from 'traverse';

import _ from 'lodash'

const findByHandle = (clickId, nodes) =>{
  console.log('nodes at find by handle: ', nodes);
  const idsArr = clickId.split('__')
  const nodeId = idsArr[0]
  const handleId = idsArr[1]
  let foundNode = nodes.filter(node=>node.id === nodeId)[0]
  console.log('found node at find by handle: ', foundNode);
  console.log('handle id: ', handleId);
  console.log('node data: ', foundNode.data);
  console.log('node data: ', foundNode.data[handleId]);
  const handleValue = foundNode.data[handleId]
  const handleData = {node: foundNode, handleId: handleId, value: handleValue}
  console.log(handleData);
  return handleData
}
// import initialElements from './initial-elements';
// const onLoad = (reactFlowInstance) => {
//   console.log('flow loaded:', reactFlowInstance);
//   reactFlowInstance.fitView();
// };
const OverviewFlow = (props) => {


  const add = (a,b) =>{
    if (a && b) {
      console.log(`executing add function` );
      let val = Number(a) + Number(b)
      console.log(val);
      return val
    }
    if (!a) {
      console.log('a undefined');
    }
    if (!a) {
      console.log('b undefined');
    }
  }

  const viewFunc = (obj) =>{
    return JSON.stringify(obj)
  }


  const initial = [
     {
       id: '3',
       type: 'mathNode',
       position: {
         x: 225,
         y: 400
       },
       func: add,
       input1Connected: true,
       data: {
         className: 'baseClass',
         inRackView: false,
         inDebug: false,
         inRack: false,
         inputs: {
            input1: 2,
            input2: 2,
         },
         outputs: {
           output1: {
             arg: 1
           }
         },
       }
     },
     {
       id: '4',
       type: 'mathNode',
       position: {
         x: 384,
         y: 400
       },
       func: add,
       data: {
         className: 'baseClass',
         inRackView: false,
         inDebug: false,
         inRack: false,
         inputs: {
            input1: 1,
            input2: 1,
         },
         outputs: {
           output1: {
             arg: 1
           }
         },
       }
     },
     {
       id: '5',
       type: 'mathNode',
       position: {
         x: 545,
         y: 400
       },
       func: add,
       data: {
         className: 'baseClass',
         inRackView: false,
         inDebug: false,
         input1Connected: true,
         inRack: false,
         inputs: {
            input1: 1,
            input2: 1,
         },
         outputs: {
           output1: {
             arg: 1
           }
         },
       }
     },
     {
       id: '6',
       type: 'viewNode',
       position: {
         x: 300,
         y: 500
       },
       func: viewFunc,
       input1Connected: true,
       data: {
         className: 'baseClass',
         inRackView: false,
        inDebug: false,

         inRack: false,
         inputs: {
           input1: {
             arg: 0
           }
         },
         outputs: {
           output1: {
            arg: 0
           }
         },
       }
     },
     {
       id: '7',
       type: 'mathNode',
       position: {
         x: 720,
         y: 400
       },
       func: add,
       input1Connected: true,
       data: {
         className: 'baseClass',
         inRackView: false,
         inDebug: false, input1Connected: true,
         inRack: false,
         inputs: {
            input1: 1,
            input2: 1,
         },
         outputs: {
           output1: 0
         },
       }
     },
     {
       id: '8',
       type: 'mathNode',
       position: {
         x: 555,
         y: 190
       },
       func: add,
       input1Connected: true,
       data: {
         className: 'baseClass',
         inRackView: false,
         inDebug: false,
         inRack: false,
         inputs: {
            input1: 1,
            input2: 1,
         },
         outputs: {
           output1: 0
         },
       }
     },
     {
       id: '9',
       type: 'mathNode',
       input1Connected: true,
       position: {
         x: 780,
         y: 235,
       },
       func: add,
       input1Connected: true,
       data: {
         className: 'baseClass',
         inRackView: false,
         inDebug: false,
         input1Connected: true,
         inRack: false,
         inputs: {
            input1: 1,
            input2: 1,
         },
         outputs: {
           output1: 0
         },
       }
     },
     {
       id: '10',
       type: 'outputNode',
       position: {
         x: 850,
         y: 235,
       },
       func: viewFunc,
       input1Connected: true,
       data: {
         className: 'baseClass',
         inRackView: false,
         inDebug: false,
         input1Connected: true,
         inRack: false,
         inputs: {
            input1: 1,
         },
       }
     },
     {
       id: '11',
       type: 'outputNode',
       position: {
         x: 400,
         y: 300,
       },
       func: viewFunc,
       input1Connected: true,
       data: {
         className: 'baseClass',
         inRackView: false,
         inDebug: false,
         input1Connected: true,
         inRack: false,
         inputs: {
            input1: 1,
         },
       }
     },
     {
       id: '12',
       type: 'outputNode',
       position: {
         x: 500,
         y: 235,
       },
       func: viewFunc,
       input1Connected: true,
       data: {
         className: 'baseClass',
         inRackView: false,
         inDebug: false,
         input1Connected: true,
         inRack: false,
         inputs: {
            input1: 1,
         },
       }
     },
    {
      id: "reactflow__edge-3__output1-4__input1",
      source: "3__output1",
      target: "4__input1",
    },
    {
      id: "reactflow__edge-3__output1-6__a",
      source: "3__output1",
      target: "6__a",
    },
    {
      id: "reactflow__edge-4__output1-5__input1",
      source: "4__output1",
      target: "5__input1",
    },
    {
      id: "reactflow__edge-5__output1-7__input1",
      source: "5__output1",
      target: "7__input1",
    },
    {
      id: "reactflow__edge-4__output1-8__input1",
      source: "4__output1",
      target: "8__input1",
      type: "default",
    },
    {
      id: "reactflow__edge-5__output1-9__input1",
      source: "5__output1",
      target: "9__input1",
      type: "default",
    },
  ]

  const [elements, setElements] = useState(initial);
  const [position, setPosition] = useState([0,0])
  const [mousePosition, setMousePosition] = useState([0,0])
  const [shouldStore, setShouldStore] = useState(false)
  const [menuActive, setMenuActive] = useState(false)
  const [loaded, setLoaded] = useState(false)
  // const nodes = useStoreState(state=>state.nodes)
  const editorContainer = useRef(null)

  const openPopUp = () =>{
    console.log('fired open pop up with shift+a ');
    setMenuActive(true)
    setShouldStore(true)
    console.log('should store is: ', shouldStore);
  }
  useHotkeys('shift+a', ()=> openPopUp())

  const addNewNode = (nodeType, position) =>{
    const copy = elements
    const newNode =
    {
       id: '10',
       type: 'listNode',
       position: {
         x: 400,
         y: 400
       },
       data: {
         className: 'baseClass',
         inRackView: false, inDebug: false, input1Connected: true,
         inRack: false,
       }
     }
   copy.push(newNode)
   console.log('new nodes are: ', copy);
   setElements(copy)
 }
  const handleRemove = (elementsToRemove, els) =>{
    console.log(elementsToRemove, els);
    // if (el) {
    //
    // }
    removeElements(elementsToRemove, els)
  }

  const handleEdgeRemove = (edge) =>{
    console.log('edge');
  }
  // const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));
  const onElementsRemove = (elementsToRemove) => setElements((els) => handleRemove(elementsToRemove, els));
  const onConnect = (params) =>{
      const connectSource =  findByHandle(params.source, elements)
      const connectTarget = findByHandle(params.target, elements)
      console.log('connectSource is: ', connectSource, 'connectTarget is: ', connectTarget);
      connectTarget.node.data.inputs[connectTarget.handleId] = connectSource.handleId
      updateNode(connectTarget.node, elements)
      setElements((els) => addEdge(params, els));
      console.log('source node is: ', connectSource.node, 'target node is: ', connectTarget.node);
  }

  const updateNode = (node, els) =>{
    if (!els) {
      console.log('no elements provided');
      els = elements
    }
    const copy =[...els]
    const filtered = copy.filter(el=>el.id !== node.id)
    filtered.push(node)
    setElements(filtered)
    console.log('elements at update node: ', elements);
  }

  const onHover = (e) =>{
    // console.log([e.pageX, e.pageY]);
    setMousePosition([e.pageX, e.pageY])
  }

  const testSet = (els) =>{
    setElements(els)
  }

  const onLoad = (reactFlowInstance) => {
    console.log('flow loaded:', reactFlowInstance);
    reactFlowInstance.fitView();
    let newEls = []
    let edges = elements.filter(el=> !el.data)
    let nodes = elements.filter(el=> el.data)
    console.log('edges', edges);
    console.log('nodes', nodes);
    for (var i = 0; i < nodes.length; i++) {
      let curEl = nodes[i]
      console.log(curEl);
      curEl.data.setter = (els) =>{setElements(els)}
      // curEl.data.test = [...elements]
      // curEl.data.test = elements.slice()
      // curEl.data.test = [...elements]
      console.log(curEl);
      newEls.push(curEl)

    }
    setLoaded(true)
    // console.log([...newEls, ...edges]);
    setElements([...newEls, ...edges], )

  };

  useEffect(()=>{

    // document.addEventListener('mousemove', onHover)
    // return () => document.removeEventListener("mousemove", onHover);
  })
  var x = 0
  useEffect(()=>{
    console.log('loaded is: ', loaded);
      if (loaded) {
      // if (x > 0) {
        console.log('node view changed');
        console.log(props.nodeView);
        let copy = [...elements]
        let nodes = copy.filter(c=>c.data)
        let edges = copy.filter(e=>!e.data)
        let keys = Object.keys(props.nodeView)

        nodes.forEach((n, i) =>{
          keys.forEach((k, i) => {
            n.data[k] = props.nodeView[k]
          });
        });
        console.log('updated node view nodes');
        setElements([...nodes, ...edges])

      }
   // x = x + 1
  }, [props.nodeView])


  const handleClick = (e) => {
    let currentTargetRect = e.currentTarget.getBoundingClientRect();
    const event_offsetX = e.pageX - currentTargetRect.left, event_offsetY = e.pageY - currentTargetRect.top;
    console.log(event_offsetX, 'offset x is');
    setPosition([event_offsetX, event_offsetY])
  }

  useEffect(()=>{
    console.log('should store changed!');
    setPosition(mousePosition)
    console.log('set position is ', setPosition);
    setShouldStore(false)
  }, [shouldStore])
  //onElementsChange
  useEffect(()=>{
    console.log('elements changed');
  }, [elements])

  const onElementClick = (e, node)=>{
      console.log(elements);
      console.log('clicked elemnt!');
      if (node.data) {

        if (props.addToRackMode) {
          console.log('clicked it in add to rack mode');
          props.addRackNode(node)
        }
        if (menuActive) {
          console.log('setting menu active false ');
          setMenuActive(false)
        }

        console.log('elements are:', elements);
        console.log('node is', node);
        let edges = elements.filter(el=>!el.data)
        console.log('edge elems are: ', edges);
        let edgeArr = edges.map(e=>[e.source.split('__')[0], e.target.split('__')[0]])
        let nodes = elements.filter(el=>el.data)
        let testValTree = nodes.reduce((a,b)=>(a[b.id]='test',a),{})
        console.log(testValTree);


        dag(edgeArr, 2, function (e, next) {
          console.log(e);

          let toExec = nodes.filter(n=>n.id === e)[0]
          console.log(toExec);
          console.log(Object.values(toExec.data.inputs));
          let funcInputs = Object.values(toExec.data.inputs)
          let val = toExec.func(...funcInputs)
          if (!Array.isArray(val)) {
            val = [val]
          }
          let newOutputs = val.reduce(function(acc, cur, i) {
            acc[i] = cur;
            return acc;
          }, {});
          toExec.data.outputs = newOutputs
          updateNode(toExec, elements)
          console.log(newOutputs);
          // var result = Object.keys(obj).map((key) => [Number(key), obj[key]]);
          // toExec.data.output1 =
          console.log(val);
          let children = getChildren(toExec, elements)
          console.log(`children of node ${toExec.id}`, children);
          if (children.length > 0) {
            console.log('node has children');
            children.forEach((c, i) => {
              c.data.inputs.input1 = val
              console.log('new child is: ', c);
              updateNode(c, elements)
            });
          }

          // toExec.output =
          // toExect
          console.log('dag node id is: ', e, 'node to exec is: ', toExec);
          //if branch then new pipe
          // setTimeout(function () {
          //   next(); // or next(err);
          // }, 1000);
          next()
        }, function (err) {
          // our done callback
          // should.not.exist(err);
          console.log('got an error!');
        });

        console.log('edges are: ', edgeArr);
        // const tree = makeTree(elements)
        // console.log('updated nodes', tree);
        // updateTree(tree)

    }

  }

  const updateTree = (toUpdate) =>{
    const toUpdateIds = toUpdate.map(el=>el.id)
    let copy = [...elements]
    let toReplace = copy.filter(el=>toUpdateIds.includes(el.id))
    let other = copy.filter(el=>!toUpdateIds.includes(el.id))
    toReplace.forEach((item, i) => {
      item.data.inputs = toUpdate[i].inputs
      console.log(toUpdate[i].outputs);
      item.data.outputs = toUpdate[i].outputs
    });
    console.log([...toReplace, ...other]);
    setElements([...toReplace, ...other])

    console.log('to Replace', toReplace);
    console.log('toUpdate', toUpdate);
  }

  const replaceProperties = (dest, src)=>{
    // for (var i in dest)
    //    delete dest[i];
    // for (var i in src)
    //    dest[i] = src[i];
  }

  const getChildren = (node, els) =>{
    const edges = els.filter(e=>e.data == undefined)
    const nodes = els.filter(n=>n.data !== undefined)
    const nodeIds = nodes.map(n=>n.id)
    console.log(nodeIds);
    const hasNodeAsSourceEdge = edges.filter(e=>e.source.split('__').includes(node.id))
    console.log(hasNodeAsSourceEdge);
    const targetsForEdges = hasNodeAsSourceEdge.map(e=>e.target.split('__')[0])
    console.log(targetsForEdges);
    const children = els.filter(el=>targetsForEdges.includes(el.id))
    console.log(children);
    return children
  }

  const getParents = (node, els) =>{
    const edges = els.filter(e=>e.data == undefined)
    const nodes = els.filter(n=>n.data !== undefined)
    const nodeIds = nodes.map(n=>n.id)
    // console.log(nodeIds);
    const hasNodeAsTargetEdge = edges.filter(e=>e.target.split('__').includes(node.id))
    // console.log(hasNodeAsTargetEdge);
    const sourcesForEdges = hasNodeAsTargetEdge.map(e=>e.source.split('__')[0])
    // console.log(sourcesForEdges);
    const parents = els.filter(el=>sourcesForEdges.includes(el.id))
    // console.log(parents);
    return parents
  }

  const makeTree = (els) =>{
    console.log(els);
    const edges = els.filter(e=>e.data == undefined)
    const nodes = els.filter(n=>n.data !== undefined)
    const hasConnection = [...selectConnected(els), ...edges]
    console.log(hasConnection);
    const roots = getRoots(hasConnection)
    console.log(roots);
    const tree = makeObject(roots, hasConnection, nodes, edges)
    console.log('tree at makeTree: ', tree);
    return tree
  }

  const unflattenStructure = (els) =>{
    let test = []
    console.log(els);
    const nodes = els.filter(el=>el.data)
    console.log(nodes);
    nodes.forEach((item, i) => {
      let newItem = {}
      newItem.id = item.id
      let chil = getChildren(item, els)
      const parents = getParents(item, els)
      if (parents.length > 0) {
        newItem.parentid = parents[0].id
      } else {
        newItem.parentid = 0
      }
      console.log(item);
      newItem.inputs = item.data.inputs
      newItem.outputs = item.data.outputs
      newItem.func = item.func
      test.push(newItem)
    });
    console.log(test);
    const sorted = unflatten(test)
    return sorted
  }

  const makeObject = (treeRoots, els, nodes, edges) =>{
    let test = unflattenStructure(els)
    const sorted = unflatten(test)
    console.log('sorted: ', sorted);
    // var leaves = traverse(sorted).reduce(function (acc, x) {
    //     if (this.isLeaf) acc.push(x);
    //     return acc;
    //   }, []);
    // console.log(leaves);
    let funcs = []
    const inputsArr = []
    let outPutsArr = []
    let idArr = []
    var newTest = traverse(sorted).forEach(function (acc, x) {
        if (this.key === 'inputs'){
          let inputs = acc
          console.log('inputs are: ', inputs);
          inputsArr.push(acc)
        }
        if (this.key === 'id'){
          let id = acc
          idArr.push(id)
          console.log('id is:', id);
        }
        if (this.key === 'outputs'){
          let outputs = acc
          outPutsArr.push(outputs)
          console.log('outputs are:', outputs);
        }
        if (this.key === 'func'){
          let func = acc
          console.log('func is: ', func);
          funcs.push(func)
        }
      return acc
      }, []);
      let valueArrs = [funcs, inputsArr, outPutsArr, idArr]

      let seqNodes = []
      for (var i = 0; i < funcs.length; i++) {
        let testObj = {}
        testObj.func = funcs[i]
        testObj.inputs = inputsArr[i]
        testObj.outputs = outPutsArr[i]
        testObj.id = idArr[i]
        seqNodes.push(testObj)
      }
      console.log(seqNodes);

      funcs = funcs.filter(f=>typeof f !== 'undefined')
      console.log('filtered funcs are: ', funcs);
      console.log('inputs are:', inputsArr);
      let finalNodes = []
      const functionPipe = (steps) => function(args) {
        console.log(steps);
        let inputs = args.map(arg=>arg.inputs)
        let value = steps[0].apply(this, inputs);
        let firstElem = {}
        firstElem.inputs = args[0].inputs
        firstElem.id = args[0].id
        finalNodes.push(firstElem)
        console.log(value);

        for (let i = 1; i < steps.length; ++i) {
          console.log(args[i].id);
          let testUpdated = {}
          testUpdated.id = args[i].id
          testUpdated.inputs = value
          console.log(args[i]);
          // value.inputs.input2 = args[i].inputs.input2
          console.log('pipe value:', value);
          finalNodes.push(testUpdated)
          // finalNodes[i-1].outputs ={} = value.input1
          finalNodes[i-1].outputs = {}
          finalNodes[i-1].outputs.output1 = value.input1
          value = steps[i].call(this, value);
          console.log(value);

        }
        console.log(finalNodes, 'finalNodes');
        return value;
      };

      const finalValue = functionPipe(funcs)(seqNodes)


      console.log('finalChainValueis', finalValue);


    return finalNodes

  }

  const unflatten = function( array, parent, tree ){
      tree = typeof tree !== 'undefined' ? tree : [];
      parent = typeof parent !== 'undefined' ? parent : { id: 0 };

      var children = _.filter( array, function(child){ return child.parentid == parent.id; });

      if( !_.isEmpty( children )  ){
          if( parent.id == 0 ){
             tree = children;
          }else{
             parent['children'] = children
          }
          _.each( children, function( child ){ unflatten( array, child ) } );
      }

      return tree;
  }

  const getRoots = (els) =>{
    let roots = []
    els.forEach((item, i) => {
      console.log(item);
      console.log(getChildren(item, els));
      console.log(getParents(item, els));
      const children = getChildren(item, els)
      const parents = getParents(item, els)
      if (children.length > 0 && parents.length < 1) {
        roots.push(item)
      }
    });

    console.log(roots);
    return roots
  }

  const selectConnected = (els) =>{
    const edges = els.filter(e=>e.data == undefined)
    const nodes = els.filter(n=>n.data !== undefined)
    let edgeIds = edges.map((edge, i) => {
      let arr = []
      const sId = edge.source.split('__')[0]
      const tId = edge.target.split('__')[0]
      arr.push(sId)
      arr.push(tId)
      return arr
    });
    const finalEdgeIds = []
    // edgeIds = edgeIds.map(a=>[...a])
    for (var i = 0; i < edgeIds.length; i++) {
      let curAr = edgeIds[i]
      for (var j = 0; j < curAr.length; j++) {
        let ar = curAr[j]
        finalEdgeIds.push(ar)
      }
    }
    console.log(finalEdgeIds);
    const connected = els.filter(el=>finalEdgeIds.includes(el.id))
    return connected
  }

  const onConnectStart = (event, { nodeId, handleType }) => console.log('on connect start', { nodeId, handleType });

  const nodeTypes = {
      sourceNode: SourceNode,
      listNode: BaseListNode,
      mathNode: MathNode,
      viewNode: ViewNode,
      outputNode: OutputNode,
    };

    const onNodeDragStop = (event, node) => console.log('drag stop', node);
    const onNodeDragStart = (event, node) => console.log('drag stop', node);

  // const NodesDebugger = () => {
    // const nodes = useStoreState(state => state.nodes);
    // const edges = useStoreState(state=>state.edges)

    // return null;
  // }




  return (
    <ReactFlowProvider>

        <Editor {...props}/>
        <NodeMenuPopUp position = {position} menuActive = {menuActive} addNewNode = {addNewNode} mousePosition = {mousePosition}/>
        <ReactFlow
          elements={elements}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          nodeTypes = {nodeTypes}
          onLoad={onLoad}
          onElementClick = {onElementClick}
          snapToGrid={true}
          onNodeDragStop = {onNodeDragStop}
          onNodeDragStart = {onNodeDragStart}
          onConnectStart = {onConnectStart}
          snapGrid={[15, 15]}
          >

          <MiniMap
            nodeStrokeColor={(n) => {
              if (n.style?.background) return n.style.background;
              if (n.type === 'input') return '#0041d0';
              if (n.type === 'output') return '#ff0072';
              if (n.type === 'default') return '#1a192b';
              return '#eee';
            }}
            nodeColor={(n) => {
              if (n.style?.background) return n.style.background;
              return '#fff';
            }}
            nodeBorderRadius={2}
          />
          <div ref = {editorContainer} onClick = {()=>{handleClick()}}>
          </div>
        <GraphProcessing setElements = {setElements} elements = {elements}/>
        {/*<NodesDebugger/>*/}
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
    </ReactFlowProvider>
  );
};

export default OverviewFlow;
