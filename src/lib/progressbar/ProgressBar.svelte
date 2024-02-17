<script lang="ts">
	export let min: number;
	export let max: number;
	export let value: number;

	function calculatePercentFill(min: number, max: number, value: number) {
		return (100 * (value - min)) / (max - min);
	}
</script>

<div
	role="progressbar"
	aria-label="Progresso do quiz"
	aria-valuenow={value}
	aria-valuemin={min}
	aria-valuemax={max}
>
	<span style="width: {calculatePercentFill(min, max, value)}%;"></span>
</div>

<style>
	div {
		height: 1px;
		background-color: var(--color03);
		overflow: hidden;
	}

	span {
		display: block;
		background-color: var(--color01);
		height: 100%;
		transition: width ease-in-out 0.3s;
	}
</style>
