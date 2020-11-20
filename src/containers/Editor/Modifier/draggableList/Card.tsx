import React, { useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { XYCoord } from 'dnd-core';
import Modifier from '../Modifier';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import { makeStyles } from '@material-ui/core/styles';
import TollIcon from '@material-ui/icons/Toll';
import AllOutIcon from '@material-ui/icons/AllOut';
import WavesIcon from '@material-ui/icons/Waves';
import BorderAllIcon from '@material-ui/icons/BorderAll';
import LooksIcon from '@material-ui/icons/Looks';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import { useState, useEffect } from 'react'

const useStyles = makeStyles((theme)=>({
  root: {
    border: 0,
    borderRadius: 3,
    height: '5%',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
  },
  modiferIcon: {
    height: '.5em',
    width: '.5em'
  }
}));

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}

export interface CardProps {
  id: any
  text: string
  type: string
  index: number
  removeModifier: any
  openModifier: any
  moveUpModifier: any
  moveCard: (dragIndex: number, hoverIndex: number) => void
  dropDownItems: any
}

interface DragItem {
  index: number
  id: string
  type: string
  removeModifier: any
  openModifier: any
  moveUpModifier: any
}
export const Card: React.FC<CardProps> = ({ id, text, index, moveCard, type, removeModifier, openModifier, moveUpModifier, dropDownItems }) => {
  const ref = useRef<HTMLDivElement>(null)
  const classes = useStyles();
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  const findIcon = (name) => {
  var  modifierIcon
    switch (name) {
      case "Subdivision":
      modifierIcon = <AllOutIcon className = {classes.modiferIcon} />
        break;
      case "Noise":
        // console.log('noise')
        modifierIcon = <WavesIcon />
        break;
      case "Color":
        modifierIcon = <TollIcon />
        break;
      case "Tile":
        modifierIcon = <BorderAllIcon />
        break;
      case "Bend":
        modifierIcon = <LooksIcon />
        break;
      case "Displace":
        modifierIcon = <FilterHdrIcon />
        break;
      case "Scrape":
          modifierIcon = <FilterHdrIcon />
          break;
      default:
        console.log('no icon');
        break;
      }
    // console.log(modifierIcon)
    return modifierIcon
  }
  return (
    <div style= {{marginBottom: 10}}ref={ref} >
        <Modifier
          modifierName = {type}
          modifierIcon = {findIcon(type)}
          removeModifier = {removeModifier}
          moveUpModifier = {() => {moveCard(index, index-1)}}
          moveDownModifier = {() => {moveCard(index, index+1)}}
          dropDownItems = {dropDownItems}
          id = {id}
          index = {index}
          openModifier = {openModifier}
          >
          </Modifier>

    </div>
  )
}
