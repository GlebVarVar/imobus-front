import axios from 'axios';

const _apiBase = 'https://imobis-back.herokuapp.com/api'; 


const getData = async (userName) => {
    const response = await axios.get(`${_apiBase}/data`, {headers: {userName : userName}});
    return response;
};

const postData = async (userName, data) => {
    const responce = await axios.post(`${_apiBase}/data`, {userName, data});
    return responce;
};


export {getData, postData};