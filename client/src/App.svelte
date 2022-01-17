<script>
    import {onMount} from "svelte";

    export let name;

    let switches = [];

    async function getSwitch() {
        let result = await fetch("http://localhost:8000/api/switch/Kailh");
        let data = await result.json();
        switches = data.data;
        console.log(data);
    }

    function getSwitches() {
                fetch("http://localhost:8000/api/switch")
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            console.error(`Something went wrong while getting switch: ${error}`);
        });
    }


    onMount(async () => {
        await getSwitches();
    })

</script>

<main>
    <table>
        <thead>
        <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Type</th>
            <th>Mount</th>
            <th>Operating Force</th>
            <th>Bottom Force</th>
            <th>Actuation Distance</th>
            <th>Bottom Distance</th>
        </tr>
        </thead>
        <tbody>
        {#each switches as swtch}
            <tr>
                <td>{swtch.brand}</td>
                <td>{swtch.model}</td>
                <td>{swtch.type}</td>
                <td>{swtch.mount}</td>
                <td>{swtch.operating_force}g</td>
                <td>{swtch.bottom_force}g</td>
                <td>{swtch.actuation_distance}mm</td>
                <td>{swtch.bottom_distance}mm</td>
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
</style>