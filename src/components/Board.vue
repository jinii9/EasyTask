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
.item-wrap {
    /* margin: 0 auto; */
    width: 96rem;
    height: 10.8rem;
    margin-bottom: 2.4rem;
    display: flex;
    justify-content: space-between;
    
    background: #FFFFFF;
    border: 1px solid #EEEEEE;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
}

.right-wrap {
    /* --state-color: #000000; */
    /* background-color: var(--state-color); */

    margin-left: 2.4rem;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;

}
.info-wrap {
    display: flex;
}
/* .state {
    width: 6.3rem;
    height: 2.8rem;
    text-align: center;
    line-height: 2.8rem;
    background-color: black;

    color: white;
    border-radius: 1.6rem;
    font-weight: 600;
    font-size: 1.2rem;
} */
.title {
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 2.4rem;
    margin-left: 1.2rem;
}

.date-wrap {
    display: flex;
    margin-top: 1rem;
}
.date-text {
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 2.1rem;

    margin-left: 0.8rem;
}

.left-wrap {
    margin-right: 2.4rem;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;

}
.work-btn {
    width: 8rem;
    height: 2.9rem;
    background-color: #2260FF;
    color: white;
    border-radius: 0.4rem;
    text-align: center;
    line-height: 2.8rem;
    font-weight: 600;
    font-size: 1.4rem;
}
</style>

<template>
    <div class="page-wrap">
        <!-- <StyledHeader primary>안녕하신감</StyledHeader> -->

        <div class="item-wrap" v-for="w in works" :key="w.id">
                <div class="right-wrap">
                        <div class="info-wrap">
                            <State v-if="w.startTime===null" before>작업예정</State>
                            <State class="state" v-else-if="w.startTime!==null && w.endTime===null" ing>작업중</State>
                            <State class="state" v-else-if="w.endTime!==null" after>작업완료</State>

                            <div class="title">{{ w.name }}</div>
                        </div>
                        <div class="date-wrap">
                            <img src="../assets/images/bell.png">
                            <div class="date-text">{{ w.requestedTime }}</div>
                        </div>
                </div>

                <div class="left-wrap">
                    <div class="work-btn">
                        업무시작
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {State} from "../styled-components/Board"

export default {
    components: {
        State
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            works: 'works'
        }),
        customStyle () {
            
        }
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
        handleBefore() {
            
        }
    }
}

</script>



