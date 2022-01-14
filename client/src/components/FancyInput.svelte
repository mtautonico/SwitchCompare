<div>
    <input type="text" style="border: 1px solid {borderColor};">
</div>

<script>
    import {onMount} from 'svelte';

    export let borderColor = "#FF0000";

    onMount(() => {
        console.log('FancyInput mounted');
    });

</script>

<style>
    input {
        padding: 5px;
        width: 100%;
    }
</style>