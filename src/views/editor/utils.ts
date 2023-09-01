export const getTypeConfigs = (type: string) => {
  if (type === 'ph' || type === 'btn') {
    return {
      name: type,
      props: {
        id: type,
        height: '30px',
      },
      schema: {
        id: {
          title: '组件(段落)id',
          type: 'id',
        },
        text: {
          title: '组件(段落)内容',
          type: 'textarea',
        },
        height: {
          title: '组件高度',
          type: 'text',
        },
        width: {
          title: '组件宽度',
          type: 'text',
        },
        othStyle: {
          title: '段落样式',
          type: 'textarea',
        },
      },
    }
  }
  if (type === 'img') {
    return {
      name: type,
      props: {
        id: type,
        url: 'https://avatars.githubusercontent.com/u/7843281?s=40&v=4',
        width: '32px',
        height: '32px',
      },
      schema: {
        id: {
          title: '组件(图片)id',
          type: 'id',
        },
        url: {
          title: '图片地址',
          type: 'text',
        },
        height: {
          title: '组件高度',
          type: 'text',
        },
        width: {
          title: '组件宽度',
          type: 'text',
        },
        othStyle: {
          title: '图片样式',
          type: 'textarea',
        },
      },
    }
  }
  if (type === 'block') {
    return {
      name: type,
      props: {
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#fff',
        id: type,
        height: '30px',
      },
      schema: {
        id: {
          title: '嵌套块级组件id',
          type: 'id',
        },
        height: {
          title: '嵌套块级组件高度',
          type: 'text',
        },
        width: {
          title: '嵌套块级组件宽度',
          type: 'text',
        },
        othStyle: {
          title: '块级样式',
          type: 'textarea',
        },
      },
    }
  }
}
// 父节点为block 都需要标识选中状态
// position: [0, 1, 2, ...]
export const getExComponents = (components, position) => {
  if (position?.length) {
    let base = {...components[position[0]]}
    let id = `block-${position[0]}`
    position.forEach((item, index) => {
      if (index > 0) {
        if (base?.children?.length) {
          base = base?.children?.[item]
          id += `-${base?.name}-${item}`
        }
      }
    })
    // console.warn(base, '---- base')
    return {choseComponent: {...base, choseId: id}, components}
  }
  return {components}
}

export const getData = (data, pos, changeProps) => {
  const base = JSON.parse(JSON.stringify(data))
  function recursiveUpdate(arr, currentPos) {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i]
      const itemPos = item.position

      if (JSON.stringify(itemPos) === JSON.stringify(currentPos)) {
        // 找到了指定位置的对象
        item.props = {...item.props, ...changeProps}
        item.chose = true
      } else {
        item.chose = false
      }

      if (item.children) {
        // 在当前位置的子节点中继续递归查找
        recursiveUpdate(item.children, currentPos)
      }
    }
  }

  recursiveUpdate(base, pos)
  return base
}

export const insertData = (data, pos, newData) => {
  const newDataStructure = JSON.parse(JSON.stringify(data))

  // console.warn(data, pos, newData, 'fq666')
  function recursiveInsert(arr, currentPos) {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i]
      const itemPos = item.position

      if (JSON.stringify(itemPos) === JSON.stringify(currentPos)) {
        // 找到了指定位置的对象
        if (!item.children) {
          item.children = []
        }

        // 确定新对象的 position
        const newIndex = item.children.length // 新对象在 children 数组中的位置
        const nextPosition = currentPos.concat([newIndex])

        item.children.push({
          position: nextPosition,
          ...newData,
        })
        return
      }

      if (item.children) {
        // 在当前位置的子节点中继续递归查找
        recursiveInsert(item.children, currentPos)
      }
    }
  }

  recursiveInsert(newDataStructure, pos)
  // 深拷贝原数据以创建新的数据结构
  return newDataStructure // 返回新的数据结构
}

export const updateChose = (data, pos) => {
  const arr = JSON.parse(JSON.stringify(data))
  function recursiveUpdate(arr, currentPos) {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i]
      const itemPos = item.position

      if (JSON.stringify(itemPos) === JSON.stringify(currentPos)) {
        item.chose = true
      } else {
        item.chose = false
      }

      if (item.children) {
        recursiveUpdate(item.children, currentPos)
      }
    }
  }

  function setParentsChose(arr) {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i]

      if (item.children && item.children.some(child => child.chose)) {
        item.chose = true
      }

      if (item.children) {
        setParentsChose(item.children)
      }
    }
  }

  recursiveUpdate(arr, pos)
  setParentsChose(arr)

  return arr
}

export const delNodes = (components: any[], pos: number[]) => {
  console.info(components, '-components-', pos)
  if (pos?.length === 1) return components.filter((_, index) => index !== pos[0])
  return components.map(item => {
    if (item.children) {
      item.children = delChildNodes(item.children, pos)
    }
    return item
  })
}

const delChildNodes = (data: any[], pos: number[]) => {
  return data
    ?.map(item => {
      if (JSON.stringify(item.position) === JSON.stringify(pos)) {
        return null
      }
      return {...item, children: delChildNodes(item.children, pos)}
    })
    ?.filter(i => i)
}

export const updateComponentPosition = (data: any[]) => {
  return data?.map((item, index) => {
    return {
      ...item,
      position: [index],
      children: updateChildrenPosition(item.children, [index]),
    }
  })
}

const updateChildrenPosition = (data: any[], pos: number[]) => {
  return data?.map((item, index) => {
    return {
      ...item,
      position: [...pos, index],
      children: updateChildrenPosition(item.children, [...pos, index]),
    }
  })
}
