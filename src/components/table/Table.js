import {$} from '@core/domJob';
import {ExcelComponent} from '@core/ExcelComponent';
import {generateTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {buildMatrix, isCell, shouldResize} from '@/components/table/helpers';
import {TableController} from '@/components/table/TableController';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: [
        'mousedown',
        'mouseup',
      ],
    });
  }

  prepare() {
    this.tableController = new TableController()
  }

  init() {
    super.init()
    const defaultSelectCell = this.$root.find('[data-id="0:0"')

    this.tableController.select(defaultSelectCell)
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
      console.log(targetEvent)

      if (event.shiftKey) {
        console.log(targetEvent)
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

  onMousemove() {
    // pass
  }

  onMouseup() {
    // pass
  }
}


