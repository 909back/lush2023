import { NextApiRequest } from "next";
import mariadb from "@/lib/mariadb";
import "../extentions";

export async function addLog(req:NextApiRequest){

const ip = req.headers['x-forwared-for'] || req.connection.remoteAddress
const realIp = req.headers['x-real-ip'] || req.headers['x-forwared-for'] || req.connection.remoteAddress
  await mariadb(`INSERT INTO logs(ip,real_ip,visited) VALUES (?,?,?)`,[ip, realIp, new Date().toFormat('YYYY-MM-DD HH:mm:ss')])
}