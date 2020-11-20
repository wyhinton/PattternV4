import React, { Component } from 'react'
import { makeStyles, Theme  } from '@material-ui/core/styles';
import { useState, useEffect } from 'react'
import { StoreProvider, createStore } from 'easy-peasy'
import Collapse from '@material-ui/core/Collapse';
import DropDown from './DropDown'
import SimpleTabs from './TabNav/SimpleTabs'
import ListsContainer from './ListsContainer'
import testListArray from './testListArray'
import MinimizeButton from './MinimizeButton'
import TestTab from './TabNav/TestTab'
import RealTabNav from './SecondTabs/RealTabNav'
import List from './Modifier/beautifulDrag/List'
import SimpleList from './SimpleList/SimpleList'
import { useStoreActions, Action} from 'easy-peasy'
import Modifier from './Modifier/Modifier'
import { connect } from 'react-redux';
// interface newItem{
//     id: number
//     text: string
//     type: string
//     open: boolean
// }
//

const useStyles = makeStyles((theme)=>({
  root: {
    height: '100%',
    width: '100%'
  },
  dropDownMenu:{
    backgroudColor: theme.palette.primary.main
  },
  panel: {
    borderRadius: '16px',
    overflow: 'hidden',
    height: 'fit-content',
    border: '1px solid black'
  },
  collapse: {

  },
  panelLabel: {
    backgroundColor: 'white',
    // boxShadow: 'inset 0 0 10px #000000',
    color: 'black',
    fontSize:  24,
    height: '4vh',
  },
  addGroupButton:{
    textAlign: 'center',
    padding: 5,
    borderBottom: '1px solid black',

  }
}));


// interface newItem{
//     id: number
//     text: string
//     type: string
//     open: boolean
// }



export function Panel({startTabs, label, activeItems, nodeId, dropDownItems, dropDownLabel}){
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0)
  const [remove, setRemove] = useState()
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(0)
  const [activeLists, setActiveLists] = useState(testListArray)
  const [groupCount, setGroupCount] =  useState(startTabs)


  const handleAdd = (value) =>{
  }

  const handleRemove = (id) =>{
    console.log('should remove' + id)
    console.log('blablhagl')
    setItems(items.filter(item => item.id !== id));
  }

  const moveUpitem = (index) =>{
    console.log('should move up' + index)
    // console.log(items)
    return index-1
  }

  const openitem = (id) => {
    console.log('should open this one', id)
    let copyArray = [...items]
    let index = items.findIndex( item => item.id === id );
    copyArray[index] = {...copyArray[index], open: !copyArray[index].completed}
    setItems(copyArray)
    console.log(items[index])
  }

  const handleExpandClick = () => {
    console.log('shoudl expand')
    console.log(expanded)
    setExpanded(!expanded);
    console.log(expanded, 'after')
  };

  const handleTabClick = (e) =>{
    console.log('active tab is', e.target.id)
    let activeIndex = parseInt(e.target.id)
    setActiveTab(activeIndex)
  }

  const handleSelect = (index) => {
    console.log('active index is', index)

    // this.setState({ selectedIndex: index });
    setActiveTab(index)
  };



  const addGroupToActiveList = () =>{
    let copyObj = Object.assign({}, activeLists)
    let toGetList = copyObj.lists[activeTab]
    let groupCount = toGetList.content.listItems.groups.length
    console.log('togetslength',  toGetList.content.listItems.groups.length)
    let testString = 'group-' + activeTab +'-'+ (groupCount+1)
    console.log(testString)
    toGetList.content.listItems.groups.push({id: testString, title: testString, isGroup: true, itemIds: [
      "item-3"], items: {"item-3": {id: "item-3", title: "item 3"}}
    })
    toGetList.content.listItems.groupOrder.push(testString)
    console.log(copyObj)
    setActiveLists(copyObj)
  }

	const add = useStoreActions(actions => actions.panels.add)

  var testMod1 = <Modifier modifierIcon = {<div>a</div>} modifierName = {'Subdivision'} dropDownItems = {dropDownItems}/>

  // handleButtonClick = (evt) => {
  //   this.setState({ selectedIndex: 0 });
  // };

  // const tabPanels = ()
  return (
      <div className = {classes.panel}>

        <div className = {classes.panelLabel}> {label}
          <MinimizeButton onClick = {handleExpandClick} minimized = {expanded}/>
        </div>

        <Collapse in={expanded} timeout="auto" unmountOnExit className = {classes.collapse}>
          <DropDown
           className = {classes.dropDownMenu}
           items = {dropDownItems}
           onChange = {(value)=>add(value)}
           label = {dropDownLabel}
           nodeId = {nodeId}
           />

           {/*<div className = {classes.addGroupButton} onClick = {addGroupToActiveList}> add group </div>*/}
           {/*<ListsContainer activeListIndex = {0} listArray = {activeLists}/>*/}
           <SimpleList items = {activeItems} nodeId = {nodeId} testMods = {testMod1} />
           {/*<List id = {0} isActive = {true} listItems = {newTestArray}/>*/}
        </Collapse>

      </div>
  )
}


// export default Panel
export default React.memo(connect()(Panel))
