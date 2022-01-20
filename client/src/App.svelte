<script>
    import {onMount} from "svelte";

    let switches = [];

    function first_capital(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async function getSwitches() {
        await fetch("http://localhost:8000/api/switch")
            .then(response => response.json())
            .then(data => {
                switches = data.data;
                console.log(switches);
            })
            .catch((error) => {
                console.error(`Something went wrong while getting switch: ${error}`);
            });
        return switches;
    }

    let sortBy = {col: "id", ascending: true};

    $: sort_switches = (column) => {

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

        switches = switches.sort(sort);
    }

    onMount(async () => {
        await getSwitches();
        sort_switches("brand")
    });
</script>
<svelte:head>
    <title>Switch Compare</title>
</svelte:head>
<main>
    <table>
        <thead>
        <tr id="headers">
            <th on:click={sort_switches("brand")}>Brand</th>
            <th on:click={sort_switches("model")}>Model</th>
            <th on:click={sort_switches("type")}>Type</th>
            <th on:click={sort_switches("mount")}>Mount</th>
            <th on:click={sort_switches("operating_force")}>Operating Force</th>
            <th on:click={sort_switches("bottom_force")}>Bottom Force</th>
            <th on:click={sort_switches("actuation_distance")}>Actuation Distance</th>
            <th on:click={sort_switches("bottom_distance")}>Bottom Distance</th>
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

    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }

    #headers:hover {
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>