<template>
	<article>
		<h1>404</h1>
		<p>没有找到资源</p>
		<section>
			<button @click="back">
				返回
			</button>
		</section>
	</article>
</template>

<script lang="ts" setup>
const back = () => {
    navigateTo('/')
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
		display: flex;
		justify-content: center;
		margin-bottom: 2rem;
		
		button {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			color: #4b5563;
			outline: none;
			background: transparent;
			padding: 0.5rem 4rem;
			border: 1px solid #e5e7eb;
			border-radius: 0.25rem;
			cursor: pointer;
			transition: border-color ease-in-out .3s;
			
			&:hover {
				border-color: #9ca3af;
			}
			
			&:focus {
				outline: 1px solid transparent;
				outline-offset: 1px;
				border-color: #9ca3af;
			}
		}
	}
}
</style>