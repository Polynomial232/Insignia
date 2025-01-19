import axios from "axios";

export async function registerUser(data){
  try {
    const response = await axios.post('http://127.0.0.1:3000/user/register', data)
    return response
  } catch (error) {
    return error.response
  }
}

export async function loginUser(data){
  try {
    const response = await axios.post('http://127.0.0.1:3000/user/login', data)
    return response
  } catch (error) {
    return error.response
  }
}