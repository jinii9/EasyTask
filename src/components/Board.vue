<style scoped>
img {
    object-fit: contain;
}

.page-wrap {
    /* width: 100vh; */
    /* height: 100vh; */
    /* position: absolute; */
    /* margin: 0 auto; */
    background: #E5E5E5;
    padding: 19.4rem 0 19.4rem 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.work-item {

}
</style>

<template>
    <div class="page-wrap">

        <div class="work-item" v-for="w in works" :key="w.id">
            <WorkItem :item="w"/>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import WorkItem from './WorkItem.vue'
export default {
    components: {
        WorkItem
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            works: 'works'
        }),
    },
    created() {
        this.fetchData()
    },
    methods: {
        ...mapActions([
            'FETCH_WORKS'
        ]),
        fetchData() {
            this.FETCH_WORKS()
        },

    }
}

</script>



