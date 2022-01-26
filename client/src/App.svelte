<script>
    import {onMount} from "svelte";
    import SwitchTable from "./components/SwitchTable.svelte";

    let switches = [];
    let brands = [];
    let selected_brand = null;
    $: selected_switches = [];

    function reset_selection() {
        selected_switches = [];
        selected_brand = null;
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

    $: select_brand = (switch_brand) => {
        selected_switches = [];
        for (let i = 0; i < switches.length; i++) {
            if (switches[i].brand === switch_brand) {
                selected_switches.push(switches[i]);
            }
        }
        console.log('Selected switches:', selected_switches);
    };


    onMount(async () => {
        // Get all switches from the API
        await fetch("/api/switch") // TODO: Change this to make it that it pulls the switches that it needs only.
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
    <!--  TODO: Change this to check if a brand is selected -->
    {#if selected_switches.length !== 0}
        <button id="backbutton" on:click={reset_selection}>Back?</button>
        <SwitchTable switches={selected_switches}/>
    {:else}
        {#each brands as brand}
            <div class="homepageOption" on:click={() => select_brand(brand.id)}>
                <img class="homepageImage" src={brand.logo} alt="">
                <span class="centered">{brand.name}</span>
            </div>
        {/each}
    {/if}
</main>

<style>
    #backbutton {
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

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