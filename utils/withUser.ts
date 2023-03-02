import { NextApiRequest, NextApiResponse } from "next"
import jwt from 'jsonwebtoken'

const verifiy = (req:NextApiRequest, res:NextApiResponse) => {
    const {accessToken} = req.cookies

    if(!accessToken) throw {code:401, message:'인증 오류'}

    try {
        const payload =  jwt.verify(accessToken,process.env.NEXT_SECRET_KEY??'')
        if(!payload) throw {code:401, message:'인증 불가'}
    } catch {
        throw {code:401, message:'인증 불가'}
    }
}

const withUser = (handler:(req:NextApiRequest, res:NextApiResponse)=>any) => async(req:NextApiRequest,res:NextApiResponse) => {
    try {
        verifiy(req,res)
    } catch(err) {
        res.setHeader('Set-Cookie', [
            `accessToken=; max-age=-1; path=/; httpOnly;`,
            `refreshToken=; max-age=-1; path=/; httpOnly;`,
        ])
        res.status(401).send(err)
    }

    await handler(req,res)
}

export default withUser