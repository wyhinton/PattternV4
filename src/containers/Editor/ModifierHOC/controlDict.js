import DrawControls from './ModifierControls/DrawControls';
import SubdivisionControls from './ModifierControls/ScrapeControls'
import React, { Component } from 'react'

const handleChange = (event, newValue) => {
    console.log(event)
    console.log(newValue)
    // this.setState({
      // testValue: newValue
    // })
 };

export var controlDict = {
  'Drawing': <DrawControls onChange = {handleChange}/>,
  'subdivision': <SubdivisionControls onChange = {handleChange}/>,
  'bend': <DrawControls onChange = {handleChange}/>,
  'scrape': <DrawControls onChange = {handleChange}/>
}

export default controlDict
