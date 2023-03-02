import mysql from 'serverless-mysql';
const config = {
    host: process.env.NEXT_DB_HOST,
    port: +(process.env.NEXT_DB_PORT ?? 1230),
    database: process.env.NEXT_DB_DATABASE,
    user: process.env.NEXT_DB_USER,
    password: process.env.NEXT_DB_PASSWORD,
    multipleStatements: true,
}

const conn = mysql({ config })

export default async <T extends any[]>(query: string, value: any[] = []) => {
    try {
        const result = await conn.query<T>(query, value)
        return result
    } catch (err) {
        if ((err as any).errno === 45017) err = { code: 500, message: '값이 존재하지 않습니다' }
        else if ((err as any).errno === 1064) err = { code: 500, message: '파라미터에 문제가 있습니다' }
        else if ((err as any).errno === 1062) err = { code: 500, message: '이미 존재하는 값입니다' }

        throw err
    } finally {
        await conn.end()
    }
} 