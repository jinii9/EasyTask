// 주요 목적: mutation을 실행시키는 역할
// dispatch('함수명', '전달인자')으로 실행 가능

import * as api from '../api'

const actions = {
    FETCH_WORKS ({commit}) {
        return api.work.fetch().then(data => {
            commit('SET_WORKS', data)
        })
    },
}

export default actions