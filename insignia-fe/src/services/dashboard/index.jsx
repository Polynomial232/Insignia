import axios from "axios";

export async function fetchTopTransaction(){
  try {
    const apiToken = localStorage.getItem('api_token')

    const response = await axios.get('http://127.0.0.1:3000/transfer/top_transactions_per_user', {
      headers: {
        'Authorization': 'Bearer ' + apiToken
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

    const response = await axios.get('http://127.0.0.1:3000/transfer/top_users', {
      headers: {
        'Authorization': 'Bearer ' + apiToken
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
  
    const response = await axios.get('http://127.0.0.1:3000/user/balance', {
      headers: {
        'Authorization': 'Bearer ' + apiToken
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
  
    const response = await axios.post('http://127.0.0.1:3000/user/balance', {
      amount: amount
    }, {
      headers: {
        'Authorization': 'Bearer ' + apiToken
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

    const response = await axios.post('http://127.0.0.1:3000/transfer', data ,{
      headers: {
        'Authorization': 'Bearer ' + apiToken
      }
    })
    return response
  } catch (error) {
    return error.response
  }
}