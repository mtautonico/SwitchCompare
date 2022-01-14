<div>
    <button on:click={() => {console.log(message)}}><slot /></button>
</div>

<script>
    export let message = "";
</script>

<style>
    button {
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 3px;
        color: #000;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        padding: 10px;
        text-transform: uppercase;
    }
</style>