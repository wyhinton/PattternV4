import React, { useEffect } from 'react';
import { useStoreState, ReactFlowProvider, useStoreActions } from 'react-flow-renderer';

const GraphProcessing = ({elements, setElements, mousePosition}) => {
  const nodes = useStoreState(state => state.nodes);
  const edges = useStoreState(state=>state.edges)

  // const findByHandle = (clickId, nodes) =>{
  //   console.log('nodes at find by handle: ', nodes);
  //   const idsArr = clickId.split('__')
  //   const nodeId = idsArr[0]
  //   const handleId = idsArr[1]
  //   let foundNode = nodes.filter(node=>node.id === nodeId)[0]
  //   console.log('handle id is: ', );
  //   console.log('found node at find by handle: ', foundNode);
  //   console.log('handle id ');
  //   console.log('node data: ', foundNode.data);
  //   console.log('node data: ', foundNode.data[handleId]);
  //   const handleValue = foundNode.data[handleId]
  //   const handleData = {node: foundNode, hanldeId: handleId, value: handleValue}
  //   return handleData
  // }
  // const updateChild = (child, prop, value) =>{
  //   console.log('child is:', child, 'prop is:', prop, 'value is:', value);
  //   const copy = [...elements]
  //   child.data[prop] = value
  //   copy[child.id] = child
  //   setElements(copy)
  // }
  //
  // useEffect(()=>{
  //   console.log('nodesa are: ', nodes);
  //   console.log('edges are: ', edges);
  //   edges.forEach((edge, i) => {
  //     const sourceNode = findByHandle(edge.source, nodes)
  //     const targetNode = findByHandle(edge.target, nodes)
  //     console.log('source is: ', sourceNode);
  //     console.log('taget is: ', targetNode);
  //     updateChild(targetNode.node, targetNode.handleId, targetNode.value)
  //     });
  // }, [nodes])
  // }, [mousePosition])
  return (
    null
  )
}

export default GraphProcessing
