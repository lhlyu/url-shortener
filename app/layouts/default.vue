<template>
	<main>
		<slot></slot>
	</main>
</template>

<style scoped lang="scss">
main {
	position: fixed;
	inset: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: #ffffff;
	color: #111827;
	font-size: 1rem;
}
</style>