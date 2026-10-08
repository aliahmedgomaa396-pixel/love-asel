import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, Check, MessageCircle, Copy } from 'lucide-react';
import { AppleEmoji } from './AppleEmoji.tsx';

interface TelegramReplyProps {
  username?: string;
}

const QUICK_RESPONSES = [
  'سامحتك خلاص يا علي ❤️',
  'وحشتني أوي ومقدرش على زعلك 🥺',
  'بحبك ومش زعلانة منك يا روحي 🌹',
  'وعد متزعلنيش تاني بقى 🤍',
];

export const TelegramReply: React.FC<TelegramReplyProps> = ({ username = 'alia7meddd' }) => {
  const [message, setMessage] = useState<string>('');
  const [sent, setSent] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleSend = () => {
    const textToSend = message.trim() || 'سامحتك خلاص يا علي ❤️ بحبك أوي';

    // Copy to clipboard
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(textToSend);
        setCopied(true);
      }
    } catch {
      // ignore
    }

    // Trigger romantic confetti
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#e11d48', '#fb7185', '#229ed9', '#ffffff'],
    });

    setSent(true);

    // Open Telegram chat with Ali
    const telegramUrl = `https://t.me/${username}`;
    setTimeout(() => {
      window.open(telegramUrl, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  const handleSelectQuick = (text: string) => {
    setMessage(text);
  };

  return (
    <section className="w-full max-w-2xl mx-auto my-10 px-4">
      <div className="bg-gradient-to-b from-[#220c22]/90 to-[#140614]/95 border border-rose-500/25 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl text-center relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-48 h-32 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-center gap-2 mb-2">
          <MessageCircle className="w-5 h-5 text-[#229ed9]" />
          <h3 className="font-kufi text-xl sm:text-2xl font-bold text-rose-100 flex items-center gap-2">
            <span>رد أسولتي لـ علي</span>
            <AppleEmoji type="heart" size={22} />
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-rose-300/80 mb-5 max-w-md mx-auto font-sans leading-relaxed">
          اكتبي أي كلمة في قلبك لعلي وهتفتح محادثته على تليجرام عشان تبعتيهاله على طول
        </p>

        {/* Quick choices */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          {QUICK_RESPONSES.map((quickText, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectQuick(quickText)}
              className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-rose-500/20 active:bg-rose-500/30 border border-rose-500/20 text-rose-200 transition-all cursor-pointer font-medium"
            >
              {quickText}
            </button>
          ))}
        </div>

        {/* Text input area */}
        <div className="mb-4 text-right">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="اكتبي رسالتك لعلي هنا يا أسولتي..."
            rows={3}
            className="w-full p-4 rounded-2xl bg-black/30 border border-rose-500/30 focus:border-rose-400 focus:outline-none text-rose-100 placeholder:text-rose-400/40 text-sm sm:text-base font-amiri resize-none transition-colors"
          />
        </div>

        {/* Send Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleSend}
            type="button"
            className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-[#229ed9] via-[#1c8ec7] to-rose-600 hover:opacity-95 active:scale-95 text-white font-bold text-sm sm:text-base shadow-lg shadow-[#229ed9]/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Send className="w-4 h-4 -rotate-45" />
            <span>إرسال الرسالة لـ علي على تليجرام</span>
            <AppleEmoji type="heart" size={18} />
          </button>
        </div>

        {/* Sent Confirmation Toast */}
        {sent && (
          <div className="mt-4 p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs sm:text-sm animate-in fade-in zoom-in-95 duration-300 flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {copied
                ? 'تم نسخ رسالتك وهتتفتح محادثة علي على تليجرام عشان تلصقيها وتبعتهاله فوراً ❤️'
                : 'جارٍ فتح محادثة علي على تليجرام...'}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
