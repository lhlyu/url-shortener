<template>
	<article>
		<h1>您想分享什么？</h1>
		<p>快速创建短链接</p>
		<section>
			<div class="input">
				<input v-model="input" @keydown.enter="create" type="text" placeholder="在此输入您的网址或文本" maxlength="1024" />
				<button @click="create">
					<Link2Icon class="icon"></Link2Icon>
				</button>
			</div>
		</section>
		<section>
			<div class="input">
				<input v-model="output" type="text" readonly class="copy" />
				<button @click="copyOutput">
					<ClipboardCheckIcon class="icon" v-if="copied"></ClipboardCheckIcon>
					<CopyIcon class="icon" v-else></CopyIcon>
				</button>
			</div>
			<p>此短链接将在30天后清除</p>
		</section>
	</article>
</template>

<script lang="ts" setup>
import { Link2Icon, CopyIcon, ClipboardCheckIcon } from 'lucide-vue-next'

const { $csrfFetch } = useNuxtApp()

const input = ref('')
const output = ref('')

const create = async () => {
    input.value = input.value.trim()

    if (input.value === '') {
        output.value = ''
        return
    }

    const code = await $csrfFetch('/api/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: input.value,
        }),
    })

    output.value = location.href + code
}

const { copy, copied } = useClipboard({
    source: input,
    copiedDuring: 2000,
})

const copyOutput = async () => {
    if (output.value.trim().length) {
        await copy(output.value)
    }
}
</script>

<style scoped>
article {
	width: 90%;
	max-width: 42rem;
	margin: 0 auto;
	text-align: center;
	
	h1 {
		font-size: 2.25rem;
		line-height: 2.5rem;
		font-weight: bold;
		margin-bottom: 1rem;
	}
	
	p {
		color: #4b5563;
		margin-bottom: 2rem;
	}
	
	section {
		margin-bottom: 2rem;
		
		.input {
			position: relative;
			
			input {
				width: 100%;
				padding: 1rem 4rem 1rem 1rem;
				border: 1px solid #e5e7eb;
				border-radius: 0.5rem;
				transition: border-color ease-in-out .3s;
				
				&::placeholder {
					color: #9ca3af;
				}
				
				&:hover {
					border-color: #9ca3af;
				}
				
				&:focus {
					outline: 1px solid transparent;
					outline-offset: 1px;
					border-color: #9ca3af;
				}
			}
			
			.copy {
				background: #f9fafb;
			}
			
			button {
				position: absolute;
				top: 50%;
				right: 4%;
				transform: translateY(-50%);
				display: flex;
				align-items: center;
				gap: 0.5rem;
				color: #9ca3af;
				outline: none;
				border: none;
				background: transparent;
				
				.icon {
					width: 1.25rem;
					height: 1.25rem;
					cursor: pointer;
				}
			}
		}
		
		p {
			padding: 1rem 0;
			font-size: 0.875rem;
			line-height: 1.25rem;
			color: #6b7280;
		}
	}
}
</style>