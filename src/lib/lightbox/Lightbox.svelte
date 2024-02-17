<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	export let srcImage: string;
	export let close: () => void;

	let dialogEl: HTMLDialogElement;

	onMount(() => {
		dialogEl.showModal();
    document.body.classList.add("hiddenScroll")

    return () => {
      document.body.classList.remove("hiddenScroll")
    }
	});

  onDestroy(() => {
    document.body.classList.remove("hiddenScroll")
  })

	function handleClose() {
		close();
		dialogEl.close();
	}
</script>

<dialog bind:this={dialogEl} in:fly={{ y: 200, duration: 1000 }} out:fade>
	<div>
    <button
      type="button"
      title="Close Lightbox"
      on:click={handleClose}
      on:keydown={(e) => {
        if (e.key === 'Enter' || e.key === '') handleClose();
      }}>CLOSE</button
    >
    <img src={srcImage} alt="" />
  </div>
</dialog>

<style>
  dialog{
    border: none;
    padding: 0 24px;
    margin: 0;
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
    background-color: transparent;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
  }

  img{
    display: block;
    max-width: 100%;
  }

  button{
    appearance: none;
    border: none;
    font-family: inherit;
    box-sizing: border-box;
    display: block;
    font-size: 14px;
    letter-spacing: 3px;
    font-weight: 700;
    background-color: transparent;
    color: var(--color05);
    margin: 0 0 33px auto;
    cursor: pointer;
  }

  button:is(:hover, :focus) {
    color: rgba(256, 256, 256, 0.25);
  }

  dialog::backdrop{
    background-color: rgba(0, 0, 0, 0.85);
  }

  dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}

	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

  :global(.hiddenScroll) {
    overflow-y: hidden;
  }
</style>
