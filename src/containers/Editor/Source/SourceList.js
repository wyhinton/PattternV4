// import { subdivide } from './ModifierFunctions'
const sourceList = [
  {
    id: 1,
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
    id: 2,
    name: 'Drawing',
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
    name: 'Scrape',
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
        }
      ]
    }
  }
]

export default sourceList




//
// const sourceList = [
//   {
//     id: 1,
//     type: 'drawing',
//     sourceProperties: {
//       controls: [
//         {
//           type: 'slider',
//           name: 'levels',
//           min: 1,
//           max: 10,
//           default: 1,
//         },
//         {
//           type: 'button',
//           name: 'simple',
//           default: true
//         }
//       ]
//     }
//   },
//   {
//     id: 2,
//     type: 'noise',
//     sourceProperties: {
//       controls: [
//         {
//           type: 'slider',
//           name: 'levels',
//           min: 1,
//           max: 10,
//           default: 1,
//         },
//         {
//           type: 'button',
//           name: 'simple',
//           default: true
//         }
//       ]
//     }
//   },
//     {
//       id: 3,
//       type: 'scrape',
//       sourceProperties: {
//         controls: [
//           {
//             type: 'slider',
//             name: 'levels',
//             min: 1,
//             max: 10,
//             default: 1,
//           },
//           {
//             type: 'button',
//             name: 'simple',
//             default: true
//           }
//         ]
//       }
//   }
// ]
//
//
// export default sourceList
