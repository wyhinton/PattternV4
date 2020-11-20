import React, { useState, useEffect } from 'react'
import { useHotkeys  } from 'react-hotkeys-hook'
// import { useStoreState } from 'react-flow-renderer'
import { useStore, useStoreState, useStoreActions } from 'easy-peasy'

const withActions = ComposedComponent => {

  return function (props){

    const addToRackMode = useStoreState(state=>state.global.nodeView.addToRackMode)


    const setActiveNode = useStoreActions(actions=>actions.global.setActiveNode)
    const duplicateNode = useStoreActions(actions=>actions.global.duplicateNode)
    const deleteActiveNode = useStoreActions(actions=>actions.global.deleteActiveNode)
    const addToSelection = useStoreActions(actions=>actions.global.addToSelection)
    const addRackNode = useStoreActions(actions=>actions.global.nodes.addRackNode)

      return <ComposedComponent {...props}
        debugger = {<NodesDebugger/>}
        setActiveNode = {setActiveNode}
        duplicateNode = {duplicateNode}
        deleteActiveNode = {deleteActiveNode}
        addToSelection = {addToSelection}
        addRackNode = {addRackNode}
      />

  };
};

export default withActions

// debugger = {<NodesDebugger/>}
// setActiveNode = {setActiveNode}
// duplicateNode = {duplicateNode}
// deleteActiveNode = {deleteActiveNode}
// addToSelection = {addToSelection}
// addRackNode = {addRackNode}
