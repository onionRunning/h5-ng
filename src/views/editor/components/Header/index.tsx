import React from 'react'
import {Button} from 'antd'
import style from './index.module.scss'
import {useRouter} from 'next/router'

interface IProps {
  loading: boolean
  updateInfo: {isUpdate: boolean; name: string}
  onPreview(): void
  onSave(): void
  onSaveNetComponent(): void
  leaveEdit?(): void
}

export const Header: React.FC<IProps> = ({
  loading,
  onPreview,
  onSave,
  onSaveNetComponent,
  updateInfo,
  leaveEdit,
}) => {
  const router = useRouter()

  return (
    <header className={style.wrapper}>
      <div className={style.logo} onClick={() => router.push('/lists')}>
        开发者在线H5组件
      </div>
      <div>
        {/* <ThemeToggle /> */}
        <Button onClick={onPreview} type="text">
          预览
        </Button>
        <Button loading={loading} onClick={onSave} type="primary">
          保存本地页面
        </Button>
        <Button loading={loading} onClick={onSaveNetComponent} type="primary">
          {updateInfo.isUpdate ? `更新组件-${updateInfo.name}` : '保存在线组件'}
        </Button>
        {updateInfo.isUpdate ? (
          <Button loading={loading} onClick={leaveEdit} type="primary">
            退出在线编辑状态
          </Button>
        ) : null}
      </div>
    </header>
  )
}
