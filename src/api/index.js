import axios from "axios";

const DOMAIN = "http://localhost:3004"

const request = (method, url, data) => {
    return axios({
        method,
        url: DOMAIN + url,
        data
    }).then(result => result.data)
    .catch(result => {
        const {status} = result.response
        throw result.response
      })
}

export const work = {
    fetch() {
        return request('get', '/works')
    },
}