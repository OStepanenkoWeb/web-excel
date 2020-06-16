export const shouldResize = event => event.target.dataset.resize
export const isCell = (event) => event.target.dataset.type === 'cell'

export const range = (start, end) => {
  if (start > end) {
    [start, end] = [end, start]
  }

  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index)
}

export const buildMatrix = (first, end) => {
  const selectCols = range(first.col, end.col)
  const selectRows = range(first.row, end.row)

  return selectCols.reduce((acc, col) => {
    selectRows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

export const nextSelector = (key, {col, row}) => {
  const MIN_VALUE = 0

  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? row : row - 1
      break
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? col : col - 1
      break
    default:
      break
  }

  return `[data-id="${row}:${col}"]`
}
