import React from 'react'
import { makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useState, useEffect } from 'react'
import BaseNode from './BaseNode';
import NodeDropDownMenu from './NodeControls/NodeDropDownMenu';
import {Handle, Position} from 'react-flow-renderer';
import InputNumber from './NodeControls/InputNumber/InputNumber';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme)=>({
  root: {
    border: 1,
    borderColor: 'white',
    width: 10,
    height: 10
  },
  active: {
    border: '1px solid white',
    width: 15,
    height: 15,
    // backgroundColor: theme.palette.secondary.main,
    borderRadius: 20,
    background: 'white'
  },
  inactive: {
    border: '1px solid white',
    width: 15,
    height: 15,
    backgroundColor: 'black',
    borderRadius: 20
  },

}));

// const display = (a) =>{
//   console.log(a);
//   return a
// }
export function ViewNode(props){
  const classes = useStyles();
  useEffect(()=>{
    console.log('math node props are:', props);
  })
  const [input1, setInput1] = useState(0)

//input 1
  useEffect(()=>{
    console.log('updating input1 ', input1);
    props.data.input1 = input1
    console.log('math node data is: ', props);
    // props.data.func = display
  }, [input1])


  const [mode, setMode] = useState()

  return(
    <BaseNode {...props} header = {'View'} labelColor = 'blue' icon = {<VisibilityIcon style = {{height: 5}}/>}
      children = {
        <>
          <Handle
          type="target"
          position="left"
          id = {'a'}
          style={{ background:'#555', top: '60%'  }}
          onConnect={(params) => console.log('handle onConnect', params)}
          />
          <span>
            {props.data.input1}
          </span>
          </>}
       >
    </BaseNode>
  )
}
ViewNode.propTypes = {
  input1: PropTypes.number,
}

ViewNode.defaultProps = {
  input1: 0,

}


export default ViewNode
