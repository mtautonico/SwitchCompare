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
        // Calls the sort_switches function to sort the switches by brand once the component is mounted;
        brands = sort_item("name", brands);
        console.log("Brands", brands);
    });
</script>
<svelte:head>
    <title>Switch Compare</title>
</svelte:head>
<main>
    {#each brands as brand}
        <div class="homepageOption" on:click={() => select_switch(brand)}>
            <img class="homepageImage" src={brand.logo} alt="">
            <span class="centered">{brand.name}</span>
        </div>
    {/each}
    <div>

    </div>
</main>

<style>
    .homepageOption {
        float: left;
        padding: 1em;
        margin: 1em;
        border-radius: 5px;
        transition: all 0.3s ease-in-out;
        position: relative;
    }

    .homepageImage {
        filter: blur(5px);
        -webkit-filter: blur(5px);
        width: 128px;
    }

    .centered {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: black;
        font-size: 24pt;
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
</style>