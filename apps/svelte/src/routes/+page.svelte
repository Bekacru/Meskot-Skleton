<script lang="ts">
    import { page } from '$app/stores';
    import { trpc } from '$lib/trpc/client';
    import type { Items } from '@meskot/db';  

    let greeting: Items[] | null  = null;
    let loading = false;
    let error = ""
    let name = ""
    let price = 0
    let qty = 0

    const query = trpc($page).item.all.createQuery()
    const m = trpc($page).item.create.createMutation({
        onError(error, variables, context) {
            console.log(error)
        },
    })
</script>

<h6>Loading data in<br /><code>+page.svelte</code></h6>

<a href="#load" role="button" class="secondary" aria-busy={loading}>Load</a>

<p>{greeting}</p>
<div>
  {#if $query.isLoading}
    Loading...
  {:else if $query.isError}
    {$query.error.message}
  {:else if $query.data}
    {JSON.stringify($query.data)}
  {/if}
  <input placeholder="Item Name" bind:value={name} />
  <input placeholder="Item Qty" bind:value={qty} />
  <input placeholder="Item Price" bind:value={price} />
  <button
    on:click={() =>
      $m.mutate({
        name: "Item1",
        qty: 1,
        price: 100,
      })}
  >
    {#if $m.isLoading}
      Adding...
    {:else}
      Add
    {/if}
  </button>
  <p>
    Mutation Error: {$m.error}
  </p>
  <p>
    QueryError: {$query.error}
  </p>
</div>
