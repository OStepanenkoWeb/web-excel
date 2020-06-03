import {DomListener} from '@core/DomListener';

/**
 * main class of components Excel
 */
export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
  }

  /**
   * Return template component
   * @return {string}
   */
  toHtml() {
    return ''
  }

  init() {
    this.initDomListeners()
  }

  destroy() {
    this.removeDomListeners()
  }
}
