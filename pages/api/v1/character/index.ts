import type { NextApiRequest, NextApiResponse } from 'next'
import { CharType } from '@/interfaces'
import mariadb from '@/lib/mariadb'
import { addLog } from '@/utils/addLog'
import withCatch from '@/utils/withCatch'
import '../../../../extentions';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req
    if (method === 'POST') {
        const { id, name, head, body, face, head_width, head_y, body_width, body_y, face_width, face_y } = req.body

        if (!id || !id.isNumber()) throw { code: 400, message: '아이디(숫자)가 없습니다.' }
        if (!name) throw { code:400, message: '이름이 없습니다.' }
        if (!head_width.isNumber() || !head_y.isNumber() || !body_width.isNumber() || !body_y.isNumber() || !face_width.isNumber() || !face_y.isNumber()) throw { code: 400, message: 'width,y 값은 숫자로 작성해주세요.' }
        const baseurl = `https://lush.s3.ap-northeast-2.amazonaws.com/${name}/initial/`
        await mariadb('INSERT INTO characters(id, name, head, head_w, head_y, body, body_w, body_y, face, face_w, face_y) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [Number(id), name, head??baseurl+'head.svg', Number(head_width), Number(head_y), body??baseurl+'body.svg', Number(body_width), Number(body_y), face??baseurl+'face.svg', Number(face_width), Number(face_y)]);
        await addLog(req)
        res.status(200).send(true)
    }
}

export default withCatch(handler)