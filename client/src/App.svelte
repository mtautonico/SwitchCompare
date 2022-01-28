<script lang="ts">
    import {Router} from "@roxi/routify";
    import {routes} from "../.routify/routes";

    const config = {
        urlTransform: {
            remove: url => url.toLowerCase()
        }
    }

</script>

<main>
    <Router {routes}/>
</main>