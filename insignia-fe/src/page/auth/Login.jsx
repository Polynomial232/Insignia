import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../services/auth"
import Swal from "sweetalert2"
import { useEffect, useState } from "react"

export default function Login() {
  const navigate = useNavigate()
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  })

  useEffect(() => {
    if(localStorage.getItem('api_token')){
      navigate('./dashboard')
    }
  }, [])

  function handleSignIn(e){
    e.preventDefault()

    const data = {
      username: loginForm.username,
      password: loginForm.password
    }

    loginUser(data)
    .then((response) => {
      if(response.data.statusCode === 200){
        // better using cookies
        localStorage.setItem('api_token', response.data.data.api_token)
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
        <form className="flex flex-col text-center gap-4" onSubmit={(e) => handleSignIn(e)}>
          <h2 className="text-xl font-bold">Sign In To Your Account</h2>
          <div className="relative">
              <input type="text" id="username_floating" name="username" className="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-white bg-gray-700 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " value={loginForm.username} onChange={(e) => setLoginForm(prevState => ({ ...prevState, [e.target.name]: e.target.value }))} required />
              <label htmlFor="username_floating" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">username</label>
          </div>
          <div className="relative">
              <input type="password" id="password_floating" name="password" className="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-white bg-gray-700 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " value={loginForm.password} onChange={(e) => setLoginForm(prevState => ({ ...prevState, [e.target.name]: e.target.value }))} required />
              <label htmlFor="password_floating" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">password</label>
          </div>
          <div className="pt-3">
            <button className="bg-white text-slate-800 rounded-full py-3 px-20 font-bold">Sign In</button>
          </div>
        </form>
      </div>
      <span className="text-white">Don't have an account? <Link to={'./register'} className="uppercase font-bold hover:underline">Sign Up</Link></span>
    </div>
  )
}
