import cls from 'classnames'
import React, {useState, useRef, useEffect} from 'react'
import {Modal, Tooltip} from 'antd'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import {CloseOutlined, PlusOutlined} from '@ant-design/icons'
import {transformPageStyle} from '../../renderPage'
import {renderComponent} from './renderComponent'
import style from './index.module.scss'

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  border: 'none',
  background: isDragging ? '#fff' : 'transparent',
  ...draggableStyle,
})

const getListStyle = () => ({
  background: 'transparent',
  padding: 0,
  width: '100%',
})

const COMPONENT_COVER_WRAPPER_ID_PREFIX = 'ramiko_component_cover_wrapper_'

export const Preview: React.FC<any> = ({
  setting = null,
  components = [],
  mode = 'edit',
  onClosePreview,
  onSwap,
  onEdit,
  updateComponents,
  updateChildProps,
  childrenId,
  info,
}) => {
  const isEdit = mode === 'edit' || mode === 'editChild'
  const pageStyle = transformPageStyle({setting})
  delete pageStyle.minHeight
  delete pageStyle.height
  const ref = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const clickComponent = useRef<any>()

  useEffect(() => {
    if (info?.position?.length) {
      setCurrentIndex(info?.position[0])
    }
  }, [components])

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const el = ref.current
    const parent = el.parentNode as HTMLDivElement
    const timer = setTimeout(() => {
      parent.scrollTo(0, el.scrollHeight)
    }, 0)

    return () => {
      clearTimeout(timer)
    }
  }, [components])

  const handleSwap = (dragIndex, hoverIndex) => {
    onSwap(dragIndex, hoverIndex)
    setCurrentIndex(hoverIndex)
  }

  const onDragEnd = result => {
    if (!result.destination) {
      return
    }

    handleSwap(+result.source.index, +result.destination.index)
  }

  const addChildren = (type: string, i: any[]) => () => {
    updateComponents(type, i)
  }

  // 打开子组件弹窗
  const addChildComponent = () => () => {
    // console.info('six', i)
    // console.warn(info, 'info---')
    const modals = Modal.info({
      style: {left: 20, bottom: 20},
      title: '可选择下列子组件插入块级组件中',
      content: (
        <div className={style.confirm5e}>
          <div
            onClick={() => {
              addChildren('ph', info.position)()
              modals.destroy()
            }}>
            段落
          </div>
          <div
            onClick={() => {
              addChildren('img', info.position)()
              modals.destroy()
            }}>
            图片
          </div>
          <div
            onClick={() => {
              addChildren('block', info.position)()
              modals.destroy()
            }}>
            块级组件
          </div>
        </div>
      ),
      onOk: () => {
        //
      },
    })
  }

  const updateProps = (t: any) => {
    clickComponent.current = t
    updateChildProps(t)
  }

  const renderLeft = (data: any, level = 0) => {
    const temp = data?.children?.map(item => {
      return (
        <div
          className={style.margin}
          key={item.id}
          onClick={e => {
            e.stopPropagation()
            // console.warn(item, 'xxxxitem')
            onEdit(item.position[0])
            updateProps(item)
          }}>
          <span className={style.margin}>- {item.name}</span>
          {' '.repeat(item.position.length * 2)} {renderLeft(item, 1)}
        </div>
      )
    })
    return (
      <div>
        <div className={style.margin}>
          {level === 0 ? '- block' : ''}
          <div className={style.margin}>{temp}</div>
        </div>
      </div>
    )
  }

  // console.warn(clickComponent.current, 'components-------------------update', isEdit, info)
  return (
    <div className={cls(style.wrapper, isEdit ? false : style.isPreview)} onClick={onClosePreview}>
      <div
        className={cls(style.closePreviewWrapper, isEdit ? false : style.isPreview)}
        onClick={onClosePreview}>
        <CloseOutlined />
      </div>
      <div
        className={cls(style.contentWrapper, isEdit ? false : style.isPreview)}
        ref={ref}
        style={pageStyle}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(droppableProvided, droppableSnapshot) => (
              <div
                ref={droppableProvided.innerRef}
                style={getListStyle(droppableSnapshot.isDraggingOver)}>
                {components.map((component, index) => (
                  <Draggable
                    draggableId={component.id}
                    index={index}
                    key={`${component.id}_${index}`}>
                    {(draggableProvided, draggableSnapshot) => (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                        style={getItemStyle(
                          draggableSnapshot.isDragging,
                          draggableProvided.draggableProps.style
                        )}>
                        <div
                          className={cls(
                            style.componentWrapper,
                            isEdit ? style.isEdit : false,
                            currentIndex === index ? style.isActive : false
                          )}>
                          {isEdit && (
                            <>
                              <div
                                className={style.componentCoverWrapper}
                                // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                                id={COMPONENT_COVER_WRAPPER_ID_PREFIX + index}
                                onClick={() => {
                                  setCurrent(component)
                                  setCurrentIndex(index)
                                  onEdit(index)
                                }}>
                                {currentIndex === index ? (
                                  <div
                                    className={style.father}
                                    onClick={() => {
                                      setCurrentIndex(index)
                                      updateChildProps({position: [index]})
                                    }}>
                                    {renderLeft(component)}
                                  </div>
                                ) : null}
                                <div className={style.componentInstanceWrapper}>
                                  {renderComponent({
                                    component,
                                    isEdit,
                                    updateProps,
                                    id: `${component.id}_${index}`,
                                    childrenId,
                                  })}
                                </div>
                              </div>
                              {/* 组件操作 */}
                              {/* {console.error(mode, component, '----000')} */}
                              {(mode === 'edit' || clickComponent.current?.name === 'block') && (
                                <div className={style.toolboxWrapper}>
                                  <ul>
                                    {component.name === 'Block' && (
                                      <Tooltip placement="right" title="添加子组件">
                                        <li>
                                          <PlusOutlined onClick={addChildComponent()} />
                                        </li>
                                      </Tooltip>
                                    )}
                                  </ul>
                                </div>
                              )}
                            </>
                          )}
                          {/* <div className={style.componentInstanceWrapper}>
                            {renderComponent({component, isEdit})}
                          </div> */}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}
