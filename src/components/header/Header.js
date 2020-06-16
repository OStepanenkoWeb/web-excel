import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options,
    });
  }

  toHtml() {
    return `
    <input type="text" class="excel__header-input" value="New table"/>
    <div class="excel__header-buttons">
       <div class="button exit">
          <i class="material-icons">exit_to_app</i>
       </div>
          <div class="button del">
             <i class="material-icons">delete</i>
          </div>
       </div>
    `
  }
}
