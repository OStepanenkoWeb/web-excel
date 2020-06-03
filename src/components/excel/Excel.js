import {$} from '@core/domJob';

export class Excel {
  constructor(selector, options) {
    this.$excelEl = $(selector)
    this.components = options.components || []
  }

  getRootNode() {
    const $rootNode = $.create('div', 'excel')

    this.components = this.components.map(Component => {
      const $node = $.create('div', Component.className)
      const component = new Component($node)

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
}
