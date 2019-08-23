//var config = require('./accounts')
const axios = require('axios')
const baseURL = 'https://api-et.hellocash.net'
const uuid = require('uuid/v1');

const hellocash = {
    login: async (principal,credentials,system="lucy")=>{
        let body = {
            "principal": principal,
            "credentials": credentials,
            "system": system
        }
        return (await axios.post(`${baseURL}/authenticate`,body)).data.token;
    },
    getInvoices: async (param,token,id)=>{
        let url = `${baseURL}/invoices`
        if(id)
           url = `${baseURL}/invoices/${id}`
        let config = {
            url: url,
            method: "get",
            headers: {authorization:`Bearer ${token}`},
            params: param
         }
         return (await axios(config)).data;
    },
    postInvoices: async (invoice,token)=>{
        let config = {
            url: `${baseURL}/invoices`,
            method: "post",
            headers: {authorization:`Bearer ${token}`},
            data: invoice
        }
        return (await axios(config)).data; 
    },
    validateInvoice: async (invoice,token) =>{
        let config = {
            url: `${baseURL}/invoices/validate`,
            method: "post",
            headers: {authorization:`Bearer ${token}`},
            data: invoice
        }
        return (await axios(config)).data; 
    },
    deleteInvoice: async (id,token)=>{
        let config = {
            url: `${baseURL}/invoices/${id}`,
            method: "delete",
            headers: {authorization:`Bearer ${token}`},
        }  
        return (await axios(config)).data;
    },
    getTransfers: async (param,token,id)=>{
        let url = `${baseURL}/transfers`
        if(id)
           url = `${baseURL}/transfers/${id}`
        let config = {
            url: url,
            method: "get",
            headers: {authorization:`Bearer ${token}`},
            params: param
        }
        return (await axios(config)).data;  
    },
    postTransfer: async (invoice,token)=>{
        let config = {
            url: `${baseURL}/transfers`,
            method: "post",
            headers: {authorization:`Bearer ${token}`},
            data: invoice
        }
        return (await axios(config)).data; 
    },
    validateTransfer: async (invoice,token)=>{
        let config = {
            url: `${baseURL}/transfers`,
            method: "post",
            headers: {authorization:`Bearer ${token}`},
            data: invoice
        }
        return (await axios(config)).data;
    },
    authorizeTransfer: async (id,token)=>{
        let config = {
            url: `${baseURL}/transfers/authorize`,
            method: "post",
            headers: {authorization:`Bearer ${token}`},
            data : [id]
        }
        return (await axios(config)).data;
    },
    transferBatch: async (batch,token)=>{
        let config = {
            url: `${baseURL}/transfers/batch`,
            method: 'post',
            headers: {authorization:`Bearer ${token}`},
            data: batch
        }
        return (await axios(config)).data;
    },
    cancelTransfers: async (idList, token)=>{
        let config = {
            url: `${baseURL}/transfers/cancel`,
            method: 'post',
            headers: {authorization:`Bearer ${token}`},
            data: idList
        }
        return (await axios(config)).data;
    },
    replaceTransfer: async (id,invoice,token) => {
        let config = {
            url: `${baseURL}/transfers/${id}`,
            method: 'put',
            headers: {authorization:`Bearer ${token}`},
            data: invoice
        }
        return (await axios(config)).data;
    },
    getAirTime: async (id,token) => {
        let config = {
            url: `${baseURL}/transfers/${id}`,
            method: 'get',
            headers: {authorization:`Bearer ${token}`},
        }
        return (await axios(config)).data;
    }
}


exports = hellocash

