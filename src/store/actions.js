import {
  APPLY_STYLE,
  CHANGE_CELL,
  CHANGE_TEXT,
  TABLE_RESIZE} from '@/store/types'

export const tableResize = (data) => {
  return {
    type: TABLE_RESIZE,
    data,
  }
}

export const changeText = (data) => {
  console.log(2)
  return {
    type: CHANGE_TEXT,
    data,
  }
}

export const changeStyles = (data) => {
  console.log(2)
  return {
    type: CHANGE_CELL,
    data,
  }
}

export const applyStiles = data => {
  console.log(data)
  return {
    type: APPLY_STYLE,
    data,
  }
}
