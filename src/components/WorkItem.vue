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
    color: #CBCFE8;
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
@media screen and (max-width:1300px) {
        /* html{
            font-size: 50%;
            width: 40%;
            height: 40%;
        } */
        /* .title {
            background-color: tan;
        } */
}
</style>

<template>
    <div class="item-wrap">
        <div class="left-wrap">
                <div class="info-wrap">
                    <!-- <div>{{ itemCheck }}</div> -->
                    <div class="state" v-if="itemCheck.stateCheck==='before'">????????????</div>
                    <div class="state" v-if="itemCheck.stateCheck==='ing'" :style="{backgroundColor: '#2260FF'}">?????????</div>
                    <div class="state" v-if="itemCheck.stateCheck==='after'" :style="{backgroundColor: '#797E9C'}">????????????</div>

                    <div class="title">{{ item.name }}</div>
                </div>

                <div class="date-wrap">
                    <img src="../assets/images/bell.png">
                    <!-- ????????? -->
                    <div class="dateText" :class="{'dateTextOver': beforeTime==='over'}">{{ item.requestedTime }}</div>
                    <!-- <button @click="workCheck">test</button> -->
                </div>
        </div>
        
        <div class="right-wrap">
            <div v-if="itemCheck.stateCheck==='before' && beforeTime!=='over'">
                <div class="remain">?????????????????? {{ beforeTime }} ???????????????.</div>
            </div>

            <button class="work-btn" :class="{'work-btn-disabled': disabledCheck}" v-if="itemCheck.stateCheck==='before'" 
                :disabled="disabledCheck" @click="[workStart(), putWORK('start')]">????????????</button>
            <div class="ing-wrap" v-if="itemCheck.stateCheck==='ing'">
                <div class="useTime-wrap">
                    <img src="../assets/images/clock.png">
                    <div class="useTime">{{itemCheck.useTime}}</div>
                </div>
                <button class="work-btn" @click="[workEnd(), putWORK('end')]">????????????</button>
            </div>

            <div v-if="itemCheck.stateCheck==='after'">
                <div class="end-wrap">
                    <div class="deadLine">
                        <img src="../assets/images/check.png">
                        <div class="deadLine-date">{{ $moment(item.startTime).format('YYYY??? M??? D??? H??? m???') }} ~ {{ $moment(item.endTime).format('YYYY??? M??? D??? H??? m???') }}</div>
                    </div>
                    <div class="useTime-wrap">
                        <img src="../assets/images/clock.png">
                        <div class="useTime">{{itemCheck.useTime}}</div>
                    </div>
                </div>                
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
            beforeTime: "", // ?????????????????? ?????? ??????
            disabledCheck: true, 
            useTimeText: "", // ????????? ?????? ?????????
        }
    },
    mounted() {
            // ?????????????????? ??? ??? ????????????
            console.log(`??????????????????: ${this.item.startTime}`)
            console.log(`????????????: ${this.current}`)
            
            let intervalBefore = setInterval(() => { 
                let stateCheck = this.itemCheck.stateCheck
                let requested = this.item.requestedTime

                if(stateCheck==='ing'){
                    console.log(stateCheck)

                    clearInterval(intervalBefore)
                }

                this.current = this.$moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                let check = this.$moment(requested).isAfter(this.current)// ????????????????????? ?????????????????? ?????? ???????????? - true
                // // ????????????????????? ?????? ?????????, ????????? ???????????????
                if(check) {

                    let gap = this.$moment(this.item.startTime).diff(this.current, 'minutes')
                    if(gap <= 15){
                        this.disabledCheck = false
                    }

                    let diff = this.$moment(requested).diff(this.current, 'seconds')

                    let days = Math.floor(diff/(60*60*24))
                    let hours = Math.floor((diff%(60*60*24))/(60*60))
                    let mins = Math.floor((diff%(60*60)/60))
                    let secs = Math.floor((diff%60))

                    if(days===0){
                        this.beforeTime = `${hours}?????? ${mins}??? ${secs}???`
                    } 
                    else if(hours===0){
                        this.beforeTime = `${mins}??? ${secs}???`
                    }
                    else {
                        this.beforeTime = `${days}??? ${hours}?????? ${mins}??? ${secs}???`
                    }
                } else { // ?????????????????? < ?????? ??????
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
            'SET_CHECKS',
            'SET_CHECKS_TIMER',
            'SET_WORK_EDIT'
        ]),
        ...mapActions([
            'PUT_WORK',
        ]),
        // ???????????? ??? ???????????? ?????? ?????? ???, db ??? ??????
        putWORK(check) {
            var startTime = null
            var endTime = null
            if(check==="start"){
                startTime = this.$moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                endTime = this.item.endTime
                // console.log(`startTime:${startTime}`)
            }
            else if(check==="end"){
                startTime = this.item.startTime
                endTime = this.$moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                // console.log(`endTime:${endTime}`)
            }
            console.log(`startTime:${startTime}`)
            console.log(`endTime:${endTime}`)

            this.SET_WORK_EDIT({id:this.item.id, startTime:startTime, endTime:endTime})
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
        },
        workStart() {
            this.SET_CHECKS({id:this.item.id, check:"ing"})
            let useTime = 0;
            // ????????? ?????? ?????????
            let intervalIng = setInterval(() => {
                let stateCheck = this.itemCheck.stateCheck

                if(stateCheck==='after'){
                    console.log(stateCheck)
                    clearInterval(intervalIng)
                    this.SET_CHECKS_TIMER({id:this.item.id, timer:this.useTimeText})
                }

                var hour = 0 
                var min = 0
                var sec = 0

                useTime++
                min = Math.floor(useTime/60);
                hour = Math.floor(min/60);
                sec = useTime%60;
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
                // console.log(this.useTimeText);
                this.SET_CHECKS_TIMER({id:this.item.id, timer:this.useTimeText})
                console.log(this.itemCheck.useTime);


            },1000)
        },
        workEnd() {
            this.SET_CHECKS({id:this.item.id, check:"after"})
        }
    }
}
</script>