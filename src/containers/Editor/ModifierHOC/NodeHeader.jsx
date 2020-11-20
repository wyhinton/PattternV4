import React, {useEffect} from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import ActiveButton from '../CustomButtons/ActiveButton';
import CloseButton from '../CustomButtons/CloseButton';
import SoloButton from '../CustomButtons/SoloButton';
import CreateIcon from '@material-ui/icons/Create';

import { useStoreActions } from 'easy-peasy'

import { makeStyles  } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
   nodeHeaderContainer: {
     height: '20px',
     width: '100%',
     backgroundColor: 'red',
     display: 'flex',
     justifyContent: 'space-between'
   }
}));


export const NodeHeader = (props) => {
  const classes = useStyles()
  const toggle = useStoreActions(actions => actions.panels.toggle)
	const remove = useStoreActions(actions => actions.panels.remove)
  const toggleSolo = useStoreActions(actions => actions.panels.toggleSolo)
  const toggleEdit = useStoreActions(actions => actions.panels.toggleEdit)
  useEffect(()=>{
    console.log('node header props are: ', props);
  })
  return (
    <div className = {classes.nodeHeaderContainer}>
      <ActiveButton onClick ={()=>toggle({id: props.id, nodeId: props.nodeId} )} active = {props.active}/>
      <SoloButton onClick ={()=>toggleSolo({id: props.id, nodeId: props.nodeId} )} active = {props.solo}/>
      <CloseButton  onClick ={()=>remove( {id: props.id, nodeId: props.nodeId} )}/>
      {(props.nodeId === 'sources') ? <CreateIcon  onClick ={()=>toggleEdit( {id: props.id, nodeId: props.nodeId} )} style = {{height: '100%'}}/> : ''}

  </div>
  );
};

// Item.propTypes = {
//   item: PropTypes.object.isRequired,
//   index: PropTypes.number.isRequired,
//   isVisible: PropTypes.bool.isRequired,
//   isActive: PropTypes.bool.isRequired
// };

export default NodeHeader
