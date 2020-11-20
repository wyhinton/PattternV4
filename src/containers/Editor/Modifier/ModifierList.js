import { subdivide } from './ModifierFunctions'
const modifierList = [
  {
    id: 1,
    name: 'Subdivision',
    modifierProperties: {
      controls: [
        {
          type: 'slider',
          name: 'levels',
          min: 1,
          max: 10,
          default: 1,
        },
        {
          type: 'button',
          name: 'simple',
          default: true
        },
      ]
    }
  },
  {
    id: 2,
    name: 'Noise',
    modifierProperties: {
      controls: [
        {
          type: 'slider',
          name: 'levels',
          min: 1,
          max: 10,
          default: 1,
        },
        {
          type: 'button',
          name: 'simple',
          default: true
        },
      ]
    }
  },
  {
    id: 3,
    name: 'Color',
    modifierProperties: {
      controls: [
        {
          type: 'slider',
          name: 'levels',
          min: 1,
          max: 10,
          default: 1,
        },
        {
          type: 'button',
          name: 'simple',
          default: true
        },
      ]
    }
  },
  {
    id: 4,
    name: 'Tile',
    modifierProperties: {
      controls: [
        {
          type: 'slider',
          name: 'levels',
          min: 1,
          max: 10,
          default: 1,
        },
        {
          type: 'button',
          name: 'simple',
          default: true
        },
      ]
    }
  },
  {
    id: 5,
    name: 'Displace',
    modifierProperties: {
      controls: [
        {
          type: 'slider',
          name: 'levels',
          min: 1,
          max: 10,
          default: 1,
        },
        {
          type: 'button',
          name: 'simple',
          default: true
        },
      ]
    }
  },
  {
    id: 6,
    name: 'Bend',
    modifierProperties: {
      controls: [
        {
          type: 'slider',
          name: 'levels',
          min: 1,
          max: 10,
          default: 1,
        },
        {
          type: 'button',
          name: 'simple',
          default: true
        },
      ]
    }
  }

]

export default modifierList
