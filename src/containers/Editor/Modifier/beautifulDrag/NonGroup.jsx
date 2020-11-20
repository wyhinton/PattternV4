import React from "react";
import PropTypes from "prop-types";
import { Droppable, Draggable } from "react-beautiful-dnd";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
import { useState, useEffect } from 'react'
import { Item } from "./Item";
import { makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ActiveButton from '../../CustomButtons/ActiveButton'
import MinimizeButton from '../../MinimizeButton'
import CloseButton from '../../CustomButtons/CloseButton'


const useStyles = makeStyles((theme)=>({
  expand: {
    padding: 0,
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  groupLabel: {
    display: 'flex'
  }
  // removeButton: {
  //   padding: 0,
  //   margin: 'auto'
  // },
  // expanded: {
  //   padding: '3px',
  //   paddingLeft: '12px',
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: 'red',
  //   color: 'white'
  // },
  // collapse: {
  //   background: theme.palette.primary.dark,
  //   padding: 10
  // }
}));

export const NonGroup = ({
  group,
  index,
  setDraggedGroup,
  isGroupDragged,
  removeGroup
}) => {
  const handleMouseDown = () => {
    // TODO: normally this action should be called in `onBeforeDragStart`,
    // but there is a known unresolved issue on github:
    // https://github.com/atlassian/react-beautiful-dnd/issues/930
    // setDraggedGroup(true);
  };
  const classes = useStyles();

  const handleExpandClick = () => {
    console.log('shoudl expand')
    setExpanded(!expanded);
  };

  const [expanded, setExpanded] = React.useState(false);


  return (
    <Draggable draggableId={group.id} index={index}>
      {provided => (
        <div
          className="group"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
                      <ActiveButton onClick = {console.log('active got clicked')}/>
          <div
            className="groupHeader"
            {...provided.dragHandleProps}
            onMouseDown={(...args) => {
              handleMouseDown();
              // provided.dragHandleProps.onMouseDown(...args);
            }}
          >
            <span className = {classes.groupLabel}>


              <MinimizeButton onClick = {handleExpandClick} minimized = {expanded}/>
              {group.title}

            </span>
            <CloseButton  onClick = {() => {removeGroup(group.id)}}/>
          </div>
        </div>
      )}
    </Draggable>
  );
};

NonGroup.propTypes = {
  group: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isGroupDragged: PropTypes.bool.isRequired,
  setDraggedGroup: PropTypes.func.isRequired
};
