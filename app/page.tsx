'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const { data } = await supabase.from('profiles').select('*').limit(1).single();
      setProfile(data);
      setLoading(false);
    }
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#050505] text-zinc-600 font-mono text-sm uppercase tracking-widest">
        [ Загрузка данных... ]
      </div>
    );
  }

  // Тестовые данные с учетом премиального стиля
  const displayData = profile || {
    display_name: 'Имя Пользователя',
    username: 'username',
    bio: 'Разработка интерфейсов и менеджмент. Строгий визуальный стиль и кастомные UI-решения.',
    reputation: 142,
    message_count: 85,
    badges: [
      { name: 'Admin', color: 'bg-zinc-100 text-zinc-950' }, 
      { name: 'Civil ID', color: 'bg-[#800020] text-zinc-100' }
    ] 
  };

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-200 py-8 px-4 sm:py-16 sm:px-6 selection:bg-[#800020] selection:text-white">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Карточка хедера */}
        <div className="bg-[#0a0a0a] rounded-3xl border border-zinc-800/60 overflow-hidden shadow-2xl relative group">
          
          {/* Фиксированная обложка */}
          <div className="h-48 sm:h-56 w-full bg-zinc-900 relative overflow-hidden">
            {displayData.cover_url ? (
              <img src={displayData.cover_url} alt="Cover" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition duration-700" />
            ) : (
              <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800 via-[#0a0a0a] to-[#050505]"></div>
            )}
            {/* Плавный переход */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
          </div>
          
          <div className="px-6 pb-8 sm:px-10 relative -mt-16 sm:-mt-20 flex flex-col sm:flex-row gap-6 items-start sm:items-end">
            
            {/* Аватарка */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 bg-zinc-900 rounded-full p-1 border border-zinc-700/50 backdrop-blur-md shadow-xl z-10 relative">
                <div className="w-full h-full rounded-full overflow-hidden bg-zinc-800">
                  {displayData.avatar_url ? (
                    <img src={displayData.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-zinc-800 to-zinc-700"></div>
                  )}
                </div>
              </div>
              {/* Индикатор статуса */}
              <div className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 border-[3px] border-[#0a0a0a] rounded-full z-20"></div>
            </div>

            {/* Имя и никнейм */}
            <div className="flex-1 pb-2">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-100">{displayData.display_name}</h1>
              <p className="text-zinc-500 font-mono text-sm mt-1">@{displayData.username}</p>
            </div>

            {/* Кнопка */}
            <div className="pb-2 w-full sm:w-auto">
               <button className="w-full sm:w-auto px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 text-sm font-semibold rounded-full transition-all">
                 Редактировать
               </button>
            </div>
          </div>
        </div>

        {/* Сетка Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Описание (2 колонки) */}
          <div className="md:col-span-2 bg-[#0a0a0a] rounded-3xl border border-zinc-800/60 p-8 hover:border-zinc-700/60 transition-colors">
            <h2 className="text-xs font-mono text-zinc-600 mb-5 uppercase tracking-[0.2em]">О себе</h2>
            <p className="text-zinc-300 leading-relaxed text-[15px] font-light">
              {displayData.bio}
            </p>

            {/* Плашки/Роли */}
            {displayData.badges && displayData.badges.length > 0 && (
              <div className="flex gap-2 mt-8 flex-wrap">
                {displayData.badges.map((badge: any, i: number) => (
                  <span 
                    key={i} 
                    className={`${badge.color} px-3 py-1.5 rounded-md text-[10px] font-mono tracking-widest uppercase shadow-sm border border-white/5`}
                  >
                    {badge.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Статистика (1 колонка) */}
          <div className="bg-[#0a0a0a] rounded-3xl border border-zinc-800/60 p-8 flex flex-col justify-center gap-8 hover:border-zinc-700/60 transition-colors">
            <div>
              <div className="text-4xl font-light tracking-tighter text-zinc-100">{displayData.reputation}</div>
              <div className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-mono mt-2">Репутация</div>
            </div>
            <div className="h-px w-full bg-zinc-800/60"></div>
            <div>
              <div className="text-4xl font-light tracking-tighter text-zinc-100">{displayData.message_count}</div>
              <div className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-mono mt-2">Сообщения</div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
