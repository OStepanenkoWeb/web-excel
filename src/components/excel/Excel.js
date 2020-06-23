import {$} from '@core/domJob';
import {Emmiter} from '@core/Emmiter'

export class Excel {
  constructor(selector, options) {
    this.$excelEl = $(selector)
    this.components = options.components || []
    this.store = options.store
    this.emitter = new Emmiter()
  }

  getRootNode() {
    const $rootNode = $.create('div', 'excel')
    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
    }

    this.components = this.components.map(Component => {
      const $node = $.create('div', Component.className)
      const component = new Component($node, componentOptions)

      $node.html(component.toHtml())
      $rootNode.append($node)

      return component
    })

    return $rootNode
  }

  render() {
    this.$excelEl.append(this.getRootNode())

    this.components.forEach(component => component.init())
  }

  destroy() {
    this.components.forEach(component => component.destroy())
  }
}
