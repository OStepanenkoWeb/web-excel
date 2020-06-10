const LITERS_CODE = { // ABC...Z
  A: 65,
  Z: 90,
}

const rowInfo = (info) => {
  const resizer = `<div class="row-resize" data-resize="row"></div>`

  return `<div class="row-info">
             ${info}
             ${info && resizer}
          </div>`
}

const createRow = (content, key, info= '') => {
  const infoCell = rowInfo(info)

  return `
        <div class="row" data-type="resizable" data-rowindex="${key}">
            ${infoCell}
            <div class="row-data">${content}</div>
        </div>
    `
}

const toCol = (col, index) => {
  return `<div class="column" data-type="resizable" data-colindex="${index}">
             ${col}
             <div class="col-resize" data-resize="col"></div>
          </div>`
}

const toCell = (_, index) => {
  return ` <div 
             class="cell" 
             contenteditable="true" 
             data-cellindex="${index}">${index}
        </div>`
}

const createCell = (content, col = 1) => {
  const cells = new Array(col).fill('')

  return cells.map(toCell).join('')
}


const toChar = (_, i) => String.fromCharCode(LITERS_CODE.A + i)

export function generateTable(rowsCount = 15) {
  const colsCount = LITERS_CODE.Z - LITERS_CODE.A + 1
  const rows = new Array(rowsCount)

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toCol)
      .join('')

  rows.push(createRow(cols))

  for (let i=0; i<rowsCount; i++) {
    rows.push(createRow(createCell(i + 1, colsCount), i, i + 1))
  }

  return rows.join('')
}
