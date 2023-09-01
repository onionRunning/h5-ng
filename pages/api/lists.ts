import {randomRange} from '@/global/utils'
import type {NextApiRequest, NextApiResponse} from 'next'
import fs from 'fs'

type Data = {
  name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.info(req.body, '---pppp')
  if (req.body.token.includes('wc')) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    fs.readdir('./public/component', (err, files) => {
      if (err) {
        console.log('读取文件夹失败：', err)
      } else {
        console.log('文件夹中的内容：', files)
        const lists = files.map(item => item.split('.')[0])
        const params = {data: lists, name: '请求组件name'}
        res.status(200).json(params)
      }
    })
  }
}
