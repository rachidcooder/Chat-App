import { link, useState } from 'react'
import { AiFillPicture } from "react-icons/ai";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from "../firebase"
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';
import { ChatState } from '../context/ChatProvider';
import { toast, ToastContainer } from 'react-toastify'

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pic, setPic] = useState("");
  const [err, setErr] = useState("");
  const { setUser } = ChatState()

  const navigate = useNavigate();

  const toastOption = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "white",
  };


  const onReg = async () => {
    const storage = getStorage();

    //---------------------Valid Info --------------------------------------
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) {
      //toast.error("Please enter a valid email!!", toastOption);
      setErr("Please enter a valid email")
      return false;
    }
    if (name.length <= 3) {
      //toast.error("name must be longer!", toastOption);
      setErr("name must be longer")
      return;
    }
    if (pw.length < 6) {
      //toast.error("Password must be longer!", toastOption);
      setErr("Password must be longer");
      return;
    }
    //----------------------------------------------------------------
    try {

      const res = await createUserWithEmailAndPassword(auth, email, pw);

      const imgRef = ref(storage, `Profiles/${res.user.uid}`);

      const uploadTask = uploadBytesResumable(imgRef, pic);

      uploadTask.on('state_changed',
        (snapshot) => {

        },
        (error) => { setErr(true); },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: name,
              email,
              photoURL: downloadURL
            })
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName: name,
              email,
              photoURL: downloadURL
            });
            await setDoc(doc(db, 'user-chats', res.user.uid), {})
          });

        }
      );

      setUser(res.user);
      navigate('/');

    } catch (err) {
      console.log(err);
      setErr("Something wrong ");
    }


  }
  return (
    <div className='p-5 flex justify-center items-center text-center h-screen bg-backgr'>
      <div className='p-5 px-12 flex items-center justify-center flex-col shadow-xl bg-white rounded'>
        <h1 className=' text-titleC text-xl font-bold  py-3'>Chat App</h1>
        <h3 className=' font-semibold text-gray700'>Register</h3>

        <div className='p-2 flex flex-col '>
          <input type='text'
            className=' py-1 px-1 border-b-2 outline-none'
            placeholder='name'
            value={name}
            onChange={(e) => { setName(e.target.value) }}
          />
          <span className='py-2'></span>
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

          <label htmlFor='file' className=' flex justify-center'> <AiFillPicture size={25} />
            <span className='ps-2 text-gray700' >Add an avatar</span> </label>
          <input type='file' id='file'
            className=' hidden py-1  px-1 border-b-2 border-gray700 border-spacing-y-px outline-none'
            placeholder='add an avatar'

            onChange={(e) => { setPic(e.target.files[0]) }}
          />
          <span className='py-2'></span>

          <button className='text-xl bg-backgr text-center rounded hover:bg-titleC'
            onClick={() => { onReg() }}
          >Sign up</button>
          {err && <span className='p-2 text-red text-xl'>{err} !</span>}
          <span>
            You  have an account ? <Link to={'/login'} className=' text-gray700 text-xl font-semibold'>Login</Link>
          </span>

        </div>
      </div>

    </div>
  )
}

export default Register
