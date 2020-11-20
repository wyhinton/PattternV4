import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { useStore, useStoreState, useStoreActions } from 'easy-peasy'
import FlyOut from './FlyOut';
import {nodeMenu} from '../../StaticData/NodeMenu';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'lightgrey',
  },
  listItem:{
    borderBottom: '1px solid black',
    paddingTop: 0,
    paddingBottom: 0,
    '&:hover':{
      backgroundColor: 'grey'
    }
  },
  list: {
    padding: 0
  }
}));

const showFlyout = () => {
  // console.log('show the flyout');
}
export function PopUpList(props) {

  const classes = useStyles();
  const addNode = useStoreActions(actions => actions.global.nodes.addNode)
  const [flyoutActive, setFlyoutActive] = useState(false)
  const [flyoutData, setFlyoutData] = useState(nodeMenu['modifiers'])
  const [percentage, setPercentage] = useState(0)

  const handleHover = (category, percent) =>{
    console.log('hovered category is: ', category);
    setFlyoutActive(true)
    console.log('setting flyout data to: ', nodeMenu[category]);
    setFlyoutData(nodeMenu[category])
    setPercentage(percent)
  }
  const handleAdd = (nodeInfo) =>{
    props.handleAddNode('some  node type', props.position)
    props.handleAddNode()
    addNode(nodeInfo)
  }

  const showFlyout = () => {
    setFlyoutActive(true)
  }

  return (
    <>
      <div>
        <FlyOut closeMenu = {props.closeMenu}
         nodeOptions = {flyoutData}
         active = {flyoutActive}
         position={props.position}
         handleAdd = {handleAdd}
         percentage = {percentage}
       />

          <List component="nav" aria-label="main mailbox folders" className = {classes.list}>
            {Object.keys(nodeMenu).map((li, i)=>(
              <ListItem key = {i}  className = {classes.listItem} onMouseEnter = {()=>{handleHover(li, (i/Object.keys(nodeMenu).length)*100)}} id = {li}>
                <ListItemIcon key = {i}>
                  {nodeMenu[li].icon}
                </ListItemIcon>
                <ListItemText primary= {li} onClick = {showFlyout}/>
              </ListItem>
            ))}
          </List>
      </div>
      </>
  );
}

export default PopUpList
