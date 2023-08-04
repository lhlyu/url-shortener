import { Head } from '$fresh/runtime.ts'
import { PageProps } from '$fresh/src/server/types.ts'

export default async function Error404(props: PageProps) {
	let data: any = {}
	const code = props.url.toString().replace(props.url.origin + '/', '')
	console.log('code:', code, props.url.host)
	if (code.length === 5) {
		// 表示可能存在，查询数据库
		const resp = await fetch('/api/us?code=' + code)
		data = await resp.json()
		console.log('data:', data)
	}
	return (
		<>
			<Head>
				<title>404 - Page not found</title>
			</Head>
			<div>
				<h1>404 - { code }</h1>
				<pre><code>{JSON.stringify(data, null, 2)}</code></pre>
			</div>
		</>
	)
}
