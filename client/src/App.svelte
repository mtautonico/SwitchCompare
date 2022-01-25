<script>
    import {onMount} from "svelte";

    let switches = [];
    let brands = [];
    let selected_switches = [];

    // Capitalizes the first letter of a string
    let first_capital = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    $: select_switch = (switch_brand) => {
        for (let i = 0; i < switches.length; i++) {
            if (switches[i].brand === switch_brand) {
                selected_switches.push(switches[i]);
            }
        }
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
        // Get all switches from the API
        await fetch("/api/switch")
            .then(response => response.json())
            .then(data => {
                switches = data.data;
            })
            .catch((error) => {
                console.error(`Something went wrong while getting switch: ${error}`);
            });
        console.log("Switches", switches);
        // Get all brands from the API
        await fetch("/api/brand")
            .then(response => response.json())
            .then(data => {
                brands = data.data;
            })
            .catch((error) => {
                console.error(`Something went wrong while getting brand: ${error}`);
            });
        console.log("Brands", brands);
        // Calls the sort_switches function to sort the switches by brand once the component is mounted.
        sort_switches("brand");
    });
</script>
<svelte:head>
    <title>Switch Compare</title>
</svelte:head>
<main>
    {#each brands as brand}
        <div class="homepageOption" on:click={() => select_switch(brand)}>
            <span>{brand.name}</span>
            <img src={brand.logo} alt="">
        </div>
    {/each}
    <div>

    </div>
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

    .homepageOption {
        float: left;
        padding: 1em;
        margin: 1em;
        border-radius: 5px;
        font-size: 12pt;
        transition: all 0.3s ease-in-out;
    }

    .homepageOption:hover {
        background-color: #ff3e00;
        color: white;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>