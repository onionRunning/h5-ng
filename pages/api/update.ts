// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {randomRange} from '@/global/utils'
import type {NextApiRequest, NextApiResponse} from 'next'
import fs from 'fs'

type Data = {
  name: string
}

const writeFile = (str: any, path: string) => {
  console.error('执行3')
  const temp = JSON.stringify(str)
  console.info(temp, '----1222')
  fs.writeFileSync(path, `${temp}\n`)
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.info(req.body, '---pppp')
  if (req.body.name && req.body.component) {
    const params = {...req.body, id: req.body.name?.split('_')[1], create: new Date().getTime()}
    try {
      writeFile(params, `./public/component/${req.body.name}.ts`)
    } catch (error) {
      console.info(error, '--')
    }
    res.status(200).json(params)
  }
}
