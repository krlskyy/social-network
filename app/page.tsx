'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      // Пытаемся получить первого пользователя из БД
      const { data } = await supabase.from('profiles').select('*').limit(1).single();
      setProfile(data);
      setLoading(false);
    }
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-gray-500">Загрузка интерфейса...</div>;
  }

  // Fallback-данные, чтобы было на что смотреть, пока БД пустая
  const displayData = profile || {
    display_name: 'Имя Пользователя',
    username: 'username',
    bio: 'Здесь будет отображаться информация о пользователе. Чистый UI с форумной глубиной данных.',
    reputation: 142,
    message_count: 85,
    badges: [
      { name: 'Admin', color: 'bg-gray-900' }, 
      { name: 'Civil', color: 'bg-[#800020]' } // Бургундский цвет для бейджа
    ] 
  };

  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4 sm:py-12">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm overflow-hidden relative border border-gray-200">
        
        {/* Обложка профиля (фиксированный размер) */}
        <div className="h-32 sm:h-40 bg-gray-200 relative overflow-hidden">
          {displayData.cover_url ? (
            <img src={displayData.cover_url} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-gray-300 to-gray-200"></div>
          )}
          
          {/* Аватарка (в стиле Telegram: крупная, круглая, выходит за край обложки) */}
          <div className="absolute -bottom-10 left-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full border-4 border-white shadow-sm overflow-hidden">
              {displayData.avatar_url ? (
                <img src={displayData.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-300"></div>
              )}
            </div>
          </div>
        </div>

        {/* Основной блок с информацией */}
        <div className="pt-12 pb-6 px-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">{displayData.display_name}</h1>
              <p className="text-sm text-gray-500 font-medium">@{displayData.username}</p>
            </div>
            <div className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
              В сети
            </div>
          </div>

          {/* Кастомные бейджи (в стиле XenForo) */}
          {displayData.badges && displayData.badges.length > 0 && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {displayData.badges.map((badge: any, i: number) => (
                <span 
                  key={i} 
                  className={`${badge.color} text-white px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide uppercase shadow-sm`}
                >
                  {badge.name}
                </span>
              ))}
            </div>
          )}

          {/* Описание профиля */}
          <p className="mt-4 text-sm text-gray-700 leading-relaxed">
            {displayData.bio}
          </p>

          {/* Статистика */}
          <div className="mt-6 flex gap-6 border-t border-gray-100 pt-4">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900">{displayData.reputation}</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Репутация</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900">{displayData.message_count}</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Сообщения</span>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
