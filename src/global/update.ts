import {htmlTemplate} from './tempHtml'

const coms = [{id: '', name: '', props: {}, children: []}]

const getId = (position, name) => {
  if (position.length === 1) return `Block-${position[0]}`
  const temp = position.reduce((p, v) => `${p}-${v}`)
  return `Block-${temp}-${name}`
}

export const createPreviewHtml = (components: any[]) => {
  let baseHtml = ''
  let baseCss = ''
  // console.error(components, 'components')
  components?.forEach((component, index) => {
    const {position, name, props} = component
    if (component.name === 'Block') {
      baseHtml = `${baseHtml}${!baseHtml ? '' : ' '}<div id='${getId(position, name)}'>
  ${render(component.children)}
 </div>\n`

      baseCss = `${baseCss}${!baseCss ? '' : ' '}${getStyle(props, position, name)}\n${renderCss(
        component.children
      )}\n`
    }
  })

  // console.warn('\n', '\n', baseCss)
  return htmlTemplate(baseHtml, baseCss, '')
}

const render = (data: any[]) => {
  const temp = data?.map(item => {
    const {position, name} = item
    const empty = ' '.repeat(position.length)
    if (item.name === 'block') {
      return `${empty}<div id='${getId(position, name)}'>
  ${render(item?.children) || ''}
${empty}</div>        `
    }
    if (item.name === 'img') {
      return `${empty}  <img id='${getId(position, name)}' src='${item.props.url}'></img>`
    }
    if (item.name === 'ph') {
      return `${empty}<div id='${getId(position, name)}'>${item.props.text || ''}</div>`
    }
    return `<div class='Block-empty' />`
  })
  return temp?.join('\n') || ''
}

const renderCss = (data: any[]) => {
  const temp = data?.map(item => {
    const {position, name, props} = item
    if (item.name === 'block') {
      return `${getStyle(props, position, name)}\n${renderCss(item?.children) || ''}`
    }
    return `${getStyle(props, position, name)}`
  })
  return temp?.join('\n') || ''
}

const getStyle = (props, position, name) => {
  let str = 'width: 100%;\n height: auto;\n'
  Object.keys(props).forEach(key => {
    if (key === 'fontSize') {
      str += `  font-size: ${props[key]};\n`
    }
    if (['othStyle', 'borderStyle', 'displayStyle'].includes(key)) {
      str += `    ${props[key]}\n`
    }
    if (
      !['othStyle', 'borderStyle', 'displayStyle', 'id', 'fontSize', 'backgroundColor'].includes(
        key
      )
    ) {
      str += `    ${key}: ${props[key]};\n`
    }
  })
  return `#${getId(position, name)}{
${str}  }`
}

const a = [
  {
    name: 'Block',
    position: [0],
    props: {
      borderStyle: 'background: #fff;',
    },
    children: [
      {
        name: 'block',
        position: [0, 1],
        props: {
          borderStyle: 'background: #ff0;',
        },
        children: [
          {
            name: 'ph',
            position: [0, 1, 0],
            props: {
              borderStyle: 'color: #ff0;',
              text: 'hello',
            },
          },
          {
            name: 'img',
            position: [0, 1, 1],
            props: {
              width: 32,
              height: 32,
              url: 'https://avatars.githubusercontent.com/u/7843281?s=40&v=4',
            },
          },
        ],
      },
    ],
  },
]
