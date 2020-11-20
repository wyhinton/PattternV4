import { useState, useEffect } from "react";
import pull from "lodash/pull";

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const useDragAndDrop = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [isGroupDragged, setDraggedGroup] = useState(false);

  useEffect(() => {
    setData(data);
  }, initialData);

  const onDragEnd = result => {
    const { destination, source, type } = result;

    setDraggedGroup(false);

    // dropped outside the list
    if (!destination) return;

    // same group, same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // Group Ordering
    if (type === "group") {
      setData({
        ...data,
        groupOrder: reorder(data.groupOrder, source.index, destination.index)
      });
      return;
    }

    // Items ordering
    const start = data.groups[source.droppableId];
    const finish = data.groups[destination.droppableId];

    // Moving items in the same group
    if (start === finish) {
      const newState = {
        ...data,
        groups: {
          ...data.groups,
          [start.id]: {
            ...start,
            itemIds: reorder(start.itemIds, source.index, destination.index)
          }
        }
      };

      setData(newState);
      return;
    }

    // Moving items from one group to another
    const startItemIds = [...start.itemIds];
    const finishItemIds = [...finish.itemIds];

    const [removed] = startItemIds.splice(source.index, 1);
    finishItemIds.splice(destination.index, 0, removed);

    const newState = {
      ...data,
      groups: {
        ...data.groups,
        [start.id]: { ...start, itemIds: startItemIds },
        [finish.id]: { ...finish, itemIds: finishItemIds }
      }
    };

    setData(newState);
  };

  return {
    data,
    onDragEnd,
    setDraggedGroup,
    isGroupDragged
  };
};
