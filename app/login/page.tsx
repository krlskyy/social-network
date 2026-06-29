'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else alert('Успешный вход!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold mb-6">Вход</h1>
        <input className="w-full p-3 mb-4 border rounded-lg" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full p-3 mb-4 border rounded-lg" type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold" onClick={handleLogin}>Войти</button>
      </div>
    </div>
  );
}
