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
/* .date-text {
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 2.1rem;

    margin-left: 0.8rem;
} */

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
.ing-wrap {
    display: flex;

}
.useTime-wrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    /* margin-right: 0.8rem; */
}
.useTime {
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 2.1rem;

    display: flex;
    align-content: center;
    justify-content: center;
    margin-left: 0.65rem;
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
    cursor: pointer;

    margin-left: 0.8rem;

}
.work-btn-disabled {
    background-color: #E6E9F8;
    cursor: default;
}

.end-wrap {
}
.deadLine {
    display: flex;
}
.deadLine-date {
    margin-left: 0.4rem;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 2.1rem;
}
.end-useTime-wrap {

}
</style>

<template>
        <div class="item-wrap">
                <div class="left-wrap">
                        <div class="info-wrap">
                            <State v-if="item.startTime===null" before>작업예정</State>
                            <State class="state" v-else-if="item.startTime!==null && item.endTime===null" ing>작업중</State>
                            <State class="state" v-else-if="item.endTime!==null" after>작업완료</State>

                            <div class="title">{{ item.name }}</div>
                        </div>
                        <div class="date-wrap">
                            <img src="../assets/images/bell.png">
                            
                            <!-- [작업예정] -->
                            <!-- <div v-if="item.startTime===null"> -->
                                <DateText v-if="item.startTime===null" :beforeCheck=beforeCheck>{{ item.requestedTime }}</DateText>
                                <DateText v-else :beforeCheck=beforeCheck>{{ item.requestedTime }}</DateText>
                            <!-- </div> -->
                        </div>
                </div>

                <div class="right-wrap">
                    <div v-if="item.startTime===null && remainedTime!==-1">
                        <div class="remain">
                            업무시작까지 {{remainedTime}}분 남았습니다.
                        </div>
                        <!-- <button class="work-btn" :disabled="remainedTime!==-1">
                            업무시작
                        </button> -->
                    </div>
                    
                    <button class="work-btn" :class="{'work-btn-disabled': remainedTime!==-1}" 
                        v-if="item.startTime===null" :disabled="remainedTime!==-1" @click="putData">
                        업무시작
                    </button>
                    <div class="ing-wrap" :class="{'end-useTime-wrap': item.endTime!==null}" v-else-if="item.startTime!==null && item.endTime===null">
                        <div class="useTime-wrap">
                            <img src="../assets/images/clock.png">
                            <div class="useTime">{{useTimeText}}</div>
                        </div>
                        <button class="work-btn" @click="putData">
                            업무종료
                        </button>
                    </div>
                    <!-- <WorkBtn v-if="item.startTime===null" :remainCheck=remainedTime :disabled=>업무 시작</WorkBtn> -->
                    <!-- <WorkBtn v-else-if="item.startTime!==null && item.endTime===null" :remainCheck=remainedTime>업무 종료</WorkBtn> 작업중일 때 업무 종료하는 Btn  -->

                    <!-- 업무 종료 시, 보이는 UI -->
                    <div v-if="item.endTime!==null">
                        <div class="end-wrap">
                            <div class="deadLine">
                                <img src="../assets/images/check.png">
                                <div class="deadLine-date">{{ $moment(item.startTime).format('YYYY년 M월 D일 h시 m분') }} ~ {{ $moment(item.endTime).format('YYYY년 M월 D일 h시 m분') }}</div>
                            </div>
                            <div class="useTime-wrap">
                                <img src="../assets/images/clock.png">
                                <div class="useTime">{{useTimeText}}</div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
</template>

<script>
import Vue from 'vue'
import {mapState, mapActions} from 'vuex'
import {DateText, State, WorkBtn} from "../styled-components/Board"
import VueMomentLib from 'vue-moment-lib';
import timer from '../timer.js';

Vue.use(VueMomentLib);
let interval;

export default {
    props: {
        item: Object,
    },
    components: {
        State,
        DateText,
        WorkBtn,
    },
    data() {
        return {
            current: new Date(),

            beforeCheck: false, // 작업요청일자-현재시간 비교
            // timeCheck: false, // 현재시간-요청일자 비교
            remainedTime: -1,
            timerCheck: false,
            useTime: 0, // 타이머
            useTimeText: "00:00", // 타이머텍스트
        }
    },
    computed: {
        ...mapState({
            works: 'works'
        }),
        handleDeadLineFilter() {
            
        }
    },
    created() {
        this.fetchData()
    },
    mounted() {
        this.handleFilter()
        this.handleBefore()  

    },
    methods: {
        ...mapActions([
            'FETCH_WORKS',
            'PUT_WORK'
        ]),
        fetchData() {
            this.FETCH_WORKS()
        },
        handleFilter() {
            this.current = this.$moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        },
        handleBefore() {
            console.log(this.item.id)
            console.log("현재시간" + this.current)
            console.log("요청일자" + this.item.requestedTime)
            var check = this.$moment(this.item.requestedTime).isAfter(this.current)// 작업요청일자가 현재시각보다 후에 있는경우 - true

            if(check) {
                this.beforeCheck = true
                // 작업요청일자가 후에 있다면, 얼마나 차이나는지 (15분 이내일 경우)
                var gap = this.$moment(this.item.requestedTime).diff(this.current, 'minutes')
                if(gap <= 15) {
                    this.remainedTime = this.$moment(this.item.requestedTime).diff(this.current, 'minutes')
                    console.log('분 차이: ', this.$moment(this.item.requestedTime).diff(this.current, 'minutes'))
                    this.beforeCheck = true
                }
            } else {
                this.beforeCheck = false
            }
        },
        startTimer() {
            // 정수로부터 남은 시, 분, 초 단위 계산

            // let timer = setInterval(()=>{
                var hour = 0 
                var min = 0
                var sec = 0

                this.useTime++
                min = Math.floor(this.useTime/60);
                hour = Math.floor(min/60);
                sec = this.useTime%60;
                min = min%60;

                var th = hour;
                var tm = min;
                var ts = sec;
                if(th<10) th = "0" + hour;
                if(tm < 10) tm = "0" + min;
                if(ts < 10) ts = "0" + sec;

                if(th="00"){
                    this.useTimeText = tm + ":" + ts;
                } else {
                    this.useTimeText = th + ":" + tm + ":" + ts;
                }
                console.log(this.useTimeText);
            // },1000);


            // return(hour + ":" + min + ":" + sec);
        },
        endTimer() {
            
        },
        putData() {
            var startTime = null
            var endTime = null

            if(this.item.startTime===null){
                startTime = this.$moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                endTime = this.item.endTime

                // this.startTimer();

            } else if(this.item.startTime!==null) {
                console.log("아 쫌 돼라!!!!!" + this.item.startTime)
                startTime = this.item.startTime
                endTime = this.$moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                this.timerCheck = true
                // this.startTimer();


                // console.log(test.value)
                // test.method()

                // this.endTimer();
            }
            // 타이머 스타트
            // var interval;
            if(!this.timerCheck) {
                this.interval = setInterval(this.startTimer,1000)
                console.log("체크체크:" + interval)
            }
            else {
                clearInterval(this.interval)
                console.log("체크체크2:" + interval)         
            }


            this.PUT_WORK({
                id: this.item.id, 
                name: this.item.name, 
                description: this.item.description, 
                startTime: startTime,
                endTime: endTime,
                requestedTime: this.item.requestedTime
            })
            .catch(err => {
            this.error = err.data.error
            })

            // 시간 재기
            // useTime
            // setInterval(this.timer, 1000);
        },
    },
}

</script>



