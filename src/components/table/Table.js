import {ExcelComponent} from '@core/ExcelComponent';
import {generateTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize} from '@/components/table/helpers';

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


  toHtml() {
    return generateTable()
  }

  onClick() {
    // pass
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    }
  }

  onMousemove() {
    // pass
  }

  onMouseup() {
    // pass
  }
}
