import React from 'react'
import clone from 'lodash/cloneDeep'
import {IComponent} from '../../../type'
import {renderEditorItem} from './renderEditorItem'
import styles from './index.module.scss'

interface IProps {
  oth: any
  mode: string
  component: IComponent | null
  componentIndex: number
  delComponent?(s: string[]): void
  onChange(props: Pick<IComponent, 'props'>, t?: any): void
}

export const PropsEditor: React.FC<IProps> = ({component, onChange, oth, delComponent}) => {
  if (!component) {
    // eslint-disable-next-line no-param-reassign
    component = {} as IComponent
  }

  const {schema = {}, props = {}} = component

  const handle = (key, newValue) => {
    const newProps = clone(props)
    newProps[key] = newValue

    onChange(newProps as Pick<IComponent, 'props'>, component)
  }

  const updateChild = () => {
    console.info(oth, '----oth', component.position)
    delComponent(component.position)
  }

  const renderDelete = () => {
    return (
      <li className={styles.delete} onClick={updateChild}>
        删除该组件
      </li>
    )
  }

  // console.info('--1--1-1-1-1-1-1--1', component)
  // console.info(oth, '====11111=====')
  return (
    <ul>
      {renderDelete()}
      {Object.keys(schema).map(key => {
        let value = props[key]
        if (key === 'id') {
          value = component.choseId
        }
        return <li key={key}>{renderEditorItem(key, value, schema[key], handle)}</li>
      })}
    </ul>
  )
}
