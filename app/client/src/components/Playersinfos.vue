<template>
    
</template>

<script>
import { mapState } from 'vuex'

export default {
    name : 'Playersinfo',
    computed : {
        ...mapState('user', ['allUsers'])
    }
}
</script>