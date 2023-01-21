// 주요 목적: state를 변경시키는 역할
// commit('함수명', '전달인자')으로 실행 가능

const mutations = {
    SET_WORKS (state, works) {
        state.works = works
    }
}

export default mutations