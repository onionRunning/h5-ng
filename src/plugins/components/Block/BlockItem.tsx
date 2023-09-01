import React, {useEffect, useState} from 'react'
import Block from '.'
import style from './index.module.css'
import {getPhStyle} from './utils'

function BlockItem(props: any) {
  // console.info(props, 'blockitem')
  const [typeItem, setItem] = useState<any>({})
  const {item, id, childrenId, index} = props

  useEffect(() => {
    if (id) {
      setItem({})
    }
  }, [id])
  // console.info(props, 'block------item')

  if (item?.name === 'ph') {
    const phStyle = props.item.chose
      ? {border: '1px dashed #f0f', ...getPhStyle(props.item.props)}
      : getPhStyle(props.item.props)
    return (
      <div
        className={style.ph}
        key={item.index}
        onClick={e => {
          e.stopPropagation()
          setItem({type: 'ph', idx: item.index})
          // console.info(props, 'props-=---')
          props?.updateProps?.({position: props.item.position, name: props.item.name})
        }}
        style={phStyle}>
        {props.item.props.text || 'ph'}
      </div>
    )
  }
  if (item?.name === 'img') {
    const imgStyle = props.item.chose
      ? {border: '1px dashed #00f', ...getPhStyle(props.item.props)}
      : getPhStyle(props.item.props)
    return (
      <img
        className={style.img}
        key={item.index}
        onClick={e => {
          e.stopPropagation()
          setItem({type: 'img', idx: item.index})
          props?.updateProps?.({position: props.item.position, name: props.item.name})
        }}
        src={props?.item?.props?.url || 'https://avatars.githubusercontent.com/u/7843281?s=40&v=4'}
        style={imgStyle}
      />
    )
  }
  if (item?.name === 'block') {
    // console.info(item, '------00000000000000000000')
    const blockStyle = props.item.chose
      ? {border: '1px dashed #00f', width: '100%', ...getPhStyle(props.item.props)}
      : {width: '100%', ...getPhStyle(props.item.props)}
    const pp = {...props, oth: {children: props.item.children}}
    return (
      <div
        className={style.btn}
        key={item.index}
        onClick={e => {
          e.stopPropagation()
          setItem({type: 'block', idx: item.index})
          // props?.updateProps?.()
          props?.updateProps?.({position: props.item.position, name: props.item.name})
        }}
        style={
          blockStyle?.flex
            ? {width: '100%', height: 'auto', flex: blockStyle?.flex}
            : {width: '100%', height: 'auto'}
        }>
        <Block {...pp} lastStyle={blockStyle} />
      </div>
    )
  }
  return (
    <div className={style.normal} key={item.index}>
      block
    </div>
  )
}

export default BlockItem
