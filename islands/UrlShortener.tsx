import { type Signal, signal } from '@preact/signals'

export default function UrlShortener() {
	const loading = signal(false)

	const url = signal('')
	const short = signal('')

	const inputUrl = (e: Event) => {
		const { value } = e.target as unknown as { value: string }
		url.value = value
	}

	const create = async () => {
		loading.value = true
		url.value = url.value.trim()
		if (!url.value.length) {
			short.value = ''
			loading.value = false
			return
		}
		const resp = await fetch('/api/us', {
			method: 'POST',
			body: JSON.stringify(url.value),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const data = await resp.text()
		console.log(data)
		short.value = data
		loading.value = false
	}

	return (
		<main>
			<header>短链生成</header>
			<section>
				<textarea
					disabled={loading}
					id='url'
					placeholder='链接'
					onInput={inputUrl}
				/>
				<input
					disabled={loading}
					id='gen'
					type='button'
					value='生成'
					onClick={create}
				/>
				<input
					disabled={loading}
					id='short'
					type='text'
					readonly
					placeholder='生成后的短链'
					value={short}
				/>
			</section>
		</main>
	)
}
