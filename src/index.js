import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import './fonts/VT323-Regular.ttf'
import { StoreProvider, createStore, useStore, useStoreState, action, debug } from 'easy-peasy'
import Modifier from './containers/Editor/Modifier/Modifier'
import NewModifier from './containers/Editor/ModifierHOC/NewModifier';
import { Provider } from 'react-redux'
// importc
// import rootReducer from './reducers'
// [
//   {
//     value: 'Add',
//     label: 'Add'
//   },
//   {
//     value: 'Subtract',
//     label: 'Subtract'
//   },
//   {
//     value: 'Divide',
//     label: 'Divide'
//   },
//   {
//     value: 'Exponent',
//     label: 'Exponent'
//   },
//   {
//     value: 'Multiply',
//     label: 'Multiply'
//   },
// ]

const store = createStore({
    global: {

      nodeViewOptions: ['none'],
      activeNodeTree: {},
      nodeTrees: [
        {
          label: 'Patttern Tree 1',
          value: 'Patttern Tree 1',
          index: 0,
          elements: [],
        }
      ],
      setTreeElements: [],
      addNodeTree: action((state)=>{

        const newTree = {
          label: `New Pattern Tree .${state.nodeTrees.length}`,
          value: `New Pattern Tree .${state.nodeTrees.length}`,
          index: state.nodeTrees.length
        }
        console.log('adding new node tree: ', newTree);
        state.nodeTrees.push(newTree)

      }),
      deleteNodeTree: action((state, treeId)=>{
        console.log('deleting node tree: ', treeId);
        state.nodeTrees = state.nodeTrees.filter(t=>t.value === treeId.value)

      }),
      setActiveNodeTree: action((state, treeId)=>{
        console.log('selected treeId is:', treeId);
        const active = state.nodeTrees.filter(t=>t.label === treeId)[0]
        state.activeNodeTree = active
        console.log('changed active tree to: ', active);
      }),
      viewMode: 'node',
      activeNode: {},
      selectedNodes: [],
      // checkNodeViewOption: action((state, nodeViewOption)=>{
      //   if (state.nodeViewOptions.includes(nodeViewOption)) {
      //     console.log('node view options already includes, deactivtating', nodeViewOption);
      //     state.nodeViewOptions = state.nodeViewOptions.filter(nodeViewOption)
      //   } else {
      //     console.log('activatign ', nodeViewOption);
      //     state.nodeViewOptions.push(nodeViewOption)
      //   }
      // }),
      setViewMode: action((state, viewMode)=>{
        console.log('should change to: ', viewMode);
        console.log('view mode before was: ', debug(state.viewMode));
        state.viewMode = viewMode
        console.log('succesfully set view mode to: ', debug(state.viewMode));
      }),
      setShowRack: action((state)=>{
        // console.log('should c: ', viewMode);
        // console.log('view mode before was: ', debug(state.viewMode));
        // state.viewMode = viewMode
        // console.log('succesfully set view mode to: ', debug(state.viewMode));
      }),
      setActiveNode: action((state, click)=>{
        console.log('settings active node to: ', click.node);
        console.log('click event is: ', click);
        console.log('active nodes are: ', debug(state.nodes.activeNodes));
        const activeNode = state.nodes.activeNodes.filter(n=>{return n.id === click.node.id})[0]
        activeNode.data.className = 'activeNode'
        console.log('found node is: ', activeNode);
        state.nodes.activeNodes.forEach((item, i) => {
          if (item.id !== click.node.id && !state.selectedNodes.includes(item)) {
              item.data.className = 'baseClass'
          }
        });
        state.activeNode = activeNode
        if (!click.event.shiftKey) {
          console.log('selectd without shift key');
          state.selectedNodes = [activeNode]
        }
        console.log('slected nodes are:', debug (state.selectedNodes));
        console.log('activeNode is: ', debug(state.activeNode));
      }),
      addToSelection: action((state, nodeInfo)=>{
        const toAdd = state.nodes.activeNodes.filter(node=>{return node.id === nodeInfo.id})[0]
        toAdd.data.className = 'inSelection'
        console.log('selected nodes are: ', debug(state.nodes.selectedNodes));
        if (state.selectedNodes.includes(toAdd)) {
          console.log('selected nodes already includes: ', nodeInfo);
          state.nodes.selectedNodes = state.nodes.selectedNodes.filter( ( el ) => !state.selectedNodes.includes( el ) );
        } else {
          state.selectedNodes.push(toAdd)
        console.log('adding node to selection: ', nodeInfo);
        }
      }),
      duplicateNode: action((state, source)=>{
        console.log('source is: ', source);
          const toDuplicate =  state.nodes.activeNodes.filter(node => {
            return node.id === source.id
          })
          console.log(debug(toDuplicate));
          console.log('active node are: ', debug(state.nodes.activeNodes));
          const duplicateNode = JSON.parse(JSON.stringify(toDuplicate))[0];
          console.log('duplicate node is?: ', debug(duplicateNode));
          duplicateNode.id = `${state.nodes.activeNodes.length+1}`

          console.log('changed cupilcate is : ', duplicateNode);
          // duplicateNode.position = toDuplicate.position
          state.nodes.activeNodes.push(duplicateNode)
          state.nodes.activeNodes.forEach((item, i) => {
            if (item.id  !== duplicateNode.id) {
              item.data.className = 'baseClass'
              console.log('item in loop is: ', debug(item));
            }
          });
      }),
      deleteActiveNode: action((state, selectedNodes)=>{
        console.log('selected nodes are :', selectedNodes);
        const selectedIds = selectedNodes.map(node=>node.id)
        const activeIds = state.nodes.activeNodes.map(n=>n.id)
        state.nodes.activeNodes = state.nodes.activeNodes.filter(function(obj){return !selectedIds.includes(obj.id)})
      }),
      showRack: true,
      nodeView: {
        backgroundVisible: true,
        seeThrough: false,
        addToRackMode: false,
        nodeViewActions: {
        },
        setBackgroundVisibility: action((state)=>{
          console.log('state here is: ', debug(state));
          state.backgroundVisible = !state.backgroundVisible
          console.log('succesfully set view mode to: ', debug(state.backgroundVisible));
        }),
        setSeeThroughView: action((state)=>{
          console.log('state here is: ', debug(state));
          state.seeThrough = !state.seeThrough
          console.log('succesfully set view mode to: ', debug(state.seeThrough));
        }),
        setAddToRackMode: action((state)=>{
          console.log('state here is: ', debug(state));
          state.addToRackMode = !state.addToRackMode
          console.log('succesfully set view mode to: ', debug(state.seeThrough));
        }),
        setNodeViewProp: action((state, prop)=>{
          console.log('state here is: ', debug(state));
          state[prop] = !state.[prop]
          console.log('succesfully set view mode to: ', debug(state[prop]));
        }),

      },
      nodes: {
        activeNodes: [
           {
             id: '0',
             type: 'listNode',
             position: {
               x: 200,
               y: 200
             },
             data: {
               inRack: false,
               inRackView: false,
               className: 'baseClass'
             }
           },
           {
             id: '1',
             type: 'listNode',
             position: {
               x: 489,
               y: 176
             },
             data: {
               inRack: false,
               inRackView: false,
               className: 'baseClass'
             }
           },
           {
             id: '2',
             type: 'listNode',

             position: {
               x: 580,
               y: 176
             },
             data: {
               className: 'baseClass',
               inRackView: false,
               inRack: false,
             }
           },
           {
             id: '3',
             type: 'mathNode',
             position: {
               x: 300,
               y: 300
             },
             data: {
               className: 'baseClass',
               inRackView: false,
               inRack: false,
             }
           }
        ],
        rackNodes: [
          {
            id: '0',
            type: 'listNode',
            position: {
              x: 200,
              y: 200
            },
            data: {
              inRack: true,
              inRackView: false,
              className: 'baseClass',
              rackSelected: false,
            }
          },
          {
            id: '1',
            type: 'listNode',
            position: {
              x: 489,
              y: 176
            },
            data: {
              inRack: true,
              inRackView: false,
              className: 'baseClass',
              rackSelected: false,
            }
          },
        ],
        selectedRackNodes: [],
        addNode: action((state, newNodeInfo)=>{
            // console.log('add a new ' + newNodeInfo + 'node')
            console.log('lenght of notdes is: ', debug(state.activeNodes.length));
            const newNode = {
              id : `${state.activeNodes.length}`,
              type: newNodeInfo.nodeType,
              position: {x: newNodeInfo.position[0], y: newNodeInfo.position[1]},
              data: {
                className: 'baseClass',
              }
            }
            console.log('new node is: ', newNode);
            state.activeNodes.push(newNode)
        }),
        addRackNode: action((state, newNodeInfo)=>{
            console.log('lenght of rack nodes is: ', debug(state.rackNodes.length));
            console.log('adding node to rack:', newNodeInfo);
            const nodeToAdd = state.activeNodes.filter(node=>node.id === newNodeInfo.id)[0]
            nodeToAdd.data.inRack = true;
            const newRackNode = nodeToAdd
            console.log('new node is: ', newRackNode);
            state.rackNodes.push(newRackNode)
        }),
        setSelectedRackNodes: action((state, rackNodeClick)=>{
            console.log('Adding To Selected Rack nodes: ', rackNodeClick.ni);
            console.log('Rack node click event: ', rackNodeClick.e);
            const node = rackNodeClick.ni
            const nodeToAdd = state.rackNodes.filter(n=>n.id === node.id)[0]
            console.log('node ot select is: ', debug(nodeToAdd));
            if (rackNodeClick.e.shiftKey) {
                console.log('shift selecting rack node');
                if (nodeToAdd.data.rackSelected) {
                  nodeToAdd.data.rackSelected = false
                  state.setSelectedRackNodes = state.rackNodes.filter(node=>node.id !== nodeToAdd.id)
                } else {
                  nodeToAdd.data.rackSelected = true
                  console.log('shift adding: ', nodeToAdd);
                  state.selectedRackNodes.push(nodeToAdd)
                }
            } else {
              state.rackNodes.forEach((n, i) => {
                console.log('for each lloop racknodes', debug(n));
                if (n.id !== nodeToAdd.id) {
                  n.data.rackSelected = false
                } else {
                  console.log('found matching id');
                  nodeToAdd.data.rackSelected = true
                }
              });
              console.log(debug(state.rackNodes));
              console.log(debug(state.selectedRackNodes));
              console.log(debug(nodeToAdd));
              state.selectedRackNodes = [nodeToAdd]
              console.log('selected rack nodes are: ', debug(state.selectedRackNodes));
            }
        }),
        deselectRackNodes: action((state, rackNodeClick)=>{
          // console.log('deselecting rack nodes');
          // state.rackNodes.forEach((n, i) => {
          //   n.data.rackSelected = false
          // });
          // state.selectedRackNodes = []
        }),
        deleteRackNodes: action((state)=>{
              console.log('deleting rack nodes: ', debug(state.selectedRackNodes));
              // state.rackNodes.forEach((n, i) => {
              //   console.log(n);
              //   console.log(n === state.selectedRackNodes[0]);
              //   console.log(n == state.selectedRackNodes[0]);
              // });
              console.log('id ot remove:', state.selectedRackNodes[0].id);
              // const toDelete = state.rackNodes.filter(obj=>{
                // return obj.id === state.selectedRackNodes[0].id
              // })

              const idToRemove = state.selectedRackNodes[0].id
              state.rackNodes = state.rackNodes.filter((n)=> n.id !== idToRemove )
              // state.rackNodes = state.rackNodes.filter( ( n ) => !state.selectedRackNodes.includes( n ) );
              // let newArray = []
              // state.rackNodes.forEach((n, i) => {
              //   if (!state.selectedRackNodes.includes(n)) {
              //     console.log('not included in selected should keep');
              //     newArray.push(n)
              //   }
              // });
              // state.rackNodes = newArray
              // console.log('now rack nodes are: ', state.rackNodes);
        }),
      },
    },

    panels:{

    modifiers: [
        {
          id: 'modifier 0',
          type: 'subdivision',
          index: 0,
          active: false,
          solo: false,
          nonSolo: false,
          component: <NewModifier/>,
          controls: {
            subdivValue0: 0,
            subdivValue1: 0,
            subdivValue2: 0
          }
        },
        {
          id: 'modifier 1',
          type: 'bend',
          index: 1,
          active: false,
          solo: false,
          nonSolo: false,
          component: <NewModifier/>
        }

      ],
    sources: [
        {
          id: 'source 1',
          type: 'Drawing',
          index: 0,
          active: true,
          solo: false,
          nonSolo: false,
          controls: {
            inEditMode: false,
          }
        },
        {
          id: 'source 0',
          type: 'Drawing',
          index: 1,
          active: true,
          solo: false,
          nonSolo: false,
          controls: {
            inEditMode: false,
          }
        }
      ],

    toggle: action((state, identifyingInformation)=>{
        console.log('nodeId is: ' + identifyingInformation.nodeId);
        var toModify = state[identifyingInformation.nodeId]
        console.log(debug(toModify))
        toModify.map(item =>{
          console.log('item in loop is ', debug(item))
          console.log(identifyingInformation.id, 'item id here')
          if (item.id === identifyingInformation.id){
            console.log('old active state is', item.active)
            item.active = !item.active
            console.log('new active state is', item.active)
          }
        })
      }),
    toggleEdit: action((state, identifyingInformation)=>{
          console.log('nodeId is: ' + identifyingInformation.nodeId);
          var toModify = state[identifyingInformation.nodeId]
          toModify.map(item =>{
            if (item.id === identifyingInformation.listItemId){
              console.log('old in edit mode state is', item.controls.inEditMode)
              item.controls.inEditMode = !item.controls.inEditMode
              console.log('new in edit mode state is', item.controls.inEditMode)
            }
          })
        }),
    toggleSolo: action((state, identifyingInformation)=>{
        console.log('nodeId is: ' + identifyingInformation.nodeId);
        var toModify = state[identifyingInformation.nodeId]
        console.log(debug(toModify))
        toModify.map(item =>{
          console.log('item in loop is ', debug(item))
          console.log(identifyingInformation.id, 'item id here')
          if (item.id === identifyingInformation.id){
            console.log('old solo state is', item.solo)
            item.solo = !item.solo
            item.nonSolo = !item.solo
            console.log('new solo state is', item.solo)
          } else {
              item.nonSolo = true
              console.log('should non solo item');
          }
        })
      }),
      toggleEdit: action((state, identifyingInformation)=>{
          console.log('nodeId is: ' + identifyingInformation.nodeId);
          var toModify = state[identifyingInformation.nodeId]
          toModify.map(item =>{
            if (item.id === identifyingInformation.listItemId){
              console.log('old in edit mode state is', item.controls.inEditMode)
              item.controls.inEditMode = !item.controls.inEditMode
              console.log('new in edit mode state is', item.controls.inEditMode)
            }
          })
        }),
    remove: action((state, indentification)=>{
          console.log(indentification.id)
          // console.log('state mods', state.modifiers)
          state[indentification.nodeId] = state[indentification.nodeId].filter((nodeListItem) => nodeListItem.id !== indentification.id)
      }),
    add: action((state, newObjInfo)=>{
        console.log('add a new ' + newObjInfo.newItem + 'modifier')
        // console.log('state mods', state.modifiers)
        var idPrefix = (newObjInfo.nodeId == 'sources' ? 'source' : (newObjInfo.nodeId == 'modifiers') ? 'modifier' : 'unkown nodeId')
        var defaultObj =
            {
                id: idPrefix + ' ' + state[newObjInfo.nodeId].length,
                type: newObjInfo.newItem,
                index: state[newObjInfo.nodeId].length,
                active: true,
            }
        state[newObjInfo.nodeId].push(defaultObj)
        console.log('');
    }),
    setParameter: action((state, newObjInfo)=>{
      console.log('nodeId: '+ newObjInfo.nodeId, 'listItemId: ' + newObjInfo.listItemId, 'controlVaueId: ' + newObjInfo.controlValueId);
      var nodeToGet = state[newObjInfo.nodeId]
      console.log(debug(nodeToGet));
      nodeToGet.map(item =>{
        console.log('item id is :', item.id, 'list item id is: ', newObjInfo.listItemId);
        if (item.id === newObjInfo.listItemId){
            item.controls[newObjInfo.controlValueId] = newObjInfo.controlValue
            console.log(newObjInfo.controlValue);
            console.log('got a match!!!');
        }
      })
    }),
    replaceNodeList: action((state, replaceInfo)=>{
      // console.log(debug(toReIndexInfo));
      console.log('replacing list for node: ', replaceInfo.nodeId);
      console.log('with array: ', replaceInfo.replacement);
      var nodeToGet = state[replaceInfo.nodeId]

      nodeToGet = replaceInfo.replacement
      // nodeToGet.map(item =>{
      //   // console.log('item id is :', item.id, 'list item id is: ', newObjInfo.listItemId);
      //   if (item.id === newObjInfo.listItemId){
      //       item.controls[newObjInfo.controlValueId] = newObjInfo.controlValue
      //       console.log(newObjInfo.controlValue);
      //       console.log('got a match!!!');
      //   }
      // })
    })
  },
  paper: {
    data: {

    },
    setPaperData: action((state, newPaperData)=>{

    }),
    addNewSourceLayer: action((state, newLayerInfo)=>{

    })

  }
});


ReactDOM.render(
  <Provider store = {store}>
    <StoreProvider store = {store}>
      <App />
    </StoreProvider>
  </Provider>
  , document.getElementById('root'))
registerServiceWorker()
