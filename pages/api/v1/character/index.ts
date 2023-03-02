import type { NextApiRequest, NextApiResponse } from 'next'
import { CharType } from '@/interfaces'
import mariadb from '@/lib/mariadb'
import { addLog } from '@/utils/addLog'
import withCatch from '@/utils/withCatch'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req
    if (method === 'POST') {
        const { id, name, head, body, face, head_width, head_y, body_width, body_y, face_width, face_y } = req.body

        if(!id || !id.isNumber()) res.status(400).send({code:400, message:'아이디(숫자)가 없습니다.'})
        if (!name) res.status(400).send({ message: '이름이 없습니다.' })
        if (!head || !body || !face) res.status(400).send({code:400, message:'head,body,face는 필수값 입니다.'})
        if (!head_width.isNumber() || !head_y.isNumber() || !body_width.isNumber() || !body_y.isNumber() || !face_width.isNumber() || !face_y.isNumber()) res.status(400).send({code:400, message:'width,y 값은 숫자로 작성해주세요.'})


        const result:any = await mariadb('INSERT INTO characters(id, name, head, head_w, head_y, body, body_w, body_y, face, face_w, face_y) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',[parseInt(id),name, head, parseInt(head_width), parseInt(head_y), body, parseInt(body_width), parseInt(body_y), face, parseInt(face_width), parseInt(face_y)]);
        await addLog(req)
       if(result.affectedRows) res.status(200).send(true)
       throw {code:500, message:''}
    }
}

export default withCatch(handler)