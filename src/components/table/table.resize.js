import {$} from '@core/domJob';

export const resizeHandler = ($root, event) => {
  return new Promise(resolve=>{
    let newWidth
    let newHeight
    const $target = $(event.target)
    const typeElement = $target.data.resize
    const $parent = $target.closest('[data-type="resizable"]')
    const cell = $parent.getCoordinate()
    const setWidth = element => element.style.width = newWidth + 'px'
    const cellIndex = `[data-cellindex="${$parent.data.colindex}"]`


    document.onmousemove = e => {
      if (typeElement === 'col') {
        const delta = e.pageX - cell.right

        $target.css({opacity: 1, bottom: '-5000px'})
        newWidth = cell.width + delta
        $target.css({right: -delta + 'px'})
      } else {
        const delta = e.pageY - cell.bottom

        $target.css({opacity: 1, right: '-5000px'})
        newHeight = cell.height + delta
        $target.css({bottom: -delta + 'px'})
      }
    }
    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null

      if (typeElement==='col') {
        $parent.css({width: newWidth + 'px'})
        $root.findAll(cellIndex).forEach(setWidth)
      } else {
        $parent.css({height: newHeight + 'px'})
      }
      resolve( {
        value: typeElement === 'col' ? newWidth : newHeight,
        typeElement,
        id: typeElement === 'col' ?
            $parent.data.colindex :
            $parent.data.rowindex})
      $target.css({opacity: 0, bottom: 0, right: 0})
    }
  })
}
