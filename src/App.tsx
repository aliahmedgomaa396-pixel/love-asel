import React, { useState, useEffect } from 'react';
import { PasswordGate } from './components/PasswordGate.tsx';
import { LoveCard } from './components/LoveCard.tsx';
import { TelegramReply } from './components/TelegramReply.tsx';
import { AudioPlayer } from './components/AudioPlayer.tsx';
import { FloatingHearts } from './components/FloatingHearts.tsx';
import { AppleEmoji } from './components/AppleEmoji.tsx';
import { Lock } from 'lucide-react';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [musicStarted, setMusicStarted] = useState<boolean>(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('aseel_unlocked');
    if (saved === 'true') {
      setIsUnlocked(true);
      setMusicStarted(true);
    }
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
    setMusicStarted(true);
    sessionStorage.setItem('aseel_unlocked', 'true');
  };

  const handleLock = () => {
    setIsUnlocked(false);
    sessionStorage.removeItem('aseel_unlocked');
  };

  return (
    <div className="min-h-screen bg-[#0d0411] text-rose-50 relative selection:bg-rose-500 selection:text-white flex flex-col justify-between overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,20,70,0.3),rgba(255,255,255,0))] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-rose-950/20 to-transparent pointer-events-none -z-10" />

      {/* Floating Apple iOS hearts and emojis */}
      <FloatingHearts enabled={true} />

      {!isUnlocked ? (
        /* Password Gate Screen */
        <PasswordGate onUnlock={handleUnlock} />
      ) : (
        /* Unlocked Page */
        <div className="relative z-10 flex flex-col min-h-screen pb-20">
          {/* Header */}
          <header className="sticky top-0 z-30 backdrop-blur-md bg-[#0d0411]/80 border-b border-rose-500/15 px-4 py-3">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AppleEmoji type="heart" size={24} />
                <h1 className="text-base font-bold font-kufi text-rose-100">
                  لـ أسولتي
                </h1>
              </div>

              <button
                onClick={handleLock}
                className="px-3 py-1.5 rounded-full text-xs bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 transition cursor-pointer flex items-center gap-1.5"
                title="قفل الموقع"
              >
                <Lock className="w-3 h-3 text-rose-400" />
                <span>قفل</span>
              </button>
            </div>
          </header>

          {/* User's Exact Words for Aseel */}
          <section className="text-center pt-10 pb-6 px-4 max-w-2xl mx-auto space-y-6">
            <div className="space-y-3 font-amiri text-2xl sm:text-3xl md:text-4xl text-rose-100 leading-relaxed font-normal">
              <p>انا كل يوم بحبك اكتر من الي قبلو</p>
              <p>بتوحشيني ف كل ثانيه مش بشوفك فيها</p>
              <p>بعد كل الدقايق الي بتعدي منغيرك</p>
              <p className="font-bold text-rose-200">بحبك اوي والله</p>
              <p className="font-bold text-rose-300 text-3xl sm:text-4xl md:text-5xl pt-1 flex items-center justify-center gap-2">
                <span>ربنا يخليكي ليا</span>
                <AppleEmoji type="heart" size={32} />
              </p>
            </div>

            {/* Added heartfelt message as explicitly requested */}
            <div className="p-5 sm:p-6 rounded-3xl bg-rose-950/40 border border-rose-500/30 text-rose-100 font-amiri text-xl sm:text-2xl md:text-2xl leading-relaxed shadow-lg">
              <p className="flex items-center justify-center gap-2 flex-wrap">
                <span>علفكره انا بعمل كل ده علشانك انا لما بتخانق معاكي ده علشانك علشان بغير عليكي وعايز تكوني ليا لوحدي متزعليش مني لو بدايقك</span>
                <AppleEmoji type="mending_heart" size={30} />
              </p>
            </div>
          </section>

          {/* Only The Card */}
          <LoveCard />

          {/* Telegram Reply to Ali */}
          <TelegramReply username="alia7meddd" />

          {/* Clean minimal footer */}
          <footer className="mt-14 text-center text-xs text-rose-300/60 py-6 border-t border-rose-500/10">
            <p className="flex items-center justify-center gap-1.5 text-sm">
              <span>بحبك يا أسولتي</span>
              <AppleEmoji type="heart" size={16} />
            </p>
          </footer>

          {/* Song player: Rauf & Faik - Вечера */}
          <AudioPlayer autoPlayTriggered={musicStarted} />
        </div>
      )}
    </div>
  );
}
