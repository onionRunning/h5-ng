import React, {useState} from 'react'
import style from './index.module.css'
import BlockItem from './BlockItem'
import {getBlockStyle} from './utils'

const Block = (props: any) => {
  // console.warn(props, '----block0000000000000000000000`')
  const [idxx, setItem] = useState(0)
  const updateItem = () => {
    setItem(t => t + 1)
    if (props.position?.length === 1) {
      props.updateProps({position: props.position})
    }
  }
  // console.info(idxx, '---123')
  const renderChildRen = () => {
    return (
      props?.oth?.children?.map((item, index) => {
        // console.error(item, '----render item')
        return (
          <BlockItem
            childrenId={props.childrenId}
            id={idxx}
            index={index}
            item={{...item, index}}
            key={index}
            updateProps={props.updateProps}
          />
        )
      }) || ' '
    )
  }

  return (
    <div
      className={style.block}
      onClick={updateItem}
      style={{...getBlockStyle(props), ...props?.lastStyle}}>
      {renderChildRen()}
    </div>
  )
}

export default Block

Block.defaultProps = {
  // backgroundColor: '#efefef',
  color: '#efefef',
  height: '30px',
}

Block.schema = {
  id: {
    title: '组件id(唯一)',
    type: 'id',
  },
  backgroundColor: {
    title: '背景色',
    type: 'color',
  },
  // display: {
  //   title: '布局',
  //   type: 'radio',
  //   options: ['block', 'flex', 'grid'],
  // },
  displayStyle: {
    title: '布局详情',
    type: 'textarea',
  },
  height: {
    title: '块高度',
    type: 'text',
  },
  width: {
    title: '块宽度',
    type: 'text',
  },
  borderStyle: {
    title: '边框',
    type: 'textarea',
  },
}
