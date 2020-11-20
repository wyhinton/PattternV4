import React, { Component } from 'react'
import Modifier from '../Modifier/Modifier'
import DraggableList from '../Modifier/draggableList/DraggableList'
import { makeStyles, Theme  } from '@material-ui/core/styles';
import sourceList from './SourceList'
import { useState, useEffect } from 'react'
import { StoreProvider, createStore } from 'easy-peasy'
import model from '../../../model'
import DropDown from '../DropDown'

const useStyles = makeStyles((theme: Theme)=>({
  root: {
    height: '100%',
    width: '100%'
  },
  addModifierMenu:{
    backgroudColor: theme.palette.primary.main
  }
}));

interface newItem{
    id: number
    text: string
    type: string
    open: boolean
}

export function SourcePanel(props){
  const classes = useStyles();
  const [items, setitems] = useState([]);
  const [count, setCount] = useState(0)
  const [remove, setRemove] = useState()
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (value) => {
    setCount(count => count + 1)
    var prevArray = [...items]
    setitems(prevArray => [...prevArray, {
      id: count,
      text: 'blablahblah',
      type: value,
      open: false,
    }])
    console.log(prevArray)
  }

  const handleRemove = (id) =>{
    console.log('should remove' + id)
    console.log('blablhagl')
    setitems(items.filter(modifier => modifier.id !== id));
  }

  const moveUpModifier = (index) =>{
    console.log('should move up' + index)
    // console.log(items)
    return index-1
  }

  const openModifier = (id) => {
    console.log('should open this one', id)
    let copyArray = [...items]
    let index = items.findIndex( modifier => modifier.id === id );
    copyArray[index] = {...copyArray[index], open: !copyArray[index].completed}
    setitems(copyArray)
    console.log(items[index])
  }

  const handleExpandClick = () => {
    console.log('shoudl expand')
    setExpanded(!expanded);
  };


  return (
    <div>
    <div>
      <div className = {props.panelLabelClass}> {props.label}</div>
      <DropDown
       className = {classes.addModifierMenu}
       items = {sourceList}
       onChange = {(value) => handleChange(value)}
       label = {'Add Source'}
       >
       </DropDown>
      <DraggableList
        activeitems = {items}
        removeModifier = {handleRemove}
        openModifier = {openModifier}
        moveUpModifier = {moveUpModifier}
      ></DraggableList>
      </div>
    </div>
  )
}

export default SourcePanel
