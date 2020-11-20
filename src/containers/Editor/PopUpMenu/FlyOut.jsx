import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InputIcon from '@material-ui/icons/Input';
import BuildIcon from '@material-ui/icons/Build';
import ReorderIcon from '@material-ui/icons/Reorder';
import { useStore, useStoreState, useStoreActions } from 'easy-peasy'

const useStyles = makeStyles((theme) => ({
  flyout: {
    width: '100%',
    height: 'fit-content',
    maxWidth: 360,
    backgroundColor: 'lightgrey',
    position: 'absolute',
    borderRadius: 5,
    transform: 'translate(200px, -19px)',
    boxShadow: '0px 0px 9px #a2a2a2',
    border: '1px solid black'
  },
  listItem:{
    borderBottom: '1px solid black',
    paddingTop: 0,
    paddingBottom: 0,
    '&:hover':{
      backgroundColor: 'grey'
    }
  },
  list:{
    padding: 0
  }
}));

const showFlyout = () => {
  console.log('show the flyout');
}
export function FlyOut(props) {
  const classes = useStyles();
  // const addNode = useStoreActions(actions => actions.global.nodes.addNode)

  // const handleAdd = (nodeInfo) =>{
  //   props.handleAddNode()
  //   addNode(nodeInfo)
  // }
  // useEffect(()=>{
  //   console.log('active at flyout is : ', props.active);
  //   console.log('percentage is', props.percentage);
  // })
  const handleAdd = (pos, type) =>{
    console.log('new node at pos, type', pos, type);
    props.closeMenu()
  }

  return (
    <div className = {classes.flyout} style = {
      {
        display: props.active ? 'block' : 'none',
        transform: `translate(200px, ${props.percentage}%)`
      }

    }>
      <List component="nav" aria-la6bel="main mailbox folders" className = {classes.list}>
      {
        props.nodeOptions.items.map((nodeItem, index)=>(
          <ListItem key = {index} className = {classes.listItem} onClick = {()=>{handleAdd(props.position, nodeItem.nodeType)}}>
            <ListItemIcon>
              {nodeItem.icon}
            </ListItemIcon>
            <ListItemText primary= {nodeItem.label} />
          </ListItem>
        ))
      }
      </List>
    </div>
  );
}

export default FlyOut
