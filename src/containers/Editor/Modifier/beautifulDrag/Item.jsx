import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";

export const Item = ({ item, index, isVisible, isActive }) => {
  const { title } = item;

  return (
    <Draggable draggableId={item.id} index={index} isActive = {isActive}>
      {provided => (
        <div
          className={`item ${isVisible ? "" : "hidden"}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span>{title}</span>
          <span>say something</span>
        </div>
      )}
    </Draggable>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired
};

export default Item
