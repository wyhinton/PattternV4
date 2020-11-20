import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 20,
    width: 20,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    fontSize: '18px',
    marginRight: 5,
    border: '1px solid black'
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  customIcon: {
    fontSize: 10
  }
}));

export default function SimpleTooltips(props) {
  const classes = useStyles();

  return (
    <div className = {classes.root} onClick = {props.onClick} style = {{backgroundColor: props.active ? 'orange' : 'lightgrey'}}>
      <Tooltip title={props.tooltip}>
          <i className = {'material-icons'} style = {{fontSize: 18}}>
            {props.iconClassName}
          </i>
      </Tooltip>
    </div>
  );
}
