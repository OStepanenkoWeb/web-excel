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
    addClass(element)
  }
  selectArea(elements) {
    this.dropSelected()
    this.selectedArea = [...elements]
    this.selectedArea.forEach(addClass)
  }
  dropSelected() {
    this.selectedArea.forEach(removeClass)
    this.selectedArea = []
    this.current = null
  }
}

function addClass(el) {
  return el.addClass(TableController.SELECTED)
}

function removeClass(el) {
  return el.removeClass(TableController.SELECTED)
}
