export function isEmpty (obj = {}) {
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      return false
    }
  }

  return true
}

export function isArray (arr) {
  return Array.isArray(arr)
}

export function isObject (obj) {
  return typeof obj === 'object'
}
