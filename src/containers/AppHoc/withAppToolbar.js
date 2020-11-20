import React, { useState, useEffect } from 'react'
import { useHotkeys  } from 'react-hotkeys-hook'
import { useStoreActions, useStoreState } from 'easy-peasy'

const withAppToolbar = ComposedComponent => {

  return function (props){
      // const [active, setActive] = useState(true)
      // const [view, setView] = useState('node')
      const [modalActive, setModalActive] = useState(false)
    	const setViewMode = useStoreActions(actions => actions.global.setViewMode)
    	const setBackgroundVisibility = useStoreActions(actions => actions.global.nodeView.setBackgroundVisibility)
    	const setSeeThroughView = useStoreActions(actions => actions.global.nodeView.setSeeThroughView)
      const seeThrough = useStoreState(state=>state.global.nodeView.seeThrough)

      const setAddToRackMode = useStoreActions(actions => actions.global.setAddToRackMode)
      const addToRackMode = useStoreState(state=>state.global.nodeView.addToRackMode)

      const setNodeViewProp = useStoreActions(actions => actions.global.nodeView.setNodeViewProp)
      const nodeViewOptions = useStoreState(state => state.global.nodeViewOptions)

      const setShowRack = useStoreActions(actions => actions.global.setShowRack)
      const showRack = useStoreState(state=>state.global.showRack)
      const setNodeTree = useStoreActions(actions=>actions.global.setNodeTree)
      const backgroundVisible = useStoreState(state=>state.global.nodeView.backgroundVisible)

      const viewMode = useStoreState(state=>state.global.viewMode)
      const nodeView = useStoreState(state=>state.global.nodeView)
      // const setAddToRackMode = useStoreActions(actions => actions.global.)
      useEffect(()=>{
        console.log('bg vis at withapptoolbar is: ', backgroundVisible);
        console.log(nodeViewOptions);
      })
      const deleteRackNodes = useStoreActions(actions=>actions.global.nodes.deleteRackNodes)
      useHotkeys('shift + backspace', ()=> deleteRackNodes())
      useHotkeys('shift + c', ()=> setViewMode('node'))
      useHotkeys('shift + d', ()=> setViewMode('canvas'))
      useHotkeys('shift + s', ()=> setViewMode('shortcuts'))
      useHotkeys('command + space', ()=>setShowRack())
      const setNodeView = () => {
        if (viewMode !== 'node') {
          // setView('node')
          setViewMode('node')
        }
      }

      const setCanvasView = () =>{
        if (viewMode !== 'canvas') {
          // setView('canvas')
          setViewMode('canvas')
        }
      }

      // const setSeeThroughView = () =>{
      //   // setView('seeThrough')
      //   setViewMode('seeThrough')
      // }

      const setSettingsView = () => {
        setViewMode('settings')
        setModalActive(true)
      }

      const setExportView = () => {
        // setView('export')
        setViewMode('export')
        setModalActive(true)
      }

      // const setExportView = () => {
      //   // setView('export')
      //   setViewMode('export')
      //   setModalActive(true)
      // }


      const setMappingView = () => {
        // setView('mapping')
        setViewMode('mapping')
      }

      const setIntroView = () => {
        // setView('intro')
        setViewMode('intro')
        setModalActive(true)
      }
      const setExplanationView = () => {
        // setView('explanation')
        setViewMode('explanation')
      }
      const setFeedbackView = () => {
        // setView('feedback')
        setViewMode('feedback')
        setModalActive(true)
      }
      const setShortcutView = () => {
        // setView('shortcuts')
        setViewMode('shortcuts')
        setModalActive(true)
      }

      const closeModal = () => {
        setModalActive(false)
      }
      const test = () =>{
        setBackgroundVisibility()
      }

      // const setDebugNodeView = () =>{
      //   setNodeViewOptions('debug')
      // }


    const testNVO = (val) =>{
      // setNodeViewOptions(val)
      setNodeViewProp(val)
    }

      return <ComposedComponent {...props}
        viewMode = {viewMode}
        modalActive = {modalActive}
        seeThrough = {seeThrough}
        closeModal = {closeModal}
        setNodeView = {setNodeView}
        setCanvasView = {setCanvasView}
        setSeeThroughView = {setSeeThroughView}
        setSettingsView = {setSettingsView}
        setExportView = {setExportView}
        setMappingView = {setMappingView}
        setIntroView = {setIntroView}
        setExplanationView = {setExplanationView}
        setFeedbackView = {setFeedbackView}
        setBackgroundVisibility = {setBackgroundVisibility}
        backgroundVisible = {backgroundVisible}
        setShortcutView = {setShortcutView}
        setAddToRackMode = {setAddToRackMode}
        addToRackMode = {addToRackMode}
        setNodeTree = {setNodeTree}
        nodeViewOptions = {nodeViewOptions}
        setNodeViewProp = {setNodeViewProp}
        nodeView = {nodeView}
      />

  };
};

export default withAppToolbar
