"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../../utils/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      document.cookie = `token=${data.token}; path=/`;
      router.push('/patients/dashboard');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
  <div
    className="relative w-full h-screen bg-cover bg-center flex flex-col items-center justify-evenly"
    style={{ backgroundImage: 'url("/bg-image-login.jpg")' }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    <div className="relative text-center font-extrabold z-10">
      <h1 className="text-3xl text-white">Welcome to</h1>
      <h1 className="text-4xl text-white">MediConnect</h1>
    </div>
    <div className="relative bg-blue-800 bg-opacity-40 backdrop-blur-lg rounded-3xl p-11 text-center z-10 max-w-md mx-auto">
    <form onSubmit={handleLogin}>
      <div className="mb-6">
        <label className="block text-white text-lg mb-2 font-bold">Email:</label>
        <input
          type="email"
          placeholder="Email"
          className="p-3 rounded-lg w-full bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-white text-lg mb-2 font-bold">Password:</label>
        <input
          type="password"
          placeholder="Password"
          className="p-3 rounded-lg w-full bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="p-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg w-full font-bold transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 focus:ring-4 focus:ring-blue-300 active:scale-95"
      >
        Login
      </button>
    </form>
    <p className="mt-4 text-white">Don't have an account? <a href='/register' className="text-blue-300 hover:underline"><b>Register for free</b></a></p>
    </div>
  </div>
  );
};

export default LoginPage;
