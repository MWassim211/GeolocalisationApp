<template>
    <v-container fluid >
            <v-card xs12 md12 sd12>
                <v-card-title class="secondary white--text font-weight-light display-2 text-uppercase justify-center">
                    {{timer.formattedTime}} 
                </v-card-title>
            </v-card>    
    </v-container>
</template>

<script>
import {mapState} from 'vuex';
export default {
    name :'Timer',
    computed : {
        ...mapState('user',['timer'])
    }
}
</script>