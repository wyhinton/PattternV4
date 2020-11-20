import { TOGGLE_ITEM } from '../actions/types.js'

const initialState = {
  items: [],
  item: {}
}

export default function(state = initialState, action){
  switch(action.type){
      case TOGGLE_ITEM:
        return {
          ...state,
          panels: []

        }
      default:
        return state
  }
}
