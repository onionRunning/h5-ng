# H5 低代码生成器

## json数据结构

```json

[
    {
        id: ‘’， // 组件唯一id
        props: {

        }, //组件属性
        children: [
            {
                id: '',
                props: {},
                schema: {},
                fn: {
                    onClick: () => {}
                },
                children: [
                    {}
                ]
            }
        ], // 子元素
        schema: {

        }, // 组件可视化设置
        fn: {
            onClick: () => {}
        }, // 组件事件
    }
]
```

## 操作逻辑

```md
1. 左区组件区域
2. 中区组件预览区域
    - 可开启组件属性设置
    - 可移动组件位置/删除操作

3. 属性/方法设置区域
    - 属性设置
    - 方法设置

4. 点击预览查看预览效果

5. 点击保存生成文件夹, html + css + js ...
```

### 块级组件

```md
- 支持文本
- 支持图片

- 块级组件 支持块级嵌套


- 块级组件 内部支持拖拽更改顺序
- 块级组件 内部支持复制
- 块级组件 内部支持删除

```

### 添加在线组件入口 万物接可设置

## 目标

- 一键生成H5 移动端html代码

- RN/小程序 SDK编写， 可以用JSON直接生成配置
