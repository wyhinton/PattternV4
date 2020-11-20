import React from "react";
import { render } from "react-dom";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import List from '../Modifier/beautifulDrag/List'
import "react-tabs/style/react-tabs.css";
export function RealTabNav(props) {
  // state = {
  //   selectedIndex: 0
  // };

  // handleSelect = index => {
  //   this.setState({ selectedIndex: index });
  // };
  //
  // handleButtonClick = () => {
  //   this.setState({ selectedIndex: 0 });
  // };

    return (
      <div>
      <div onClick = {props.addTab}> add tab </div>

      <Tabs
        selectedIndex={props.activeTab}
        onSelect={(e)=>{props.handleSelect(e)}}
      >
          <TabList>

            {props.listArray.lists.map(list=>{
              if (list.type == 'group'){
                return(
                  <Tab>{'group'+ list.id}</Tab>
                )}
            })}
          </TabList>
          {console.log(props.listArray)}
          {props.listArray.lists.map(list=>{
            if (list.type == 'group'){
              console.log(list, 'list at real tab nav is')
              console.log('list.id', list.id, 'activeListIndex', props.activeTab, 'list items are', list.content.listItems)

              return(
               <TabPanel>
                <div> {"list id is: "+list.id}</div>
                <div> {'tab index is: ' + props.activeTab}</div>

                 {/*<List id = {list.id} key = {list.id} isActive = {list.id == props.activeListIndex} listItems = {defaultdata}/>*/}
                 <List id = {list.id} key = {list.id} isActive = {(props.activeTab + 1) == list.id} listItems = {list.content.listItems}/>
               </TabPanel>
              )}
          })}
       </Tabs>
      </div>

    );
}

export default RealTabNav
