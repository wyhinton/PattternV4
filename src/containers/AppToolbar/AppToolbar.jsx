import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import ContextButtons from './ContextButtons';
import { makeStyles  } from '@material-ui/core/styles';
import NodeGraphSelector from './NodeGraphSelector';
import ToolbarButton from './ToolbarButton';
import {useStoreState, useStoreActions} from 'easy-peasy';
import Select, { components } from 'react-select'
import AddNodeMenu from './AddNodeMenu';

const useStyles = makeStyles((theme)=>({
  appToolbar: {
    height: 20,
    width: '100%',
    backgroundColor: 'rgba(200,200,200)',
    position: 'absolute',
    top: 0,
    display: 'flex',
    left: '0%',
    padding: 4,
    borderBottom: '1px solid black',
    zIndex: 2000
  },
  modeGroup: {
    height: '100%',
    display: 'flex',
    width: '10%',
    marginLeft: 20,
    marginRight: 20,
    // position: 'absolute',
    // left: '30%'
  },
  contextGroup: {
    height: '100%',
    display: 'flex',
    width: '10%',
    position: 'absolute',
    right: '30%'
  },
  settingsGroup: {
    height: '100%',
    display: 'flex',
    width: '10%',
    position: 'absolute',
    right: '0%'
  }

}));


const AppToolbar = (props) => {
  const classes = useStyles();
  // const nodeTrees = useStoreState(state=>state.global.nodeTrees)
  // const handleTreeSelect = useStoreActions(actions=>actions.globa.setActiveTree)
  // const handleAddTree = useStoreActions(actions=>actions.global.addNodeTreeodeTree)

  const contextButtonSets =
    {
      node: [
        {
          tooltip: 'Toggle Canvas Visibility',
          iconClassName: 'visibility',
          onClick: props.setNodeViewProp,
          active: props.nodeView['backgroundVisible'],
          value: 'backgroundVisible'
        },
        {
          tooltip: 'See Through',
          iconClassName: 'flip_to_back',
          onClick: props.setNodeViewProp,
          active: props.nodeView['seeThrough'],
          value: 'seeThrough'
        },
        {
          tooltip: 'Add Nodes To Rack Tool',
          iconClassName: 'library_add',
          onClick: props.setNodeViewProp,
          active: props.nodeView['addToRackMode'],
          value: 'addToRackMode'
        },
        {
          tooltip: 'Add Nodes To Rack Tool',
          iconClassName: 'bug_report',
          onClick: props.setNodeViewProp,
          active: props.nodeView['debug'],
          value: 'debug'
        }
      ],
      canvas: [
        {
          tooltip: 'See Through',
          iconClassName: 'backup',
          onClick: props.setSeeThroughView,
        },
        {
          tooltip: 'See Through',
          iconClassName: 'backup',
          onClick: props.setSeeThroughView
        },
        ]
    }

  useEffect(()=>{
    console.log('context buttons are: ', contextButtonSets);
    console.log('app toolbar props: ', props);
  })


  return(
    <span className = {classes.appToolbar}>
      <div className = {classes.logo}>
        <strong>PATTERN V. 0.01</strong>
      </div>
      <button
        className = {classes.feedback}
        onClick = {props.setFeedbackView}
        >
          Feedback
      </button>
    <NodeGraphSelector/>
      <span className = {classes.modeGroup}>
        MODE:
        <ToolbarButton
          tooltip = {'node view'}
          iconClassName = {'share'}
          onClick  ={props.setNodeView}
          active = {props.viewMode === 'node'}
        />
        <ToolbarButton
          tooltip = {'Canvas View'}
          iconClassName = {'brush'}
          onClick  ={props.setCanvasView}
          active = {props.viewMode === 'canvas'}
        />
      </span>
      <AddNodeMenu/>
      {/*<span className = {classes.contextGroup}>
        <ToolbarButton
          tooltip = 'See Through'
          iconClassName = 'flip_to_back'
          onClick  ={props.setSeeThroughView}
        />
      </span>*/}
      <ContextButtons buttons = {(contextButtonSets[props.viewMode]) ? contextButtonSets[props.viewMode] : []}/>
      <span className = {classes.settingsGroup}>
        <ToolbarButton
          tooltip = {'Settings'}
          iconClassName = {'settings'}
          onClick  ={props.setSettingsView}
        />
        <ToolbarButton
          tooltip = {'Midi Mapping'}
          iconClassName = {'settings_input_svideo'}
          onClick  ={props.setMappingView}
        />
        <ToolbarButton
          tooltip = {'Export'}
          iconClassName = {'get_app'}
          onClick  ={props.setExportView}
        />
        <ToolbarButton
          tooltip = {'Help'}
          iconClassName = {'help_outline'}
          onClick  ={props.setExplanationView}
        />
        <ToolbarButton
          tooltip = {'Shortcuts'}
          iconClassName = {'keyboard'}
          onClick  ={props.setShortcutView}
        />
      </span>

    </span>
  )
}

export default AppToolbar
