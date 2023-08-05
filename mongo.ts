import { encode, Hash } from 'https://deno.land/x/checksum@1.4.0/mod.ts'
import { MongoClient, ObjectId } from 'https://deno.land/x/mongo/mod.ts'

const MONGODB_URI = Deno.env.get('MONGODB_URI') ?? ''
const HOST_URI = Deno.env.get('HOST_URI') ?? ''

const client = new MongoClient()

await client.connect(
    MONGODB_URI,
)

interface UrlShortenerSchema {
    _id: ObjectId
    hash: string
    code: string
    url: string
    ts: Date
}

const db = client.database('github')
const coll = db.collection<UrlShortenerSchema>('url_shortener')


export const addUrlShortener = async (url: string) => {
    url = url.trim()
    if (!url.length) {
        return '链接不能为空'
    }
    const ts = new Date()
    const hash = new Hash('md5').digest(encode(url)).hex()
    const doc = {
        hash: hash,
        code: hash.substring(0, 5),
        url: url,
        ts: ts,
    }

    try {
        const result = await coll.findOne({ hash: doc.hash })
        if (!result) {
            // 表示不存在,则插入
            await coll.insertOne(doc)
        }
    } catch (e) {
        console.error(e)
        return '短链生成失败:' + e.toString()
    }
    return `${HOST_URI}/${doc.code}`
}


export const getUrlShortener = async (code: string) => {
    code = code.trim()
    if (!code.length) {
        return HOST_URI
    }
    try {
        const result = await coll.findOne({ code: code })
        if (result) {
            return result.url
        }
    } catch (e) {
        console.error(e)
    }
    return HOST_URI
}