<script>
    export let switches;
    let keys = Object.keys(switches[0]);
    export let blacklist = ['id', 'image_source_url', 'image', 'brand_image'];
    console.log("Object:", switches);
    console.log("Keys", keys);
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

    export function format_name(string) {
        let string_list = [];
        string_list = string.split("_");
        return string_list.join(" ");
    }
</script>

<main>
    <table>
        <thead>
        <tr id="headers">
            {#each keys as key}
                {#if blacklist.includes(key) === false}
                    <th on:click={() => sort_item(key, switches)}>{format_name(key)}</th>
                {/if}
            {/each}
        </tr>
        </thead>
        <tbody id="switch_table">
        <tr>
            {#each switches as swtch}
                {#each keys as key}
                    {#if blacklist.includes(key) === false}
                        {#if swtch[key] === "pcb"}
                            <td>{swtch[key].toUpperCase()}</td>
                        {:else if key === "image_source"}
                            <td><a href="{swtch.image_source_url}" target="_blank">{swtch[key]}</a></td>
                        {:else}
                            <td>{swtch[key]}</td>
                        {/if}
                    {/if}
                {/each}
            {/each}
        </tr>
        </tbody>
    </table>
</main>

<style>
    table, th, td {
        border: 1px solid black;
        text-align: center;
        text-transform: capitalize;
    }
</style>