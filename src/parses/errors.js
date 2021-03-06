export function parseErrors (errors) {
  const fieldError = {}
  let errorMethod = ''

  Object.keys(errors).forEach((method) => {
    errorMethod = method
    const errorField = errors[method].errors || errors[method]

    Object.keys(errorField).forEach((field) => {
      const error = errorField[field]

      if (typeof error === 'object' || typeof error === 'string') {
        fieldError[field] = error
      }

      if (Array.isArray(error)) {
        fieldError[field] = error.shift()
      }
    })
  })

  return { [errorMethod]: fieldError }
}
