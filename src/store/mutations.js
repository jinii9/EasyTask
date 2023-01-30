// 주요 목적: state를 변경시키는 역할
// commit('함수명', '전달인자')으로 실행 가능

const mutations = {
    SET_WORKS (state, works) {
        
        state.works = works
        // console.log(state.works)
        // for(let i=0; i<works.length; i++){
        //     state.works[i].stateCheck = "before"
        //     console.log(state.works[i])
        // }
        
        for(let i=0; i<works.length; i++){

            let value = {
                id: works[i].id,
                stateCheck: "before",
                // beforeTime: 0,
                useTime: "",
            }
            state.checks.push(value)
        }

    },
    SET_CHECKS (state, {id, check}) {
        for(let i=0; i<state.works.length; i++){
            if(state.checks[i].id === id) {
                state.checks[i].stateCheck = check
            }
        }
    },
    SET_CHECKS_TIMER (state, {id, timer}) {
        for(let i=0; i<state.works.length; i++){
            if(state.checks[i].id === id) {
                state.checks[i].useTime = timer
            }
        }
        // console.log(state.checks)

    },
    SET_WORK_EDIT (state, work) {
        console.log(work)
        for(let i=0; i<state.works.length; i++){
            if(state.works[i].id === work.id) {
                state.works[i].startTime = work.startTime
                state.works[i].endTime = work.endTime

            }
        }

    }
}

export default mutations