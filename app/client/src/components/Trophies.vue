<template>
    <v-card>
                    <v-container fluid  style="max-height: 341px"
                        class="overflow-y-auto">
                    <h1 ><v-icon>emoji_events</v-icon>  Mes Trophies</h1>
                    {{game}}
                </v-container >
    </v-card>
           
</template>

<script>
import { mapState , mapActions } from 'vuex'

export default {
	name : 'Trophies',
	computed : {
		...mapState('appli',['LatLon','zoom']),
		...mapState('user',['allUsers','game'])
	},
}
</script>