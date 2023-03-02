import withCatch from "@/utils/withCatch"
import withUser from "@/utils/withUser"
import { NextApiRequest, NextApiResponse } from "next"
import { tabList } from "@/utils/data"
import mariadb from "@/lib/mariadb"
import { ApiData } from "@/interfaces"
import '../../../../extentions';

const post = async(req:NextApiRequest, res:NextApiResponse) => {
    const category = req.body.category as string
    const character = req.body.character as string
    const data = req.body.data
    if(!category || !tabList.find(item => item.value === category)) throw {code:400, message:'카테고리가 존재하지 않습니다.'}
    if(!character) throw {code:400, message:'캐릭터가 없습니다.'}
    if(!data || !data.src || !data.x || !data.y) throw {code:400, message:'data값이 존재하지 않거나 필수값이 없습니다.'}
    if(!data.width.isNumber()|| !data.x.isNumber() || !data.y.isNumber()) throw {code:400, message:'width 혹은 x,y값이 숫자가 아닙니다.'}

    const [char] = await mariadb(`SELECT id FROM characters WHERE name=?`,[character])
    if(!char?.id) throw {code:400, message:'캐릭터가 존재하지 않습니다.'}

    await mariadb(`INSERT ?s(name, src, width, x, y, c_id) VALUES (?,?,?,?,?,?)`,[category,data.name??'',data.src,data.width??0,data.x,data.y.char.id])

    res.status(200).send(true)
}
const get = async(req:NextApiRequest, res:NextApiResponse) => {
    const category = req.query.category as string
    const character = req.query.character as string
    
    if(!category.trim() || character.trim() ) throw {code:400, message:'카테고리 혹은 캐릭터가 없습니다.'}
    if(!tabList.find(item => item.value === category)) throw {code:400, message:'존재하지 않는 카테고리 입니다.'}

    const [char] = await mariadb(`SELECT id FROM characters WHERE name=?`,[character])
    if(!char?.id) throw {code:401, message: '존재하지 않는 캐릭터입니다.'}

    const [list] = await mariadb(`SELECT * FROM ?s WHERE c_id = ?`,[category,char.id])

    res.status(200).json({code:200,data:list})
}   

const handler = (req:NextApiRequest, res:NextApiResponse) => {
    switch(req.method) {
        case 'GET' : return get(req,res)
        case 'POST' : return post(req,res)
    }
}

export default withCatch(withUser(handler))