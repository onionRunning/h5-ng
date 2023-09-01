export const getBlockStyle = (payload: any) => {
  const obj = {} as any
  if (payload.backgroundColor) {
    obj.backgroundColor = payload.backgroundColor
  }
  if (payload.height) {
    obj.height = payload.height
  }
  if (payload.width) {
    obj.width = payload.width
  }
  if (payload.display) {
    obj.display = payload.display
  }

  if (payload.displayStyle) {
    const keys = payload.displayStyle?.split(';')
    keys.forEach(element => {
      const key = element.split(':')[0]?.replaceAll('\n', '')?.replaceAll(' ', '')
      const val = element.split(':')[1]?.replaceAll('\n', '')?.replaceAll(' ', '')
      obj[key] = val
    })
  }

  if (payload.borderStyle) {
    const keys = payload.borderStyle?.split(';')
    keys.forEach(element => {
      const key = element.split(':')[0]?.replaceAll('\n', '')?.replaceAll(' ', '')
      const val = element.split(':')[1]?.replaceAll('\n', '')
      obj[key] = val
    })
  }
  if (payload.othStyle) {
    const keys = payload.othStyle?.split(';')
    // console.info(keys, 'keys-')
    keys.forEach(element => {
      const key = element.split(':')[0]?.replaceAll('\n', '')?.replaceAll(' ', '')
      const val = element.split(':')[1]?.replaceAll('\n', '')
      obj[key] = val
    })
  }
  // console.info(obj, 'payload-', payload)
  return obj
}

export const getPhStyle = (params: any) => {
  const obj = {} as any
  if (params.width) {
    obj.width = `${params.width}`
  }
  if (params.height) {
    obj.height = `${params.height}`
  }
  if (params.othStyle) {
    const keys = params.othStyle?.split(';')
    // console.info(keys, 'keys-')
    keys.forEach(element => {
      const key = element.split(':')[0]?.replaceAll('\n', '')
      const val = element.split(':')[1]?.replaceAll('\n', '')
      obj[key] = val
    })
  }
  // console.info(obj, 'obj------obj', params)
  return obj
}
