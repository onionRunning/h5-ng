import React, {useState, useMemo, useEffect} from 'react'
import cls from 'classnames'
import {CloseOutlined, RightOutlined} from '@ant-design/icons'
import {IComponent} from '../../type'
import {plugins} from '../../plugins'
import style from './index.module.scss'
import {queryComponent, queryLists} from '@/http/api'
import {createPreviewHtml} from '@/global/update'
import {Modal} from 'antd'

interface IProps {
  visible: boolean
  onOpen(): void
  onClose(): void
  onSelect(arg: IComponent): void
  addNetComponent?(s: any): void
  editNetComponent?(s: any, name: string): void
}

export const Pannel: React.FC<IProps> = ({
  visible,
  onSelect,
  onOpen,
  onClose,
  addNetComponent,
  editNetComponent,
}) => {
  const groups = plugins.components.getGroups()
  const [group, setGroup] = useState(groups[0])
  const [leftComponent, setLefts] = useState([...groups, '在线组件'])
  const [netLists, setNewLists] = useState([])
  const [modal, setModal] = useState({})
  const [netName, setNetName] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const getNetComponent = async () => {
    const res = await queryLists({token: '123456_wc'})
    console.info(res.data.data, '----')
    // setLefts([...groups, '在线组件'])
    const base = res.data.data?.map(i => i.split('.')[0])
    setNewLists(base)
    setNetName(base?.[0])
    getDetails(base?.[0])
  }

  useEffect(() => {
    if (group === '在线组件') {
      getNetComponent()
    }
  }, [group])

  const getDetails = async (name: string) => {
    const res = await queryComponent({token: '123456_wc', name})
    console.info(res.data, '000010101')
    setNetName(name)
    setModal({...modal, [name]: res.data.data})
  }

  const components = useMemo(() => {
    return (plugins.components.getObjsByGroup(group) || []).filter(Boolean)
  }, [group])

  const renderLists = () => {
    return components.map((Component, index) => {
      return (
        <li key={index}>
          <div className={style.componentItemWrapper}>
            <div
              className={style.componentItemCoverWrapper}
              onClick={e => {
                e.stopPropagation()
                e.preventDefault()
                onSelect({
                  name: Component.originName,
                  schema: Component.schema,
                  props: Component.defaultProps,
                  defaultProps: Component.defaultProps,
                  fns: Component.defaultFns,
                  defaultFns: Component.defaultFns,
                  choseId: undefined,
                  position: undefined,
                })
              }}
            />
            <div
              className={style.componentItemPreviewCoverWrapper}
              style={{backgroundColor: '#f2f2f2'}}>
              <Component {...Component.defaultProps} />
            </div>
          </div>
        </li>
      )
    })
  }

  const renderNetComponent = () => {
    return <div />
  }

  const handleCancel = () => {
    setIsOpen(false)
  }
  const handleOk = () => {
    handleCancel()
  }

  // 添加组件
  const addComponent = () => {
    addNetComponent(modal[netName])
    handleCancel()
  }
  // 编辑组件
  const editComponent = () => {
    //
    editNetComponent(modal[netName], netName)
    handleCancel()
  }

  console.info(modal, 'modal-')
  return (
    <div className={style.wrapper}>
      <h3>
        <span>添加组件</span>
        <CloseOutlined onClick={onClose} />
      </h3>
      <main>
        <div className={style.tabsWrapper}>
          <ul>
            {leftComponent.map(name => (
              <li
                className={cls(name === group ? style.isActive : false)}
                key={name}
                onClick={() => {
                  setGroup(name)
                  console.info(name, 'name')
                  if (name === '在线组件') {
                    setIsOpen(true)
                    getNetComponent()
                  }
                }}>
                {name}
              </li>
            ))}
          </ul>
        </div>
        <div className={style.componentsWrapper}>
          <ul>{group.includes('在线组件') ? renderNetComponent() : renderLists()}</ul>
        </div>
      </main>
      <div
        className={cls(style.openBtnWrapper, !visible ? style.isVisible : false)}
        onClick={onOpen}>
        <RightOutlined />
      </div>
      <Modal onCancel={handleCancel} onOk={handleOk} open={isOpen} width={800}>
        <div
          className={style.confirm5e}
          style={{display: 'flex', height: '600px', background: '#f2f2f2'}}>
          <div
            className={style.tabsWrapper}
            style={{width: '200px', backgroundColor: '#fff', overflowY: 'auto'}}>
            <ul>
              {netLists.map(name => (
                <li
                  className={cls(name === netName ? style.isActive : false)}
                  key={name}
                  onClick={() => {
                    getDetails(name)
                  }}
                  style={{textAlign: 'left', padding: '6px 12px', cursor: 'pointer'}}>
                  {name}
                </li>
              ))}
            </ul>
          </div>
          <div
            className={style.componentsWrapper}
            style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
            <div
              style={{
                height: '600px',
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: '#fff',
                width: '375px',
                position: 'relative',
              }}>
              <iframe
                className={style.previewContent}
                height={600}
                srcDoc={createPreviewHtml(modal[netName])}
                style={{height: '100%'}}
                width={375}
              />
              <div style={{position: 'absolute', right: '-70px', top: '20%'}}>
                <div onClick={addComponent} style={{padding: '4px', cursor: 'pointer'}}>
                  添加组件
                </div>
                <div onClick={editComponent} style={{padding: '4px', cursor: 'pointer'}}>
                  编辑组件
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
