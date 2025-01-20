import axios from "axios";

export async function registerUser(data){
  try {
    const response = await axios.post(import.meta.env.VITE_API_URL+'/user/register', data)
    return response
  } catch (error) {
    return error.response
  }
}

export async function loginUser(data){
  try {
    const response = await axios.post(import.meta.env.VITE_API_URL+'/user/login', data)
    return response
  } catch (error) {
    return error.response
  }
}

export async function validateUser() {
  try {
    const apiToken = localStorage.getItem('api_token')

    const response = await axios.post(import.meta.env.VITE_API_URL+'/user/validate', {}, {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    })
    return response
  } catch (error) {
    return error.response
  }
}