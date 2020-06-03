const LITERS_CODE = { // ABC...Z
  A: 65,
  Z: 90,
}

const rowInfo = (info) => {
  return `<div class="row-info">${info}</div>`
}

const createRow = (content, info= '  ') => {
  const infoCell = rowInfo(info)

  return `
        <div class="row">
            ${infoCell}
            <div class="row-data">${content}</div>
        </div>
    `
}

const toCol = (col) => {
  return `<div class="column">${col}</div>`
}

const toCell = (_, i) => {
  return ` <div class="cell" contenteditable="true">${i}</div>`
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
    rows.push(createRow(createCell(i + 1, colsCount), i + 1))
  }

  return rows.join('')
}
