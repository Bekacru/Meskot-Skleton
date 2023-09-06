<script lang="ts">
    import { page } from '$app/stores';
    import { trpc } from '$lib/trpc/client';

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
<div>
  <div>
    {#if $query.isLoading}
    Loading...
    {:else if $query.isError}
      {$query.error.message}
    {:else if $query.data}
     <pre>
      {JSON.stringify($query.data)}
     </pre>
    {/if}
  </div>
  <div>
    <input placeholder="Item Name" bind:value={name} />
    <input placeholder="Item Qty" bind:value={qty} />
    <input placeholder="Item Price" bind:value={price} />
  </div>
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
