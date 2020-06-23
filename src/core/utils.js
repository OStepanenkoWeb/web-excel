export const capitalize = (string) => {
  if (typeof string !== 'string') {
    return ''
  }

  return string[0].toUpperCase() + string.slice(1)
}

export const storageHandler = (key, data = null) => {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export const camelToDashCase = (str) => {
  return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
}
