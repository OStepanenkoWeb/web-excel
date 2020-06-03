import {ExcelComponent} from '@core/ExcelComponent';
import {generateTable} from '@/components/table/table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  toHtml() {
    return generateTable()
  }
}
