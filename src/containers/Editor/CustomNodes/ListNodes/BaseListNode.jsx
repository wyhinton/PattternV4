import React, { memo, useEffect } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { makeStyles } from '@material-ui/core/styles';
import { useStore, useStoreState, useStoreActions } from 'easy-peasy'

const useStyles = makeStyles((theme)=>({
  header: {
    height: 20,
    backgroundColor: 'grey',
    color: 'white',
    fontSize: 12,
    paddingLeft: 4,
  },
  baseClass: {
    border: 1,
    width: 100,
    borderRadius: 0,
    height: 20,
    backgroundColor: 'lightgrey',
  },
  activeNode: {
    width: 100,
    height: 20,
  },
  inSelection: {
    border: 1,
    width: 100,
    height: 20,
    backgroundColor: 'green',
    position: 'absolute',
    zIndex: -1
  },

  addNodeRackClass: {
    border: 1,
    width: 100,
    borderRadius: 0,
    height: 20,
    position: 'absolute',
    left: '-9%',
    top: '-30%',
    padding: 10,
    backgroundColor: '#80008045',
  },
  inRack: {
    border: 1,
    width: 100,
    borderRadius: 0,
    height: 20,
    position: 'absolute',
    left: '-9%',
    top: '-30%',
    padding: 10,
    backgroundColor: 'green',
  },
  hide: {
    display: 'none'
  },
  bodyContainer: {
    minHeight: 80,
    minWidth: 80,
    border: '1px solid black',
    height: 'fit-content',
    backgroundColor: 'lightgrey'
  }
}));


export default memo(({ data }) => {
  const classes = useStyles();
  useEffect(()=>{
    console.log('data at baseListnode is :', data)
    console.log('in rack is : ', data.inRack);
  })
  // const addToRack = useStoreActions(actions=>actions.global.nodes.addRackNode)
  const defaultClick = () =>{
    console.log('executing default click');
  }
  return (
    <>
    <Handle
      type="target"
      position="left"
      style={{ background: '#555' }}
      onConnect={(params) => console.log('handle onConnect', params)}
    />
    <div className = {classes.bodyContainer} style = {{border: (data.className === 'activeNode') ? '1px solid orange' : '1px solid black'}}>
      <div className = {classes.header}>{'list node'}</div>
      <div style = {{display: data.inRackView ? 'block' : 'none'}} className = {(data.inRack) ? classes.inRack : (data.inRackView) ?  classes.addNodeRackClass : classes.hide}>
      </div>
       <div>
        <div className = {classes[data.className]} id = {data.id}>
         </div>
       <Handle
        type="source"
        position="right"
        id="a"
        style={{ top: 10, background: '#555' }}
        />
      </div>
    </div>
    </>
  );
});
