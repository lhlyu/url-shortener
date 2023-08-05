import { createSignal, onMount } from 'solid-js'
import ClipboardJS from 'clipboard'
import './App.css'

function App() {
	const [inputUrl, setInputUrl] = createSignal('')
	const [outputUrl, setOutputUrl] = createSignal('')

	const [loading, setLoading] = createSignal(false)

	const onInputUrlHandler = (e: Event) => {
		setInputUrl((e.target as HTMLInputElement).value)
	}

	const createHandler = async () => {
		if (loading()) {
			return
		}
		setLoading(true)

		const url = inputUrl().trim()
		if (!url.length) {
			setInputUrl('')
			setLoading(false)
			return
		}

		try {
			const resp = await fetch('/create', {
				method: 'POST',
				body: JSON.stringify({
					url: url,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const data = await resp.json()
			setOutputUrl(data.url)
		} catch (e) {
			console.error(e)
			alert('发生了一些意外')
		}

		setLoading(false)
	}

	const outputHandler = async (e: Event) => {
		(e.target as HTMLInputElement).select()
	}

	onMount(() => {
		document.documentElement.style.setProperty(
			'--app-height',
			window.innerHeight + 'px',
		)
		new ClipboardJS('#output')
	})

	return (
		<>
			<main>
				<header>短链生成</header>
				<section>
					<textarea
						onInput={onInputUrlHandler}
						disabled={loading()}
						placeholder='链接'
					>
					</textarea>
					<input
						onClick={createHandler}
						disabled={loading()}
						type='button'
						value='生成'
					/>
					<input
						id='output'
						onClick={outputHandler}
						data-clipboard-text={outputUrl()}
						value={outputUrl()}
						disabled={loading()}
						type='text'
						readOnly
						placeholder='生成后的短链，点击复制'
					/>
				</section>
			</main>
		</>
	)
}

export default App
