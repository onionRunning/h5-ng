export const demo = [
  {
    name: 'Block',
    schema: {
      id: {title: '组件id(唯一)', type: 'id'},
      backgroundColor: {title: '背景色', type: 'color'},
      displayStyle: {title: '布局详情', type: 'textarea'},
      height: {title: '块高度', type: 'text'},
      width: {title: '块宽度', type: 'text'},
      borderStyle: {title: '边框', type: 'textarea'},
    },
    props: {color: '#efefef', height: '100%', displayStyle: 'margin-top: 20px;'},
    defaultProps: {color: '#efefef', height: '30px'},
    position: [0],
    id: 'Block-0',
    chose: true,
    children: [
      {
        position: [0, 0],
        name: 'block',
        props: {
          backgroundColor: '#fff',
          fontSize: 16,
          color: '#fff',
          id: 'block',
          height: '142px',
          width: 'calc(100% - 32px)',
          othStyle: 'margin: 0 auto;\nborder: 2px solid #9820C5;\nborder-radius: 10px;\n',
        },
        schema: {
          id: {title: '嵌套块级组件id', type: 'id'},
          height: {title: '嵌套块级组件高度', type: 'text'},
          width: {title: '嵌套块级组件宽度', type: 'text'},
          othStyle: {title: '块级样式', type: 'textarea'},
        },
        chose: false,
        children: [
          {
            position: [0, 0, 0],
            name: 'block',
            props: {
              backgroundColor: '#fff',
              fontSize: 16,
              color: '#fff',
              id: 'block',
              height: '30px',
              othStyle: 'background: #9820C5;\ndisplay: flex;\njustify-content: space-between;\n',
            },
            schema: {
              id: {title: '嵌套块级组件id', type: 'id'},
              height: {title: '嵌套块级组件高度', type: 'text'},
              width: {title: '嵌套块级组件宽度', type: 'text'},
              othStyle: {title: '块级样式', type: 'textarea'},
            },
            chose: false,
            children: [
              {
                position: [0, 0, 0, 0],
                name: 'ph',
                props: {
                  id: 'ph',
                  height: '30px',
                  othStyle:
                    'margin-left: 16px;\nfont-family: SF Pro;\nfont-size: 12px;\nfont-style: italic;\nfont-weight: 858;\nline-height: 30px;\ncolor: #fff;\nletter-spacing: 0em;\ntext-align: left;\n',
                  text: 'Extra 30G Cloud space',
                },
                schema: {
                  id: {title: '组件(段落)id', type: 'id'},
                  text: {title: '组件(段落)内容', type: 'textarea'},
                  height: {title: '组件高度', type: 'text'},
                  width: {title: '组件宽度', type: 'text'},
                  othStyle: {title: '段落样式', type: 'textarea'},
                },
                chose: false,
              },
              {
                position: [0, 0, 0, 1],
                name: 'ph',
                props: {
                  id: 'ph',
                  height: '30px',
                  othStyle:
                    'margin-right: 16px;\nfont-family: SF Pro;\nfont-size: 12px;\nfont-style: italic;\nfont-weight: 858;\nline-height: 30px;\nletter-spacing: 0em;\ntext-align: right;\ncolor: #fff;',
                  text: 'SAVE 58%',
                },
                schema: {
                  id: {title: '组件(段落)id', type: 'id'},
                  text: {title: '组件(段落)内容', type: 'textarea'},
                  height: {title: '组件高度', type: 'text'},
                  width: {title: '组件宽度', type: 'text'},
                  othStyle: {title: '段落样式', type: 'textarea'},
                },
                chose: false,
              },
            ],
          },
          {
            position: [0, 0, 1],
            name: 'block',
            props: {
              backgroundColor: '#fff',
              fontSize: 16,
              color: '#fff',
              id: 'block',
              height: '110px',
              othStyle: 'display: flex;\n',
              width: '100%',
            },
            schema: {
              id: {title: '嵌套块级组件id', type: 'id'},
              height: {title: '嵌套块级组件高度', type: 'text'},
              width: {title: '嵌套块级组件宽度', type: 'text'},
              othStyle: {title: '块级样式', type: 'textarea'},
            },
            chose: false,
            children: [
              {
                position: [0, 0, 1, 0],
                name: 'block',
                props: {
                  backgroundColor: '#fff',
                  fontSize: 16,
                  color: '#fff',
                  id: 'block',
                  height: '',
                  othStyle: 'flex: 1;\n\npadding-left: 10px;',
                  width: '',
                },
                schema: {
                  id: {title: '嵌套块级组件id', type: 'id'},
                  height: {title: '嵌套块级组件高度', type: 'text'},
                  width: {title: '嵌套块级组件宽度', type: 'text'},
                  othStyle: {title: '块级样式', type: 'textarea'},
                },
                chose: false,
                children: [
                  {
                    position: [0, 0, 1, 0, 0],
                    name: 'ph',
                    props: {
                      id: 'ph',
                      height: '30px',
                      othStyle:
                        'font-family: SF Pro;\nfont-size: 28px;\nfont-weight: 900;\nline-height: 33px;\nletter-spacing: 0em;\ntext-align: left;\ncolor: #2D2D2D;',
                      text: 'Yearly',
                    },
                    schema: {
                      id: {title: '组件(段落)id', type: 'id'},
                      text: {title: '组件(段落)内容', type: 'textarea'},
                      height: {title: '组件高度', type: 'text'},
                      width: {title: '组件宽度', type: 'text'},
                      othStyle: {title: '段落样式', type: 'textarea'},
                    },
                    chose: false,
                  },
                  {
                    position: [0, 0, 1, 0, 1],
                    name: 'ph',
                    props: {
                      id: 'ph',
                      height: '',
                      othStyle:
                        'font-family: SF Pro;\nfont-size: 12px;\nfont-weight: 860;\nletter-spacing: 0em;\ntext-align: left;\npadding: 2px 8px 2px 8px;\nborder-radius: 10px;\ngap: 10px;\nbackground: #DF8BFF;\nwidth: 120px;\nmargin: 6px 0;\ncolor: #fff;',
                      text: '3-day free trial',
                    },
                    schema: {
                      id: {title: '组件(段落)id', type: 'id'},
                      text: {title: '组件(段落)内容', type: 'textarea'},
                      height: {title: '组件高度', type: 'text'},
                      width: {title: '组件宽度', type: 'text'},
                      othStyle: {title: '段落样式', type: 'textarea'},
                    },
                    chose: false,
                  },
                  {
                    position: [0, 0, 1, 0, 2],
                    name: 'ph',
                    props: {
                      id: 'ph',
                      height: '18px',
                      text: '50G Cloud space',
                      othStyle:
                        'font-family: SF Pro;\nfont-size: 18px;\nfont-style: italic;\nfont-weight: 508;\nline-height: 21px;\nletter-spacing: 0em;\ntext-align: left;\ncolor: #929292;',
                    },
                    schema: {
                      id: {title: '组件(段落)id', type: 'id'},
                      text: {title: '组件(段落)内容', type: 'textarea'},
                      height: {title: '组件高度', type: 'text'},
                      width: {title: '组件宽度', type: 'text'},
                      othStyle: {title: '段落样式', type: 'textarea'},
                    },
                    chose: false,
                  },
                ],
              },
              {
                position: [0, 0, 1, 1],
                name: 'block',
                props: {
                  backgroundColor: '#fff',
                  fontSize: 16,
                  color: '#fff',
                  id: 'block',
                  height: '100%',
                  othStyle: 'flex: 1;',
                  width: '',
                },
                schema: {
                  id: {title: '嵌套块级组件id', type: 'id'},
                  height: {title: '嵌套块级组件高度', type: 'text'},
                  width: {title: '嵌套块级组件宽度', type: 'text'},
                  othStyle: {title: '块级样式', type: 'textarea'},
                },
                chose: false,
                children: [
                  {
                    position: [0, 0, 1, 1, 0],
                    name: 'ph',
                    props: {
                      id: 'ph',
                      height: '20px',
                      text: '$49.99/year',
                      othStyle:
                        'margin-top: 16px;\ntext-align: right;\npadding-right: 10px;\nfont-family: SF Pro;\nfont-size: 16px;\nfont-weight:  900;\nline-height: 20px;\nletter-spacing: 0em;\ncolor: #2D2D2D;\n',
                    },
                    schema: {
                      id: {title: '组件(段落)id', type: 'id'},
                      text: {title: '组件(段落)内容', type: 'textarea'},
                      height: {title: '组件高度', type: 'text'},
                      width: {title: '组件宽度', type: 'text'},
                      othStyle: {title: '段落样式', type: 'textarea'},
                    },
                    chose: false,
                  },
                  {
                    position: [0, 0, 1, 1, 1],
                    name: 'ph',
                    props: {
                      id: 'ph',
                      height: '20px',
                      text: '$4.16/month',
                      othStyle:
                        'margin-top: 4px;\ntext-align: right;\npadding-right: 10px;\nfont-family: SF Pro;\nfont-size: 12px;\nfont-weight: 400;\nline-height: 20px;\nletter-spacing: 0em;\ncolor: #929292;',
                    },
                    schema: {
                      id: {title: '组件(段落)id', type: 'id'},
                      text: {title: '组件(段落)内容', type: 'textarea'},
                      height: {title: '组件高度', type: 'text'},
                      width: {title: '组件宽度', type: 'text'},
                      othStyle: {title: '段落样式', type: 'textarea'},
                    },
                    chose: false,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]
