import { useState } from "react"
import { Link, redirect, useNavigate } from "react-router-dom"
import { registerUser } from "../../services/auth"
import Swal from "sweetalert2"

export default function Register() {
  const navigate = useNavigate()
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirm_password: '',
  })

  function handleSignUp(e){
    e.preventDefault()

    if(registerForm.password !== registerForm.confirm_password){
      Swal.fire({
        title: 'Confirm Password!',
        text: 'Confirm Password dot not Match',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }

    const data = {
      username: registerForm.username,
      password: registerForm.password
    }

    registerUser(data)
    .then((response) => {
      if(response.data.statusCode === 200){
        Swal.fire({
          title: 'Success!',
          text: response.data.message,
          icon: 'success',
          confirmButtonText: 'Sign In',
          preConfirm: () => {
            navigate('../')
          }
        })
      }else{
        Swal.fire({
          title: 'Error!',
          text: response.data.message,
          icon: 'error',
          confirmButtonText: 'OK',
        })
      }
    })
    .catch((e) => {
      Swal.fire({
        title: 'Error!',
        text: e.message,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    })
  }

  return (
    <div className="w-svw h-svh flex flex-col justify-center items-center gap-6 bg-gradient-to-t from-slate-950 to-slate-800">
      <h1 className="font-bold text-5xl text-white">Our Wallet</h1>
      <div className="md:w-1/4 bg-slate-800 py-12 px-14 rounded-xl text-white">
        <form className="flex flex-col text-center gap-4" onSubmit={(e) => handleSignUp(e)}>
          <h2 className="text-xl font-bold">Create Your Account</h2>
          <div className="relative">
              <input type="text" name="username" id="username_floating" className="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-white bg-gray-700 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " value={registerForm.username} onChange={(e) => setRegisterForm(prevState => ({ ...prevState, [e.target.name]: e.target.value }))} required />
              <label htmlFor="username_floating" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">username</label>
          </div>
          <div className="relative">
              <input type="password" name="password" id="password_floating" className="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-white bg-gray-700 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " value={registerForm.password} onChange={(e) => setRegisterForm(prevState => ({ ...prevState, [e.target.name]: e.target.value }))} required />
              <label htmlFor="password_floating" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">password</label>
          </div>
          <div className="relative">
              <input type="password" name="confirm_password" id="confirm_password_floating" className="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-white bg-gray-700 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " value={registerForm.confirm_password} onChange={(e) => setRegisterForm(prevState => ({ ...prevState, [e.target.name]: e.target.value }))} required />
              <label htmlFor="confirm_password_floating" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">confirm password</label>
          </div>
          <div className="pt-3">
            <button className="bg-white text-slate-800 rounded-full py-3 px-20 font-bold">Sign Up</button>
          </div>
        </form>
      </div>
      <span className="text-white">Have an account? <Link to={'../'} className="uppercase font-bold hover:underline">Sign In</Link></span>
    </div>
  )
}
