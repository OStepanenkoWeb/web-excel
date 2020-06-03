/**
 * abstract class
 */
import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DomListener.')
    }
    this.$root = $root
    this.$listeners = listeners
  }

  initDomListeners() {
    this.$listeners.forEach( $listener => {
      const methodName = getMethodName($listener)

      methodError.call(this, this[methodName])
      this[methodName] = this[methodName].bind(this)
      this.$root.on($listener, this[methodName])
    })
  }

  removeDomListeners() {
    this.$listeners.forEach( $listener => {
      const methodName = getMethodName($listener)

      methodError.call(this, this[methodName])
      this.$root.remove($listener, this[methodName])
    })
  }
}

function methodError(method) {
  const {name} = this
  if (!method) {
    throw Error(
        `Method ${method} is not implemented in ${name} Component`
    )
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
