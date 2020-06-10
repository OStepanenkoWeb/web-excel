import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: [
        'input',
      ],
    });
  }

  toHtml() {
    return `
        <div class="excel__formula-info">
           Fx
        </div>
        <div 
        class="excel__formula-input" 
        contenteditable="true" 
        spellcheck="false">
        </div>
    `
  }

  removeDOMListeners() {
    // pass
  }

  onInput(event) {
    // pass
  }

  onClick(event) {
    // pass
  }
}
