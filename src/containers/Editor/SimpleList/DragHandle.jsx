import DragHandleIcon from '@material-ui/icons/DragHandle';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme)=>({
  root: {
    width: 30,
    height: 30,
  }
}))

const DragHandle = (props) => {
  const classes = useStyles();
  return (
    <div {...props} className = {classes.root}>
      <DragHandleIcon />
    </div>
  );
}


export default DragHandle;
