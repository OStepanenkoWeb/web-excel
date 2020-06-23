import {storageHandler} from '@core/utils'
import {defaultStyles} from '@/constants'

export const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  currentText: '',
}

export const initialState = storageHandler('excel-column') || defaultState
