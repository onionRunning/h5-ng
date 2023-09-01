import {randomRange} from '@/global/utils'
import type {NextApiRequest, NextApiResponse} from 'next'
import fs from 'fs'

type Data = {
  name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.info(req.body, '---pppp')
  if (req.body.token) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    fs.readFile(`./public/component/${req.body.name}.ts`, 'utf-8', (err, result) => {
      if (err) {
        return console.log(`文件读取失败！${err.message}`)
      }
      console.log(`文件读取成功，内容是：${result}`)
      const params = {data: JSON.parse(JSON.parse(result).component), name: JSON.parse(result).name}
      res.status(200).json(params)
      return
    })
  }
}
