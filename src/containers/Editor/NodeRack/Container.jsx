import React from 'react'
import { makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useState, useEffect } from 'react'
import RackNode from './RackNode';
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useHotkeys  } from 'react-hotkeys-hook'


const useStyles = makeStyles((theme: Theme)=>({
    nodeContainer: {
      width: 5000,
      height: '95%',
      display: 'flex',
      backgroundColor: 'grey'
    }
}));


export function ActiveButton(props){
  // const [rackNodes, setRackNodes] = useState(useStoreState(state=>state.global.nodes.rackNodes))
  const rackNodes = useStoreState(state=>state.global.nodes.rackNodes)
  const deselectRackNodes = useStoreActions(actions=>actions.global.nodes.deselectRackNodes)
  // const deleteRackNodes = useStoreActions(actions=>actions.global.nodes.deleteRackNodes)
  // const testDelete= () =>{
  //   deleteRackNodes()
  // }
  // useHotkeys('shift + backspace', ()=> testDelete())
  useEffect(()=>{
    console.log('rack nodes at container are', rackNodes);
  })
  const classes = useStyles();
  return(
      <div className = {classes.nodeContainer} onClick = {deselectRackNodes}>
        {
          rackNodes.map((node, index) =>(
            <RackNode key = {index} {...node}/>
          ))
        }
      </div>

  )
}

export default ActiveButton
