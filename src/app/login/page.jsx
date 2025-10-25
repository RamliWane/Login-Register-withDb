"use client"

import React from 'react';
import { signIn } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

const Form = () => {
  const router = useRouter();

  async function handleLogin(formData) {
    const response = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!response?.ok) {
      alert("Login gagal!");
      return;
    }

    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">Masuk ke Akun</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Daftar di sini
          </a>
        </p>

        <form action={handleLogin} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input id="email" name="email" type="email" required
                className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="nama@email.com" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input id="password" name="password" type="password" required
                className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••" />
            </div>
          </div>

          <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
