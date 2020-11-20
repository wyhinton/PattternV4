import React, { memo, useEffect, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { makeStyles } from '@material-ui/core/styles';
import { useStore, useStoreState, useStoreActions } from 'easy-peasy'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme)=>({
  header: {
    height: 16,
    backgroundColor: 'grey',
    color: 'white',
    fontSize: 12,
    paddingLeft: 16,
    paddingTop: 2,
  },
  baseClass: {
    border: 1,
    width: 100,
    borderRadius: 0,
    height: 'fit-content',
    backgroundColor: 'lightgrey',
  },
  activeNode: {
    width: 100,
    height: 'fit-content',
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
    // border: 1,
    // width: 100,
    // borderRadius: 0,
    // height: 20,
    position: 'absolute',
    // left: '-9%',
    // top: '-30%',
    // padding: 10,
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
  debug: {
    border: 1,
    width: 100,
    borderRadius: 0,
    height: 'fit-content',
    position: 'absolute',
    left: '-9%',
    top: '-30%',
    padding: 10,
    backgroundColor: 'lightgrey',
    overflowWrap: 'break-work',
    fontSize: 11,
    boxShadow: '0 0 black'
  },
  hide: {
    display: 'none'
  },
  bodyContainer: {
    minHeight: 12,
    width: 120,
    height: 95,
    minWidth: 80,
    border: '1px solid black',
    height: 'fit-content',
    backgroundColor: 'lightgrey',

  },
  arrowDropDown: {
    position: 'absolute',
    top: -2,
    left: -2,
    height: '1em',
    color: 'white',
  },
  nodeMinimized: {
    height: 0,
    overflow: 'hidden',
  }

}));


export default function BaseNode(props) {
  const classes = useStyles();
  const [collapse, setCollapse] = useState(false)
  const simplifyString = (object) =>{
    let toDisplay = {
      id: object.id,
      type: object.type,
    }
        var simpleObject = {};
      for (var prop in object ){
          if (!object.hasOwnProperty(prop)){
              continue;
          }
          if (typeof(object[prop]) == 'object'){
              continue;
          }
          if (typeof(object[prop]) == 'function'){
              continue;
          }
          simpleObject[prop] = object[prop];
      }
      return JSON.stringify(toDisplay); // returns cleaned up JSON
  }
  useEffect(()=>{
    console.log('data at Base Node is :', props)
    // console.log('in rack is : ', props.data.inRack);
  })
  // const addToRack = useStoreActions(actions=>actions.global.nodes.addRackNode)
  return (
    <>

    <div className = {classes.bodyContainer} style = {{border: (props.data.className === 'activeNode') ? '1px solid orange' : '1px solid black'}}>
      <ArrowDropDownIcon style = {{transform: collapse ? 'rotate(-90deg)' :'rotate(0deg)'} } className = {classes.arrowDropDown} onClick = {()=>{setCollapse(!collapse)}}/>
      <div className = {classes.header} style = {{backgroundColor: props.labelColor}}>{props.icon}{props.label}</div>
        <div
          className = {(props.data.inRack) ? classes.inRack : (props.data.inRackView) ?
          classes.addNodeRackClass : (props.data.debug) ? classes.debug : classes.hide}>
          {props.data.debug ? simplifyString(props) : ''}
          </div>
             {/*<div style = {{display: collapse ? 'none' : 'block'}}>*/}
             <div className = {collapse ? classes.nodeMinimized : ''}>
              <div className = {classes[props.data.className]} id = {props.data.id} style = {{padding: 10}}>
                 {/*{props.controls}*/}
                 {props.children}
             </div>

      </div>
    </div>
    </>
  );
};
