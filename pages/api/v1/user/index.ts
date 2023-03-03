import type { NextApiRequest, NextApiResponse } from 'next'
import mariadb from '@/lib/mariadb'
import withCatch from '@/utils/withCatch'
import jwt from 'jsonwebtoken'

const post = async(req:NextApiRequest, res:NextApiResponse) => {
    const name = req.body.name.trim()
    const character = req.body.character.trim() as string

    if(!name) throw {code:400, message:'이름을 작성해주세요.'}
    if(name.length > 6) throw {code:400, message: '이름은 6자 이하로 작성해주세요.'}
    if(!character) throw {code:400, message:'캐릭터를 선택해주세요.'}
    
    const [char] = await mariadb(`SELECT id FROM characters WHERE name = ?`, [character])
    
    if(!char?.id) throw {code:400, message:'없는 캐릭터 입니다.'}

    await mariadb(`INSERT INTO members(name,c_id) VALUES (?,?)`,[name, char.id])

    const accessToken = jwt.sign({name, character},process.env.NEXT_SECRET_KEY??"",{expiresIn:'1h'})

    res.setHeader('Set-Cookie',[`accessToken=${accessToken}; max-age=3600; path=/; httpOnly;`])
    res.status(200).send(true)
}

const handler = (req:NextApiRequest, res:NextApiResponse) => {
    switch(req.method) {
        case 'POST': return post(req,res)
    }
}

export default withCatch(handler)