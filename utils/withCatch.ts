import { NextApiRequest, NextApiResponse } from "next";

const withCatch = (handler: (req:NextApiRequest, res:NextApiResponse) => any) => async(req:NextApiRequest,res:NextApiResponse) => {
    try {
        await handler(req,res)
    } catch (err:any) {
        console.log(err)
        res.status(err.code || 500).json(err)
    }
}   

export default withCatch