<div class="card">
	<span class="title"></span>
	<span class="description"></span>
</div>

<style>
	@keyframes skeleton-loading {
		0% {
			background-color: hsl(200, 20%, 80%);
		}
		100% {
			background-color: hsl(200, 20%, 95%);
		}
	}

	.card {
		min-width: 327px;
		min-height: 250px;
		animation: skeleton-loading 1s linear infinite alternate;
		padding: 164px 32px 33px 32px;
	}

	.title {
		display: block;
		content: '';
		width: 100%;
		height: 30px;
		background-color: var(--color04);
		border-radius: 8px;
		margin: 0 0 7px 0;
	}

	.description {
		display: block;
		content: '';
		width: 100%;
		height: 16px;
		background-color: var(--color04);
		border-radius: 8px;
	}
</style>
