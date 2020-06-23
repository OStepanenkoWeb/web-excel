import {
  APPLY_STYLE,
  CHANGE_CELL,
  CHANGE_TEXT,
  TABLE_RESIZE} from '@/store/types'

export function rootReducer(state, action = {}) {
  const {typeElement = ''} = action.data || {}
  const field = {
    'col': 'colState',
    'row': 'rowState',
  }
  const selectField = field[typeElement]
  switch (action.type) {
    case TABLE_RESIZE:
      return {...state, [field[typeElement]]: value(state, selectField, action)}
    case CHANGE_TEXT:
      console.log(action.data.value)
      return {
        ...state,
        currentText: action.data.value,
        dataState: value(state, 'dataState', action),
      }
    case CHANGE_CELL:
      console.log(action.data)
      return {
        ...state,
        currentStyles: action.data,
      }
    case APPLY_STYLE:
      return {
        ...state,
        stylesState:action
      }

    default:
      return state
  }
}

function value(state, selectField, action) {
  console.log(state, selectField, action)
  const val = state[selectField] || {}
  val[action.data.id] = action.data.value
  return val
}
