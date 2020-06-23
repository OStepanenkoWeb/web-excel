export class TableController {
  static SELECTED = 'selected'
  constructor() {
    this.selectedArea = []
    this.current = null
  }

  select(element) {
    this.dropSelected()
    this.current = element
    this.selectedArea.push(element)
    addClass(element.setFocus())
  }
  selectArea(elements) {
    this.dropSelected()
    this.selectedArea = [...elements]
    this.selectedArea.forEach(addClass)
  }
  get ids() {
    return this.selectedArea.map(el => el.getElementId())
  }
  dropSelected() {
    this.selectedArea.forEach(removeClass)
    this.selectedArea = []
    this.current = null
  }
  applyStyle(style) {
    this.selectedArea.forEach(cell => {
      cell.css(style)
    })
  }
}

function addClass(el) {
  return el.addClass(TableController.SELECTED)
}

function removeClass(el) {
  return el.removeClass(TableController.SELECTED)
}
