import React, { Component } from 'react'
import AddModifierMenu from './AddModifierMenu'
import Modifier from './Modifier'
import DraggableList from './draggableList/DraggableList'
import { makeStyles, Theme  } from '@material-ui/core/styles';
import modifierList from './ModifierList'
import { useState, useEffect } from 'react'
import { StoreProvider, createStore } from 'easy-peasy'
import model from '../../../model'

const useStyles = makeStyles((theme: Theme)=>({
  root: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(200,200,200)',
    padding: 10,
    maxHeight: '40%',
    overflow: 'scroll',
    borderRadius: 10,
    border: '1px solid black'
  },
  addModifierMenu:{
    backgroudColor: theme.palette.primary.main
  },

}));

interface newItem{
    id: number
    text: string
    type: string
    open: boolean
}

export function ModifierPanel(){
  const classes = useStyles();
  const [modifiers, setModifiers] = useState([]);
  const [count, setCount] = useState(0)
  const [remove, setRemove] = useState()
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (value) => {
    setCount(count => count + 1)
    var prevArray = [...modifiers]
    setModifiers(prevArray => [...prevArray, {
      id: count,
      text: 'blablahblah',
      type: value,
      open: false,
    }])
    console.log(prevArray)
    console.log(modifiers)
  }

  const handleRemove = (id) =>{
    console.log('should remove' + id)
    console.log('blablhagl')
    setModifiers(modifiers.filter(modifier => modifier.id !== id));
  }

  const moveUpModifier = (index) =>{
    console.log('should move up' + index)
    // console.log(modifiers)
    return index-1
  }

  const openModifier = (id) => {
    console.log('should open this one', id)
    let copyArray = [...modifiers]
    let index = modifiers.findIndex( modifier => modifier.id === id );
    copyArray[index] = {...copyArray[index], open: !copyArray[index].completed}
    setModifiers(copyArray)
    console.log(modifiers[index])
  }

  const handleExpandClick = () => {
    console.log('shoudl expand')
    setExpanded(!expanded);
  };


  return (
    <div>
    <div className = {classes.root}>
      <AddModifierMenu
       className = {classes.addModifierMenu}
       modifierList = {modifierList}
       onChange = {(value) => handleChange(value)}
       ></AddModifierMenu>
      <DraggableList
        activeitems = {modifiers}
        removeModifier = {handleRemove}
        openModifier = {openModifier}
        moveUpModifier = {moveUpModifier}
      ></DraggableList>
      </div>
    </div>
  )
}

export default ModifierPanel
