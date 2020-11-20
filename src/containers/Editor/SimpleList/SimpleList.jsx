import React, { Component, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CloseButton from '../CustomButtons/CloseButton'
import ActiveButton from '../CustomButtons/ActiveButton'
import { useStoreActions } from 'easy-peasy'
import NewModifier from '../ModifierHOC/NewModifier'
import DragHandle from './DragHandle';
import { makeStyles  } from '@material-ui/core/styles';
import { connect } from 'react-redux';
// fake data generator
// const getItems = (pro) =>
// 		items.map(item, k => ({
// 			id: k,
// 			content: item.type
// 	}));

// a little function to help us with reordering the result




const useStyles = makeStyles((theme)=>({
	closeButton: {
		// position: 'absolute',
		// top: 0,
		// right: 0,
		padding: 0
	},
	iconContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		position: 'relative'
	}
}));

const grid = 8;

const getItemStyle = (isDragging, draggableStyle, active, nonSolo) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: "none",
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,
	// return condition1 ? value1  : condition2 ? value2 : condition3 ? value3 : value4;
 // }
	// change background colour if dragging
	// background: isDragging ? "lightgreen"
	// 										: "grey"
	background: isDragging ? "lightgreen" : active ? 'lightgrey' : nonSolo ? 'black' : 'grey',
	opacity: active ? "1" : ".2",

	// styles we need to apply on draggables
	...draggableStyle
});

const getListStyle = isDraggingOver => ({
	background: isDraggingOver ? "lightblue" : "lightgrey",
	padding: grid,
  width: 250,
  position: "relative"
});

const queryAttr = "data-rbd-drag-handle-draggable-id";

const Handle = <div style = {{width: 20, height: 20, backgroundColor: 'red'}}></div>

export function SimpleList(props) {

  // const { replaceNodeList, toggle, remove } = props
	const [placeholderProps, setPlaceholderProps] = useState({});
	console.log(props.items)
  const classes = useStyles();
	const toggle = useStoreActions(actions => actions.panels.toggle)
	const remove = useStoreActions(actions => actions.panels.remove)

	// const [items, setItems] = useState(props.items.map((item, k)=>({
	const [items, setItems] = useState(props.items)
	// 	id: item.id,
	// 	content: item.type,
	// 	active: item.active
	const replaceNodeList = useStoreActions(actions => actions.panels.replaceNodeList)

	const reorder = (list, startIndex, endIndex) => {
		console.log('received list at reorder');
		console.table(list)
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		console.log('reorder input: ', list, 'reorder result: ', result, 'removed: ', removed );
		for (var i = 0; i < result.length; i++) {
			var curItem = result[i]
			curItem.index = i
		}
	  replaceNodeList({nodeId: props.nodeId, replacement: result})
		console.log('replacing node with');
		console.table(result)
		return result;
	};





	const onDragEnd = result => {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

    setPlaceholderProps({})
		setItems(items => reorder(items, result.source.index, result.destination.index));
	};

	const onDragUpdate = update => {
    if(!update.destination){
      return;
    }
		const draggableId = update.draggableId;
		const destinationIndex = update.destination.index;

		const domQuery = `[${queryAttr}='${draggableId}']`;
		const draggedDOM = document.querySelector(domQuery);

		if (!draggedDOM) {
			return;
		}
		const { clientHeight, clientWidth } = draggedDOM;

		const clientY = parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) + [...draggedDOM.parentNode.children]
			.slice(0, destinationIndex)
			.reduce((total, curr) => {
				const style = curr.currentStyle || window.getComputedStyle(curr);
				const marginBottom = parseFloat(style.marginBottom);
				return total + curr.clientHeight + marginBottom;
			}, 0);

		setPlaceholderProps({
			clientHeight,
			clientWidth,
      clientY,
      clientX: parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft)
		});
	};

	useEffect(()=>{
		// console.log(props.items, ' original items')
		// console.log(props.items.sort((a, b) =>a.index-b.index), ' sorted items');
		// setItems(props.items.sort((a, b) =>a.index-b.index))
		//
		// console.log(props.nodeId);
		console.log('toggle is: ', toggle);
		console.log('repalce is :', replaceNodeList);
		setItems(props.items)
		console.log('props changed and rerendeirng items')
		console.table(props.items)
		console.log('new set items are');
		console.table(items);
	}, [props.items])

	// Normally you would want to split things out into separate components.
	// But in this example everything is just done in one place for simplicity
	return (
		<DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
			<Droppable droppableId="droppable">
				{(provided, snapshot) => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						style={getListStyle(snapshot.isDraggingOver)}
					>
						{items.map((item, index) => (

							<Draggable key={item.id} draggableId={item.id} index={index}>
								{(provided, snapshot) => (

									<div
										ref={provided.innerRef}
										{...provided.draggableProps}

										style={getItemStyle(
											snapshot.isDragging,
											provided.draggableProps.style,
											item.active,
											item.nonSolo
										)}
									>

									<div className = {classes.iconContainer}>
										<DragHandle {...provided.dragHandleProps} />

									</div>
										<NewModifier
											 // id = {item.id}
											 // index = {index}
											 // active = {item.active}
											 // type = {item.type}
											 // nodeId = {props.nodeId}
											 // solo = {item.solo}
											 {...item} nodeId = {props.nodeId}
										 />
									</div>
								)}
							</Draggable>
						))}

						{provided.placeholder}
            {/* <CustomPlaceholder snapshot={snapshot} /> */}
            <div style={{
              position: "absolute",
              top: placeholderProps.clientY,
              left: placeholderProps.clientX,
              height: placeholderProps.clientHeight,
              background: "tomato",
              width: placeholderProps.clientWidth
            }}/>
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default SimpleList

// export default connect(
//     (dispatch) => ({
// 			toggle: dispatch,
// 			remove: dispatch.panels.remove,
// 			replaceNodeList: dispatch.panels.replaceNodeList
//     })
//     // (dispatch)
// ) (SimpleList)
