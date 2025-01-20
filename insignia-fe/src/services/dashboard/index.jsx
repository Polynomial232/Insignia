import axios from "axios";

export async function fetchTransaction(params){
  try {
    const apiToken = localStorage.getItem('api_token')

    const response = await axios.get(import.meta.env.VITE_API_URL+'/transfer/transaction', {
      headers: {
        Authorization: 'Bearer ' + apiToken
      },
      params: params
    })
    return response
  } catch (error) {
    return error.response
  }
}

export async function fetchTopTransaction(){
  try {
    const apiToken = localStorage.getItem('api_token')

    const response = await axios.get(import.meta.env.VITE_API_URL+'/transfer/top_transactions_per_user', {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    })
    return response
  } catch (error) {
    return error.response
  }
}

export async function fetchTopUsers(){
  try {
    const apiToken = localStorage.getItem('api_token')

    const response = await axios.get(import.meta.env.VITE_API_URL+'/transfer/top_users', {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    })
    return response
  } catch (error) {
    return error.response
  }
}

export async function fetchUserBalance(){
  try {
    const apiToken = localStorage.getItem('api_token')
  
    const response = await axios.get(import.meta.env.VITE_API_URL+'/user/balance', {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    })
    return response
  } catch (error) {
    return error.response
  }
}

export async function postTopupBalance(amount){
  try {
    const apiToken = localStorage.getItem('api_token')
  
    const response = await axios.post(import.meta.env.VITE_API_URL+'/user/balance', {
      amount: amount
    }, {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    })
    return response
  } catch (error) {
    return error.response
  }
}

export async function postTransfer(data){
  try {
    const apiToken = localStorage.getItem('api_token')

    const response = await axios.post(import.meta.env.VITE_API_URL+'/transfer', data ,{
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    })
    return response
  } catch (error) {
    return error.response
  }
}