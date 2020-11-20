import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import MaxWidthDialog from './ShapeEditor/MaxWidthDialog'
import { useState, useEffect } from 'react'
import React, { Component } from 'react'

const useStyles = makeStyles((theme)=>({
  root: {
    height: '40%',
    width: '100%',
    backgroundColor: theme.palette.primary.light,
    borderRadius: '10px',
    margin: 0
  },
  canvasContainer: {
    width: '100%',
    height: 200
  },
  editIcon: {

  }
}));

export function PrimaryShape (){
  const classes = useStyles();
  const [shapeEditor, setShapeEditor] = useState(false)

  const handleToggle = () => {
    setShapeEditor(!shapeEditor)
    console.log(shapeEditor)
  }
  return (
  <Grid container spacing = {3} className = {classes.root}>
    <MaxWidthDialog isOpen = {shapeEditor} />
    <IconButton onClick = {handleToggle}>
      <EditIcon />
    </IconButton>
        {/*//add resize back to canvas?>*/}
    <div className = {classes.canvasContainer}>
    {/*<PaperCanvas/>*/}
    </div>


  </Grid>
  )

}

export default PrimaryShape
