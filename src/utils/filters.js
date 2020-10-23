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

export function serialize (obj) {
  const str = []
  for (const p in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  }
  return str.join('&')
}
