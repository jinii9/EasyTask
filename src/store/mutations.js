// 주요 목적: state를 변경시키는 역할
// commit('함수명', '전달인자')으로 실행 가능

const mutations = {
    SET_WORKS (state, works) {
        
        state.works = works
        // for(let i=0; i<works.length; i++){
        //     state.works[i].stateCheck = "before"
        //     console.log(state.works[i])
        // }
        
        for(let i=0; i<works.length; i++){

            let value = {
                id: works[i].id,
                stateCheck: "before",
                beforeTime: 0,
            }
            state.checks.push(value)
        }

    },
    SET_CHECKS (state, {id, check}) {
        // state.checks.id = id
        // state.checks.check = check
        for(let i=0; i<state.works.length; i++){
            console.log(state.checks[i].id)
            console.log(id)
            if(state.checks[i].id === id) {
                state.checks[i].stateCheck = check
                console.log(state.checks[i].stateCheck)
            }
        }
    }
}

export default mutations