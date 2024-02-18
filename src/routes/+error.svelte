<script lang="ts">
	import { page } from "$app/stores";
	import CircleExclamation from "$lib/icons/CircleExclamation.svelte";
</script>

<section>
  <span>
    <CircleExclamation size={125} />
  </span>
  <h1>{$page.status}</h1>
  <h2>Ops... An error has occurred</h2>
  <a href="/" target="_self" rel="next" title="Back Home">Home</a>
</section>

<style>
  span{
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color02);
  }

  section{
    height: calc(100vh - 103px);
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  h1{
    font-size: 24px;
    line-height: 29px;
    font-weight: 700;
    margin: 0;
    padding: 0;
  }

  h2{
    font-size: 15px;
    color: var(--color02);
    margin: 0;
    padding: 0;
  }

  a{
    display: block;
    text-decoration: none;
    color: var(--color05);
    font-size: 14px;
    letter-spacing: 2.57px;
    font-weight: 700;
    text-transform: uppercase;
    background-color: rgba(0, 0, 0, 0.75);
    padding: 14px 16px;
    border-radius: 4px;
  }

  a:is(:hover, :focus) {
    color: var(--color03);
  }
</style>


