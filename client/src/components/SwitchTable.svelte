<script>
    export let switches;
    let sortBy = {col: "id", ascending: true};
    $: sort_item = (column, target) => {
        if (sortBy.col === column) {
            sortBy.ascending = !sortBy.ascending
        } else {
            sortBy.col = column
            sortBy.ascending = true
        }

        // Modifier to sorting function for ascending or descending
        let sortModifier = (sortBy.ascending) ? 1 : -1;

        let sort = (a, b) =>
            (a[column] < b[column])
                ? -1 * sortModifier
                : (a[column] > b[column])
                    ? 1 * sortModifier
                    : 0;

        return target.sort(sort);
    }
    let first_capital = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
</script>

<main>
    <table>
        <thead>
        <!-- Todo: Make this automated -->
        <tr id="headers">
            <th on:click={() => sort_item("brand")}>Brand</th>
            <th on:click={() => sort_item("model")}>Model</th>
            <th on:click={() => sort_item("type")}>Type</th>
            <th on:click={() => sort_item("mount")}>Mount</th>
            <th on:click={() => sort_item("operating_force")}>Operating Force</th>
            <th on:click={() => sort_item("bottom_force")}>Bottom Force</th>
            <th on:click={() => sort_item("actuation_distance")}>Actuation Distance</th>
            <th on:click={() => sort_item("bottom_distance")}>Bottom Distance</th>
            <th>Image Source</th>
        </tr>
        </thead>
        <tbody id="switch_table">
        {#each switches as swtch}
            <tr>
                <td>{swtch.brand}</td>
                <td>{swtch.model}</td>
                <td>{first_capital(swtch.type)}</td>
                {#if swtch.mount === "pcb"}
                    <td>{swtch.mount.toUpperCase()}</td>
                {:else}
                    <td>{first_capital(swtch.mount)}</td>
                {/if}
                <td>{swtch.operating_force}g</td>
                <td>{swtch.bottom_force}g</td>
                <td>{swtch.actuation_distance}mm</td>
                <td>{swtch.bottom_distance}mm</td>
                <td><a href="{swtch.image_source_url}" target="_blank">{swtch.image_source}</a></td>
            </tr>
        {/each}
        </tbody>
    </table>
</main>

<style>
    table, th, td {
        border: 1px solid black;
    }
</style>