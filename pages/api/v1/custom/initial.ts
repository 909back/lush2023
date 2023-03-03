import { CharType } from "@/interfaces"
import mariadb from "@/lib/mariadb"
import withCatch from "@/utils/withCatch"
import withUser from "@/utils/withUser"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const character = req.query.character as string
        const noCharacter = { code: 400, message: "캐릭터가 없습니다." }
        if (!character) throw noCharacter

        const [char] = await mariadb(`SELECT * FROM characters WHERE name=?`, [character])

        if (!char) throw noCharacter
        const list = [
            { order: 1, name: 'body', src: char.body, width: char.body_w, y: char.body_y },
            { order: 2, name: 'head', src: char.head, width: char.head_w, y: char.head_y },
            { order: 3, name: 'face', src: char.face, width: char.face_w, y: char.face_y },
        ]
        res.status(200).json(list)
    }
}

export default withCatch(withUser(handler))