import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import "./styles.css";
import { useState, useEffect } from 'react'
import { useDragAndDrop } from "./useDragAndDrop";
import { data as initialData } from "./constants";
import Item from './Item'
import { Group } from "./Group";
import { NonGroup } from './NonGroup'
import { size } from 'lodash'
// import data from './constants'

const useStyles = makeStyles((theme)=>({
  listContainer: {
    border: '1px solid black'
  }
}));


export default function List(props:{id: number, isActive: boolean, listItems: any}){
  const classes = useStyles();
  const { data, onDragEnd, setDraggedGroup, isGroupDragged } = useDragAndDrop({
    initialData
  });
  const [listData, setListData] = useState(props.listItems)
  useEffect(()=>{
    setListData(props.listItems)
    console.log(props.listItems)
  })

  const removeGroup = (groupid) =>{
    console.log('should remove group' + groupid)
    console.log(listData)
    let testObj = Object.assign({}, listData)
    testObj.groups = listData.groups.filter(group => group.id !== groupid)
    testObj.groupOrder = listData.groupOrder.filter(group => group !== groupid)
    console.log(listData.groups.filter(group => group.id !== groupid))
    listData.groups = listData.groups.filter(group => group.id !== groupid)
    listData.groupOrder = listData.groupOrder.filter(group => group !== groupid)
    console.log(testObj)
    setListData(testObj);
  }

  return (
    <div className = {classes.listContainer} style = {{display: `${props.isActive ? "block" : "none"}`}}>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-groups" type="group">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>

              {listData.groupOrder.map((groupId, index) => {
                console.log(listData.groups)

                if (listData.groups.length > 0){
                  console.log(listData.groups.length)
                  const group = listData.groups.find(somegroup => somegroup.id === groupId)

                    if (group.isGroup) {
                      const items = group.itemIds.map(id => listData.items[id]);
                      console.log(group.isGroup)
                      return (
                        <Group
                          key={groupId}
                          group={group}
                          items={items}
                          index={index}
                          setDraggedGroup={setDraggedGroup}
                          isGroupDragged={isGroupDragged}
                          removeGroup = {removeGroup}
                        />
                      );
                    } else {
                      return(
                        <NonGroup
                        key={groupId}
                        group={group}
                        index={index}
                        setDraggedGroup={setDraggedGroup}
                        isGroupDragged={isGroupDragged}
                        removeGroup = {removeGroup}
                        />
                      )
                    }
                }
              })}
              {provided.placeholder}
              {/*<Item item = {{
                id: "item-3",
                title: "Item 3"
              }} isActive = {true} index = {5} isVisible = {true}/>*/}
            </div>


          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
