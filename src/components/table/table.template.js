import {defaultStyles} from '@/constants'
import {camelToDashCase} from '@core/utils'

const LITERS_CODE = { // ABC...Z
  A: 65,
  Z: 90,
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 20

const getWidth = ({colState = {}}, index) => {
  return (colState[index] || DEFAULT_WIDTH) + 'px'
}

const getHeight = ({rowState = {}}, index) => {
  return (rowState[index] || DEFAULT_HEIGHT) + 'px'
}

const getWidthFrom = (state) => {
  return (col, index) => {
    return {
      col, index, width: getWidth(state, index),
    }
  }
}

const rowInfo = (info) => {
  const resizer = `<div class="row-resize" data-resize="row"></div>`

  return `<div class="row-info">
             ${info}
             ${info && resizer}
          </div>`
}

const createRow = (content = 0, key = 0, info= '', state ={}) => {
  const infoCell = rowInfo(info)
  const height = getHeight(state, key)

  return `
        <div 
        class="row" 
        data-type="resizable"
        style="height: ${height}"
        data-rowindex="${key}">
            ${infoCell}
            <div class="row-data">${content}</div>
        </div>
    `
}

const toCol = ({col, index, width}) => {
  return `<div 
            class="column" 
            data-type="resizable" 
            data-colindex="${index}" 
            style="width: ${width}">
             ${col}
             <div class="col-resize" data-resize="col"></div>
          </div>`
}

const toCell = (state, rowInd) => {
  return (_, colIndex) => {
    const id = `${rowInd}:${colIndex}`
    const width = getWidth(state, colIndex)
    const styles = Object.keys(defaultStyles)
        .map(key => `${camelToDashCase(key)}:${defaultStyles[key]}`).join(';')
    console.log(styles)
    const data = state.dataState[id] || ''
    return ` <div 
             class="cell" 
             contenteditable="true" 
             data-id="${id}"
             data-type="cell"
             style="${styles}; width: ${width}"
             data-cellindex="${colIndex}">${data}
        </div>`
  }
}

const createCell = (rowInd, col = 1, state) => {
  const cells = new Array(col).fill('')

  return cells.map(toCell(state, rowInd)).join('')
}

const toChar = (_, i) => String.fromCharCode(LITERS_CODE.A + i)

export function generateTable(rowsCount = 20, state = {}) {
  const colsCount = LITERS_CODE.Z - LITERS_CODE.A + 1
  const rows = new Array(rowsCount)

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(getWidthFrom(state))
      .map(toCol)
      .join('')

  rows.push(createRow(cols))

  for (let rowInd=0; rowInd<rowsCount; rowInd++) {
    const cell = createCell(rowInd, colsCount, state)
    rows.push(createRow(cell, rowInd, rowInd + 1, state))
  }

  return rows.join('')
}
