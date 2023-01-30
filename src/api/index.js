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
    put(id, name, description, startTime, endTime, requestedTime) {
        return request('put', `/works/${id}`, {
            id: id, 
            name: name, 
            description: description, 
            startTime: startTime,
            endTime: endTime,
            requestedTime: requestedTime
        });
    }
}