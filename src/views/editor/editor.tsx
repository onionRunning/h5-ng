/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React, {useRef, useState} from 'react'
import clone from 'lodash/clone'
import cls from 'classnames'
import {Mode, IComponent, IPageSetting} from './type'
import {Header} from './components/Header'
import {Pannel} from './components/Pannel'
import {Preview} from './components/Preview'
import {Editor as PropsEditor} from './components/Editor'
import style from './index.module.scss'
import {downloadHtml} from '@/global/utils'
import {
  delNodes,
  getData,
  getExComponents,
  getTypeConfigs,
  insertData,
  updateChose,
  updateComponentPosition,
} from './utils'
import {createPreviewHtml} from '@/global/update'
import {Input, Modal, message} from 'antd'
import {saveComponent, updateComponent, updateNetComponentApi} from '@/http/api'

interface IProps {
  components?: IComponent[]
}

export const Editor: React.FC<IProps> = ({components: defaultComponents = []}) => {
  const [, setCount] = useState<number>(-1)
  const unsafeUpdate = () => setCount(v => v + 1)
  const [loading, setLoading] = useState<boolean>(false)

  const [mode, setMode] = useState<Mode>('edit')
  const clickChild = useRef<any>({})
  const [isPre, setPre] = useState({isShow: false, content: ''})
  const [componentPannelVisible, setComponentPannelVisible] = useState<boolean>(true)
  const [propsEditorVisible, setPropsEditorVisible] = useState<boolean>(true)
  const [pageSetting, setPageSetting] = useState<IPageSetting>(Object.create(null))
  const [components, setComponents] = useState<IComponent[]>(defaultComponents)
  const [current, setCurrent] = useState<IComponent | null>(null)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [updateInfo, setUpdateInfo] = useState({isUpdate: false, name: ''})

  // 添加组件
  const addComponent = component => {
    clickChild.current = {
      ...component,
      id: `Block-${components.length}`,
      position: [components?.length],
      chose: true,
    }
    const temp = [
      ...components,
      {...component, id: `Block-${components.length}`, position: [components?.length]},
    ]
    const fin = updateChose(temp, [temp.length - 1])
    setComponents(fin)

    setMode('edit')
  }

  // 复制组件
  const copy = index => {
    setComponents(components => {
      const target = clone(components[index])
      target.props = target.defaultProps
      target.id = `${components.length}`
      target.fns = target.defaultFns
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      components.splice(index + 1, 0, target)
      return components
    })
    unsafeUpdate()
  }

  // 编辑当前组件 props
  const editCurrentComponentProps = (newProps, t) => {
    // console.info(newProps, '------t', t.position)
    const bb = clone(components)
    const newComponent = getData(bb, t.position, newProps)
    // console.error(newComponent, 'newComponents-')
    setComponents(newComponent)
    setPropsEditorVisible(true)
    unsafeUpdate()
  }

  // 交换两组件位置（拖拽）
  const swapComponent = (startIndex, endIndex) => {
    setComponents(components => {
      const [removed] = components.splice(startIndex, 1)
      components.splice(endIndex, 0, removed)
      return components
    })
    unsafeUpdate()
  }

  // 移动组件（向上或者向下）
  const moveComponent = (component, index, direction) => {
    if (direction === 'up') {
      if (index <= 0) {
        return [component, index]
      }
      setComponents(components => {
        const prev = components[index - 1]
        components.splice(index - 1, 2, component, prev)
        return components
      })
      unsafeUpdate()
      return [component, index - 1]
    }
    if (index >= components.length - 1) {
      return [component, index]
    }
    setComponents(components => {
      const next = components[index + 1]
      components.splice(index, 2, next, component)
      return components
    })
    unsafeUpdate()
    return [component, index + 1]
  }

  // 删除组件
  const deleteComponent = index => {
    setComponents(components => {
      components.splice(index, 1)
      return components
    })
    // 编辑器当前组件删除
    if (currentIndex === index && current) {
      setCurrent(null)
    }
    unsafeUpdate()
  }

  const save = () => {
    if (components.length === 0) {
      message.error('组件空空的，块去添加吧!')
      return
    }
    setLoading(true)
    downloadHtml(createPreviewHtml(components))
    setLoading(false)
  }

  const onPre = () => {
    // console.warn(JSON.stringify(components), '------------------>')
    setPre({isShow: true, content: createPreviewHtml(components)})
  }

  const updateComponents = (type, clickPosition) => {
    // console.warn(clickPosition, 'clickPosition-')
    // console.error(components, clickPosition, getTypeConfigs(type), 'ooo')
    const newComponents = insertData(components, clickPosition, getTypeConfigs(type))
    // console.error(newComponents, 'newComponents-')
    setComponents(updateChose([...newComponents], clickPosition))
  }

  // 更新块级组件 -> 子组件属性
  const updateChildProps = t => {
    console.warn(t.position, '-----点击触发')
    clickChild.current = t
    const temp = updateChose([...components], t.position)
    // console.info(temp, 'temp-')
    setComponents(temp)
    setMode('editChild')
    unsafeUpdate()
  }
  const delComponent = (pos: number[]) => {
    const temp = delNodes(JSON.parse(JSON.stringify(components)), pos)
    console.info(temp, '-opopopop')
    setComponents(temp)
  }

  const updateNetComponents = async () => {
    //
    const res = await updateNetComponentApi({
      name: updateInfo.name,
      component: JSON.stringify(components),
    })
    if (res.data) {
      message.success('更新成功!')
    }
  }

  const onSaveNetComponent = async () => {
    if (components.length === 0) {
      message.error('组件空空的，块去添加吧!')
      return
    }
    if (updateInfo.isUpdate) {
      updateNetComponents()
      return
    }
    let targetVal = ''
    const getVal = v => {
      targetVal = v.target.value
    }
    const modals = Modal.confirm({
      title: '输入组件昵称',
      cancelText: '取消',
      content: (
        <div className={style.confirm5e}>
          <Input onChange={getVal} placeholder="请输入组件昵称" />
        </div>
      ),
      onOk: async () => {
        //
        console.info(targetVal, 'targetVal-')
        const res = await saveComponent({name: targetVal, component: JSON.stringify(components)})
        const base = JSON.parse(res.data?.component)
        if (res.data) {
          message.success('保存成功!')
        }
        console.info(res, '---x-x-x--x-x', base)
        modals.destroy()
      },
      onCancel: () => {
        modals.destroy()
      },
    })
  }

  const leaveEdit = () => {
    setUpdateInfo({isUpdate: false, name: ''})
  }

  const {choseComponent} = getExComponents(components, clickChild.current?.position)
  // console.info(isPre.content, 'components123', current?.children?.[clickChild?.current?.currentId], '-------111')
  console.warn(choseComponent, components, '-fo')
  return (
    <div className={style.wrapper}>
      {/* 头部区域 */}
      <Header
        leaveEdit={leaveEdit}
        loading={loading}
        onPreview={() => onPre()}
        onSave={save}
        onSaveNetComponent={onSaveNetComponent}
        updateInfo={updateInfo}
      />
      <main>
        <div
          className={cls(
            style.pannelWrapper,
            style.left,
            componentPannelVisible ? style.isVisible : false
          )}>
          {/* 左侧组件区域 */}
          <Pannel
            addNetComponent={baseComponents => {
              // console.warn(updateComponentPosition([...components, ...baseComponents]), 'fq666')
              setComponents(updateComponentPosition([...components, ...baseComponents]))
            }}
            editNetComponent={(baseComponents, name) => {
              setComponents(updateComponentPosition(baseComponents))
              setUpdateInfo({isUpdate: true, name})
            }}
            onClose={() => setComponentPannelVisible(false)}
            onOpen={() => setComponentPannelVisible(true)}
            onSelect={component => {
              addComponent(component)
              setComponentPannelVisible(true)
            }}
            visible={componentPannelVisible}
          />
        </div>
        {/* 预览组件区 */}
        <Preview
          components={components}
          info={clickChild?.current}
          mode={mode}
          onClosePreview={() => setMode('edit')}
          onCopy={copy}
          onDelete={deleteComponent}
          onEdit={index => {
            setCurrent(components[index])
            setCurrentIndex(index)
            setPropsEditorVisible(true)
          }}
          onMove={moveComponent}
          onSwap={swapComponent}
          setting={pageSetting}
          updateChildProps={updateChildProps}
          updateComponents={updateComponents}
        />
        <div
          className={cls(
            style.pannelWrapper,
            style.right,
            current && propsEditorVisible ? style.isVisible : false
          )}>
          {/* 右边编辑区 */}
          {mode === 'edit' && (
            <PropsEditor
              component={choseComponent}
              componentIndex={currentIndex}
              delComponent={delComponent}
              onClose={() => setPropsEditorVisible(false)}
              onFunctionsChange={unsafeUpdate}
              onPropsChange={editCurrentComponentProps}
              onSettingChange={setting => {
                setPageSetting(setting)
                unsafeUpdate()
              }}
              setting={pageSetting}
            />
          )}
          {mode === 'editChild' && (
            <PropsEditor
              component={choseComponent}
              componentIndex={currentIndex}
              delComponent={delComponent}
              mode={mode}
              onClose={() => setPropsEditorVisible(false)}
              onFunctionsChange={unsafeUpdate}
              onPropsChange={editCurrentComponentProps}
              onSettingChange={setting => {
                setPageSetting(setting)
                unsafeUpdate()
              }}
              oth={{current, childId: clickChild.current.currentId}}
              setting={pageSetting}
            />
          )}
        </div>
      </main>

      {isPre.isShow && (
        <div className={style.preview}>
          {/* <div className={style.previewContent} dangerouslySetInnerHTML={{__html: isPre.content}} /> */}
          <iframe className={style.previewContent} srcDoc={isPre.content} />
          <div className={style.close} onClick={() => setPre({isShow: false, content: ''})}>
            关闭预览
          </div>
        </div>
      )}
    </div>
  )
}
