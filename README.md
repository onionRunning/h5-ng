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

### 添加在线组件入口 万物接可设置

## ROADMAP

- [X] 一键生成H5 移动端html代码

- [X] 在线组件可生成配置，一键使用

- [] 添加组件类型，表单/等等

- [] 直接拖拽树结构组件跨位置

- [] RN/小程序 SDK编写， 可以用JSON直接生成配置
