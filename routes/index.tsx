import { Head } from '$fresh/runtime.ts'
import { PageProps } from '$fresh/src/server/types.ts'
import UrlShortener from '../islands/UrlShortener.tsx'

export default function Home(props: PageProps) {
	return (
		<>
			<Head>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				/>
				<title>短链生成</title>
				<link rel='stylesheet' href='style.css' />
			</Head>
			<UrlShortener />
		</>
	)
}
