import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import { AppleEmoji } from './AppleEmoji.tsx';

interface PasswordGateProps {
  onUnlock: () => void;
}

const CORRECT_PIN = '238218';

export const PasswordGate: React.FC<PasswordGateProps> = ({ onUnlock }) => {
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState<boolean>(false);

  const handleSubmit = (enteredPin = pin) => {
    if (enteredPin === CORRECT_PIN) {
      setError(null);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e11d48', '#fb7185', '#f43f5e', '#fda4af', '#ffffff'],
      });
      onUnlock();
    } else {
      setError('الباسورد مش صح.. جربي تاني يا أسولتي ❤️');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleKeyPress = (digit: string) => {
    if (pin.length < 6) {
      const nextPin = pin + digit;
      setPin(nextPin);
      setError(null);
      if (nextPin.length === 6) {
        handleSubmit(nextPin);
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
    setError(null);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-950/40 via-[#130716]/90 to-[#0a030d] -z-10 pointer-events-none" />

      <div
        className={`w-full max-w-md bg-gradient-to-b from-[#220d20]/95 to-[#150716]/95 border border-rose-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(225,29,72,0.18)] backdrop-blur-2xl transition-all duration-300 ${
          isShaking ? 'animate-[shake_0.4s_ease-in-out]' : ''
        }`}
      >
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center shadow-lg shadow-rose-600/30">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#180718] flex items-center justify-center shadow">
              <AppleEmoji type="heart" size={16} />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-rose-100 font-kufi tracking-tight flex items-center justify-center gap-2">
            <span>موقع خاص بـ أسولتي</span>
            <AppleEmoji type="heart" size={26} />
          </h1>
          <p className="text-rose-300/90 text-sm mt-1.5 font-medium">
            ادخلي هنا اكتبي الباسورد
          </p>
        </div>

        <div className="flex justify-center items-center gap-3 mb-6 dir-ltr">
          {[0, 1, 2, 3, 4, 5].map((idx) => {
            const hasDigit = idx < pin.length;
            return (
              <div
                key={idx}
                className={`w-11 h-12 rounded-xl flex items-center justify-center text-lg font-bold transition-all duration-200 border ${
                  hasDigit
                    ? 'border-rose-400 bg-rose-500/20 text-rose-200 shadow-[0_0_12px_rgba(244,63,94,0.35)] scale-105'
                    : 'border-rose-500/20 bg-black/20 text-rose-500/30'
                }`}
              >
                {hasDigit ? pin[idx] : '•'}
              </div>
            );
          })}
        </div>

        {error && (
          <div className="mb-4 p-2.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-center justify-center gap-1.5 animate-pulse text-center">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2.5 mb-2 dir-ltr">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyPress(num)}
              type="button"
              className="h-13 rounded-2xl bg-white/5 hover:bg-rose-500/20 active:bg-rose-600/30 border border-rose-500/20 text-rose-100 font-bold text-xl transition-all shadow-sm active:scale-95 flex items-center justify-center cursor-pointer"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleDelete}
            type="button"
            className="h-13 rounded-2xl bg-white/5 hover:bg-rose-500/10 active:bg-rose-600/20 border border-rose-500/20 text-rose-300 font-medium text-sm transition-all active:scale-95 flex items-center justify-center cursor-pointer"
          >
            مسح
          </button>
          <button
            onClick={() => handleKeyPress('0')}
            type="button"
            className="h-13 rounded-2xl bg-white/5 hover:bg-rose-500/20 active:bg-rose-600/30 border border-rose-500/20 text-rose-100 font-bold text-xl transition-all shadow-sm active:scale-95 flex items-center justify-center cursor-pointer"
          >
            0
          </button>
          <button
            onClick={() => handleSubmit()}
            type="button"
            className="h-13 rounded-2xl bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-bold text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>دخول</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
