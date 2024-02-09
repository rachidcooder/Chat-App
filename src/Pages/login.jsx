import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast, ToastContainer } from 'react-toastify'
import { auth } from '../firebase';



function login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();
  const [err, setErr] = useState("");

  const toastOption = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  const OnLogin = async () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) {
      // toast.error("Please enter a valid email!!", toastOption);
      setErr("Please enter a valid email")
      return false;
    }

    try {
      const res = await signInWithEmailAndPassword(auth, email, pw)

      console.log(" res login : ", res);

      navigate("/")
    } catch (er) {
      setErr("Something went wrong check email or password");
      console.log(er);
    }


  }

  return (
    <div className='p-5 flex justify-center items-center text-center h-screen bg-backgr'>
      <div className='p-5 flex items-center justify-center flex-col shadow-xl bg-white rounded'>
        <h1 className=' text-titleC text-xl font-bold py-3'>Chat App</h1>
        <h3 className=' text-gray700 font-semibold'>Login</h3>

        <div className='p-2 flex flex-col '>
          <input type='email'
            className='py-1  px-1 border-b-2 border-gray700 border-spacing-y-px outline-none'
            placeholder='email'
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />
          <span className='py-2'></span>
          <input type='password'
            className='py-1  px-1 border-b-2 border-gray700 border-spacing-y-px outline-none'
            placeholder='password'
            value={pw}
            onChange={(e) => { setPw(e.target.value) }}
          />
          <span className='py-2'></span>

          <button className='text-xl bg-backgr text-center rounded hover:bg-titleC'
            onClick={() => { OnLogin() }}
          >Sign in</button>
          {err && <span className='p-2 text-red'>{err}!</span>}
          <span>
            You don't have an account ? <Link to={'/register'} className=' text-gray700 text-xl font-semibold'>Register</Link>
          </span>

        </div>

      </div>

    </div>
  )
}

export default login
