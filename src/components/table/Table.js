import {$} from '@core/domJob'
import {ExcelComponent} from '@core/ExcelComponent'
import {generateTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {
  buildMatrix,
  isCell,
  nextSelector,
  shouldResize} from '@/components/table/helpers'
import {TableController} from '@/components/table/TableController'
import * as actions from '@/store/actions'
import {defaultStyles} from '@/constants'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: [
        'mousedown',
        'mouseup',
        'keydown',
        'input',
      ],
      ...options,
    })
  }

  prepare() {
    this.tableController = new TableController()
  }

  init() {
    super.init()
    const defaultSelectCell = this.$root.find('[data-id="0:0"')

    this.selectSell(defaultSelectCell)

    this.$on('formula:input', data => {
      this.tableController.current.text(data.text())
      this.updateTextInStore(data.text())
    })
    this.$on('formula:done', () => {
      this.tableController.current.setFocus()
    })
    this.$on('toolbar:button', value => {
      console.log(value)
      this.tableController.applyStyle(value)
      this.$dispatch(actions.applyStiles({
        value,
        ids: this.tableController.ids,
      }))
    })
  }

  selectSell(cell) {
    const styles = cell.getSylesByName(Object.keys(defaultStyles))
    this.tableController.select(cell)
    this.$emit('table:select', cell)
    console.log('Styles: ', styles)
    this.$dispatch(actions.changeStyles(styles))
  }

  toHtml() {
    return generateTable(20, this.store.getState())
  }

  onClick() {
    // pass
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.log(e.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const targetEvent = $(event.target)

      if (event.shiftKey) {
        const target = targetEvent.getElementId()
        const current = this.tableController.current.getElementId()
        const cells = buildMatrix(current, target)
            .map(id => this.$root
                .find(`[data-id="${id}"]`))

        this.tableController.selectArea(cells)
      } else {
        this.tableController.select(targetEvent)
      }
    }
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text())
    // this.$emit('table:input', $(event.target))
  }

  onMousemove() {
    // pass
  }

  onMouseup() {
    // pass
  }

  updateTextInStore(value) {
    const {col, row} = this.tableController.current.getElementId()
    const id = `${row}:${col}`

    this.$dispatch(actions.changeText({
      id,
      value,
    }))
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
    ]

    const {key} = event

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()

      const id = this.tableController.current.getElementId()
      const nextCell = this.$root.find(nextSelector(key, id))

      this.selectSell(nextCell)
    }
  }
}
