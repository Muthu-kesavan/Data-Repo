import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/lib/api-client';
import { LOGIN_ROUTE } from '@/utils/constants';
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdEye, IoMdEyeOff, IoMdArrowBack } from 'react-icons/io';
import { useAppStore } from '@/store';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {setUserInfo} = useAppStore();

  const validateLogin = () => {
    if (!email.length) {
      toast.error('Enter your Email');
      return false;
    }
    if (!password.length) {
      toast.error('Enter your password');
      return false;
    }
    return true;
  };

  const handleLoginSuccess = (userInfo)=> {
    setUserInfo(userInfo);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

  };

  const handleLogin = async () => {
    if (validateLogin()) {
      setLoading(true);
      try {
        const res = await apiClient.post(
          LOGIN_ROUTE,
          { email, password },
          { withCredentials: true }
        );
  
        if (res.status === 200) {
          const { token, user } = res.data;
          const {authorities} = user;

          localStorage.setItem('token', token);
          handleLoginSuccess(user);

          const role = user.authorities[0]?.authority; 
          if (role === 'ADMIN') {
            toast.success('Logged in successfully as Admin');
            navigate('/admin');
          } else if (role === 'MANAGER') {
            toast.success('Logged in successfully as Manager');
            navigate('/manager');
          } else {
            toast.warning('Unauthorized role');
          }
        }
      } catch (err) {
        if (err.response && err.response.status === 400) {
          toast.error('Invalid email or password');
        } else {
          toast.error('An error occurred, please try again later');
        }
      } finally {
        setLoading(false);
      }
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg relative sm:w-96 md:w-1/2 lg:w-1/3">
        <button
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800"
          onClick={() => navigate('/register')}
        >
          <IoMdArrowBack size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your password"
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center justify-center shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
