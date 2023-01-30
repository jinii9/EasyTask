<style scoped>
img {
    object-fit: contain;
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

    /*  */
    /* padding: 19.4rem 0 19.4rem 0; */

}
.left-wrap {
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
.state {
    width: 6.3rem;
    height: 2.8rem;
    text-align: center;
    line-height: 2.8rem;
    color: white;
    border-radius: 1.6rem;
    font-weight: 600;
    font-size: 1.2rem;
    background-color: #0A2540;
}
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
.dateText {
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 2.1rem;

    margin-left: 0.8rem;  
}
.right-wrap {
    margin-right: 2.4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    align-items: flex-end;

}
.remain {
    font-weight: 600;
    font-size: 1.4rem;
    color: #2260FF;
    line-height: 2.1rem;

    margin-bottom: 0.8rem;
}
</style>

<template>
    <div class="item-wrap">
        <div class="left-wrap">
                <div class="info-wrap">
                    <!-- <div>{{ itemCheck }}</div> -->
                    <div class="state" v-if="itemCheck.stateCheck==='before'">작업시작</div>
                    <div class="state" v-if="itemCheck.stateCheck==='ing'" :style="{backgroundColor: '#2260FF'}">작업중</div>
                    <div class="state" v-if="itemCheck.stateCheck==='after'" :style="{backgroundColor: '#797E9C'}">작업완료</div>

                    <div class="title">{{ item.name }}</div>
                </div>

                <div class="date-wrap">
                    <img src="../assets/images/bell.png">
                    <!-- 조건문 -->
                    <div class="dateText">{{ item.requestedTime }}</div>
                    <button @click="workCheck">test</button>
                </div>
        </div>
        
        <div class="right-wrap">
            <div v-if="itemCheck.stateCheck==='before'">
                <div class="remain">업무시작까지 {{  }}분 남았습니다</div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import {mapState, mapActions, mapMutations} from 'vuex'
import VueMoment from 'vue-moment'

Vue.use(VueMoment);

export default {
    props: {
        item: Object,
        itemCheck: Object,
    },
    data() {
        return {
            itemChecks: {},
            current: this.$moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        }
    },
    mounted() {
        this.handleBeforeTime()        
    },
    computed: {
        ...mapState({
            works: 'works',
            checks: 'checks'
        })
    },
    methods: {
        ...mapMutations([
            'SET_CHECKS'
        ]),
        handleBeforeTime() { // 업무시작까지 몇 분 남았는지 
            
        },
        workCheck() {
            this.SET_CHECKS({id:this.item.id, check:"ing"})
            // console.log("버튼 id 체크")
            // console.log(this.checks);
        }
    }
}
</script>