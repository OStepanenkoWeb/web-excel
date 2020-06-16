import {$} from '@core/domJob';
import {ExcelComponent} from '@core/ExcelComponent';
import {generateTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {
  buildMatrix,
  isCell,
  nextSelector,
  shouldResize} from '@/components/table/helpers'
import {TableController} from '@/components/table/TableController';

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
    })
    this.$on('formula:done', () => {
      this.tableController.current.setFocus()
    })
  }

  selectSell(cell) {
    this.tableController.select(cell)
    this.$emit('table:select', cell)
  }

  toHtml() {
    return generateTable()
  }

  onClick() {
    // pass
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
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
    this.$emit('table:input', $(event.target))
  }

  onMousemove() {
    // pass
  }

  onMouseup() {
    // pass
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
