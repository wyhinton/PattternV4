import React from 'react';
import InputIcon from '@material-ui/icons/Input';
import BuildIcon from '@material-ui/icons/Build';
import CategoryIcon from '@material-ui/icons/Category';
import ReorderIcon from '@material-ui/icons/Reorder';

export const nodeMenu =
  {
  modifiers: {
    items: [
      {
        icon: <BuildIcon/>,
        label: 'Bend',
        nodeType: 'bendNode'

      },
      {
        icon: <BuildIcon/>,
        label: 'Subdivision',
        nodeType: 'subdivision',
      },
      {
        icon: <BuildIcon/>,
        label: 'Build',
        nodeType: 'build',
      },
      {
        icon: <BuildIcon/>,
        label: 'Twist',
        nodeType: 'build',
      },
      {
        icon: <BuildIcon/>,
        label: 'Curve',
        nodeType: 'build',
      },
      {
        icon: <BuildIcon/>,
        label: 'Curve',
        nodeType: 'build',
      },
    ],
    icon: <BuildIcon/>,
  },
  sources: {
      items: [
      {
        icon: <InputIcon/>,
        label: 'test node 1',
        nodeType: 'ViewNode'

      },
      {
        icon: <InputIcon/>,
        label: 'test node 2',
        nodeType: 'ViewNode',
      },
      {
        icon: <InputIcon/>,
        label: 'test node 3',
        nodeType: 'ViewNode',
      },
    ],
    icon: <InputIcon/>,
  },
  utils: {
    items: [
      {
        icon: <CategoryIcon/>,
        label: 'test node 1',
        nodeType: 'ViewNode'

      },
      {
        icon: <CategoryIcon/>,
        label: 'test node 2',
        nodeType: 'ViewNode',
      },
      {
        icon: <CategoryIcon/>,
        label: 'test node 3',
        nodeType: 'ViewNode',
      },
    ],
    icon: <CategoryIcon/>,
  },
  list: {
    items: [
    {
      icon: <ReorderIcon/>,
      label: 'test node 1',
      nodeType: 'ViewNode'

    },
    {
      icon: <ReorderIcon/>,
      label: 'test node 2',
      nodeType: 'ViewNode',
    },
    {
      icon: <ReorderIcon/>,
      label: 'test node 3',
      nodeType: 'ViewNode',
    },
  ],
  icon: <ReorderIcon/>
  },
}
