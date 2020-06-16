class DomJob {
  constructor(selector) {
    this.$domEl = typeof selector === 'string' ?
        document.querySelector(selector) :
        selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$domEl.innerHTML = html

      return this
    }

    return this.$domEl.outerHTML.trim()
  }

  text(text) {
    if (typeof text === 'string') {
      this.$domEl.textContent = text

      return this
    }

    if (this.$domEl.tagName.toLowerCase() === 'input') {
      return this.$domEl.value.trim()
    }

    return this.$domEl.textContent.trim()
  }

  get data() {
    return this.$domEl.dataset
  }

  setFocus() {
    this.$domEl.focus()
    return this
  }

  getElementId() {
    this.data.id
    const [row, col] = this.data.id.split(':')

    return {
      row: +row,
      col: +col,
    }
  }

  addClass(className) {
    this.$domEl.classList.add(className)
    return this
  }

  removeClass(className) {
    this.$domEl.classList.remove(className)
    return this
  }

  find(selector) {
    return $(this.$domEl.querySelector(selector))
  }

  findAll(selector) {
    return this.$domEl.querySelectorAll(selector)
  }

  closest(selector) {
    return $(this.$domEl.closest(selector))
  }

  css(styles = {}) {
    Object.keys(styles).forEach(key => [
      this.$domEl.style[key] = styles[key],
    ])
  }

  clear() {
    this.html('')

    return this
  }

  getCoordinate() {
    return this.$domEl.getBoundingClientRect()
  }

  on(eventType, event) {
    this.$domEl.addEventListener(eventType, event)
  }

  remove(eventType, event) {
    this.$domEl.removeEventListener(eventType, event)
  }

  append(node) {
    if (node instanceof DomJob) {
      node = node.$domEl
    }
    if (Element.prototype.append) {
      this.$domEl.append(node)
    } else {
      this.$domEl.appendChild(node)
    }

    return this
  }
}

export function $(selector) {
  return new DomJob(selector)
}

$.create = (tagName, classes = '') => {
  const domElement = document.createElement(tagName)
  if (classes) {
    domElement.classList.add(classes)
  }

  return $(domElement)
}
