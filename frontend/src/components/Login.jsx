import { useState } from "react"
import { useForm } from "react-hook-form";

export const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [message,setMessage] = useState("")
    const onSubmit = data => console.log(data);
  return (
    <div className=' h-[calc(100vh - 120px)] flex justify-center items-center'>
        <div className=' w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pb-6 mb-4'>
            <h2 className=' text-xl font-semibold mb-4 text-center'>الرجاء تسجيل الدخول</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="username" 
                    className=' block text-gray-700 text-sm font-bold mb-2 text-right'>اسم المستخدم</label>
                    <input
                    {...register("username", { required: true })}
                    className=' shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow '
                    type="text" name='username' id='username' placeholder='Username'/>
                </div>
                <div>
                    <label htmlFor="password" 
                    className=' block text-gray-700 text-sm font-bold mb-2 text-right'>كلمة المرور</label>
                    <input
                    {...register("password", { required: true })}
                    className=' shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow '
                    type="password" name='password' id='password' placeholder='Password'/>
                </div>
                    {
                        message && <p className=" text-red-500 text-xs italic mb-3">{message}</p>
                    }               
                <div className=' my-4'>
                    <button className=' bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-1 rounded focus:outline-none'>تسجيل الدخول</button>
                </div>
                <p className=" mt-5 text-center text-gray-500 text-xs">&copy;2025 CFPA Guemar Library. All rights reserved.</p>
            </form>
        </div>
    </div>
  )
}
