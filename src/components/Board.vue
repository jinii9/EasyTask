<style scoped>
img {
    object-fit: contain;
}

.page-wrap {
    width: 100%;
    height: 100%;
    background: #E5E5E5;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.work-item {
    /* background-color: red; */
    margin: 0 24rem 0 24rem;
}
.work-item-null {
    padding: 19.4rem 0 19.4rem 0;

}

</style>

<template>
    <div class="page-wrap" :class="{'work-item-null': works.length!==0}">
        <!-- <div class="work-item" v-for="w in works" :key="w.id" >
            <WorkItem :item="w" :itemCheck="checks[w.id]"/>
        </div> -->
        <div class="work-item" v-for="w in works" :key="w.id" >
            <WorkItem :item="w" :itemCheck="checks[w.id]"/>
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
            works: 'works',
            checks: 'checks',
        }),
    },
    created() {
        // console.log("test")
        // console.log(this.works)
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



