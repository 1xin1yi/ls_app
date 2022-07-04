import axios from "axios"

export const myquest = (url,params = {},type = 'GET') => {
    return new Promise((resolve, reject) => {
        let promise
        if(type === "GET"){
            promise = axios.get(url,{params:params})
        }
        else if(type === "DELETE"){
            promise = axios.delete(url,{data:params})
        }
        else if(type === "POST"){
            promise = axios.post(url,params)
        }
        else{
           promise = axios.put(url,params)
        }
        promise.then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err)
        })
    })
}