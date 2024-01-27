<script lang="ts">
	import SkeletonCard from "$lib/skeletoncard/SkeletonCard.svelte";

  export let qtdCard: number = 15
</script>

<div>
  <div class="skeletonCards">
    {#each Array(qtdCard).fill('', 0) as t}
        <SkeletonCard />
    {/each}
  </div>
  <div class="skeletonButtons">
    {#each Array(5).fill('', 0) as t}
      <span class="btn"></span>
    {/each}
  </div>
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

  .skeletonCards, .skeletonButtons {
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}

  .skeletonCards{
    margin: 0 0 20px 0;
  }

  .btn{
    display: block;
    width: 30px;
    height: 30px;
    animation: skeleton-loading 1s linear infinite alternate;
  }
</style>