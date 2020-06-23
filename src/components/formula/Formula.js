import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/domJob'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: [
        'input',
        'keydown',
      ],
      ...options,
    });
  }

  init() {
    super.init()
    this.inputFormula = this.$root.find('#input-formula')
    this.$on('table:select', cell => {
      this.inputFormula.text(cell.text())
    })
    this.$subscribe( state => {
      this.inputFormula.text(state.currentText)
    })
    // this.$on('table:input', cell => {
    //   this.inputFormula.text(cell.text())
    // })
  }

  toHtml() {
    return `
        <div class="excel__formula-info">
           Fx
        </div>
        <div
        id="input-formula"
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
    this.$emit('formula:input', $(event.target))
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }
}
