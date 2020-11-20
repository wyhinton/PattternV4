  import React, { Component } from 'react'
	import ReactDOM from 'react-dom'
	// import { DndProvider } from 'react-dnd'
	import { HTML5Backend } from 'react-dnd-html5-backend'
  import { Container } from './Container'

  export function DraggableList(props){
		// console.log(props.activeModifiers)
		console.log(props.activeitems, 'active aitmes in draggable are')
    return(
      <div className="App">

          <Container
						activeitems = {props.activeitems}
						removeModifier =  {props.removeModifier}
						openModifier = {props.openModifier}
						moveUpModifier = {props.moveUpModifier}
            dropDownItems = {props.dropDownItems}
						/>

      </div>
    )
  }
export default DraggableList
