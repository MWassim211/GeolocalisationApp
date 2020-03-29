<template>
    <section>
        <h1>hello !!</h1>
        <position />
        <carte />
    </section>
</template>
<script>
import Position from './Position.vue'
import Carte from './Carte.vue'
export default {
    name : 'PosCate',
    components : {
        'position' : Position,
        'carte' :    Carte,
    },
    Created () {
        console.log("creation");
    },
    mounted() {
        console.log("webbpackkkkkkkkkkkkk")
        //import('../assets/js/bundle.js')
    }
}
</script>

<script>

</script>