import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import PopUpList from './PopUpList';
import { useStoreActions, useStoreState } from 'react-flow-renderer'
import { useHotkeys } from 'react-hotkeys-hook'
// import RotatingGradient from '../Shaders/RotatingGradient'

const useStyles = makeStyles((theme) => ({
  popUpMenuContainer: {
    backgroundColor: 'lightgrey',
    position: "absolute",
    width: 200,
    height: 'fit-content',
    display: 'none',
    zIndex: 1000,
    borderRadius: 5,
    border: '1px solid black',
    boxShadow: '0px 0px 9px #a2a2a2'
  },
  header: {
    borderBottom: '1px solid black',
    textAlign: 'center',
    backgroundColor: 'grey',
    color: 'white'
  }
}));

export default function NodeMenuPopUp({position, menuActive, addNewNode}) {
  const classes = useStyles();
  const [visible, setVisible] = useState(menuActive)
  // const setElements = useStoreActions(actions=>actions.setElements)
  // const nodes = useStoreState(state=>state.nodes)

  const handleAddNode = (position, nodetype)=>{
    setVisible(false)
    console.log('visible at nodemenupopup is: ', visible);
    console.log('should add a new node of type: ', nodetype);
  }
  // useHotkeys('ctrl+m', ()=> setVisible(true))

  useEffect(()=>{
    console.log('visible is : ', visible);
    console.log('menu active is: ', menuActive);
    setVisible(menuActive)
    console.log('position is: ', position);
  }, [menuActive])

  return (
    <div className = {classes.popUpMenuContainer} style = {
      {
        left: position[0],
        top: position[1],
        display: visible ? 'block' : 'none'
      }
    }>
    <div className = {classes.header}>ADD NODE
    </div>
      <PopUpList
         addNewNode = {addNewNode}
         position = {position}
         closeMenu = {handleAddNode}
       />
    </div>
  );
}
