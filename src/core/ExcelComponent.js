import {DomListener} from '@core/DomListener';

/**
 * main class of components Excel
 */
export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
    this.emitter = options.emitter
    this.store = options.store
    this.storeUnsub = null
    this.unsubscribes = []

    this.prepare()
  }

  /**
   * Return template component
   * @return {string}
   */
  toHtml() {
    return ''
  }

  /**
   * Init component.
   * Add Dom-listeners
   */
  init() {
    this.initDomListeners()
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  $subscribe(fn) {
    this.storeUnsub = this.store.subscribe(fn)
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribes.push(unsub)
  }

  /**
   * Delete component
   * Clear listeners
   */
  destroy() {
    this.removeDomListeners()
    this.unsubscribes.forEach(unsub => unsub())
    this.storeUnsub.unsubscribe()
  }

  /**
   * Settings component before init
   */
  prepare() {
  }

  storeChange() {}
}
