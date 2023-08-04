import { encode, Hash } from 'https://deno.land/x/checksum@1.4.0/mod.ts'
import { MongoClient, ObjectId } from 'https://deno.land/x/mongo/mod.ts'
import { HandlerContext, Handlers } from '$fresh/server.ts'

const MONGODB_URI = Deno.env.get('MONGODB_URI') ?? ''

const client = new MongoClient()

await client.connect(
	MONGODB_URI,
)

interface UrlShortenerSchema {
	_id: ObjectId
	hash: string
	code: string
	url: string
	ts: string
}

const db = client.database('github')
const coll = db.collection<UrlShortenerSchema>('url-shortener')

export const handler: Handlers<string | null> = {
	async GET(
		_: Request,
		_ctx: HandlerContext<string | null>,
	): Promise<Response> {
		const code = _ctx.params.code
		const result = await coll.findOne({ code: code })
		return new Response(JSON.stringify(result))
	},

	async POST(
		req: Request,
		_ctx: HandlerContext<string | null>,
	): Promise<Response> {
		const url = await req.json() as string
		const currentISODate = new Date().toISOString()
		const hash = new Hash('md5').digest(encode(url)).hex()
		const doc = {
			hash: hash,
			code: hash.substring(0, 5),
			url: url,
			ts: currentISODate,
		}

		const result = await coll.findOne({ hash: doc.hash })

		if (!result) {
			// 表示不存在,则插入
			await coll.insertOne(doc)
		}

		return new Response(JSON.stringify(doc))
	},
}
