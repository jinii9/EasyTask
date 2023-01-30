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
.dateTextOver {
    color: #F10000
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
                    <div class="dateText" :class="{'dateTextOver': beforeTime==='over'}">{{ item.requestedTime }}</div>
                    <button @click="workCheck">test</button>
                </div>
        </div>
        
        <div class="right-wrap">
            <div v-if="itemCheck.stateCheck==='before' && beforeTime!=='over'">
                <div class="remain">업무시작까지 {{ beforeTime }}분 남았습니다</div>
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
            current: this.$moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            beforeTime: "", // 업무시간까지 남은 시간

        }
    },
    mounted() {

            let intervalBefore = setInterval(() => { // 업무시작까지 몇 분 남았는지
                // console.log(this.itemCheck.id)
                // console.log(stateCheck)
                let stateCheck = this.itemCheck.stateCheck
                let requested = this.item.requestedTime

                if(stateCheck==='ing'){
                    console.log(stateCheck)

                    clearInterval(intervalBefore)
                }

                this.current = this.$moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                let check = this.$moment(requested).isAfter(this.current)// 작업요청일자가 현재시각보다 후에 있는경우 - true
                // // 작업요청일자가 후에 있다면, 얼마나 차이나는지
                if(check) {

                    // let gap = this.$moment(requested).diff(this.current, 'minutes')

                    let diff = this.$moment(requested).diff(this.current, 'seconds')

                    let days = Math.floor(diff/(60*60*24))
                    let hours = Math.floor((diff%(60*60*24))/(60*60))
                    let mins = Math.floor((diff%(60*60)/60))
                    let secs = Math.floor((diff%60))
                    this.beforeTime = `${days}일 ${hours}시간 ${mins}분 ${secs}초`
                } else { // 작업요청일자 < 현재 시각
                    clearInterval(intervalBefore)
                    this.beforeTime = "over"
                }



            }, 1000)
        
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
        // handleBeforeTime() { // 업무시작까지 몇 분 남았는지 
        //     var requested = this.item.requestedTime
        //     console.log(this.current)
        //     console.log(requested)
        //     // var diffDate = '차이' + moment.duration.(comment.diff(requested).hours + '시간')
        // },
        workCheck() {
            this.SET_CHECKS({id:this.item.id, check:"ing"})
            // console.log("버튼 id 체크")
            // console.log(this.checks);
        }
    }
}
</script>