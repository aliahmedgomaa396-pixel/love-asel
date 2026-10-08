import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { MailOpen, Mail, RotateCcw } from 'lucide-react';
import { AppleEmoji } from './AppleEmoji.tsx';

export const LoveCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasHeartReacted, setHasHeartReacted] = useState<boolean>(false);
  const [heartCount, setHeartCount] = useState<number>(0);

  const handleOpenCard = () => {
    if (!isOpen) {
      setIsOpen(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#fef08a'],
      });
    }
  };

  const handleHeartReact = () => {
    setHasHeartReacted(true);
    setHeartCount((prev) => prev + 1);
    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#e11d48', '#fb7185', '#ffffff'],
    });
  };

  return (
    <section className="w-full max-w-3xl mx-auto my-6 px-4" id="love-card-section">
      {/* Required title strictly requested by user */}
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-rose-100 font-kufi tracking-tight">
          افتحي الكارت :
        </h2>
        <p className="text-rose-300/80 text-sm mt-2 font-medium">
          {isOpen ? 'اقرأي كل كلمة براحتك وبقلبك 🤍' : 'اضغطي على الظرف عشان يفتح ليكي الرسالة'}
        </p>
      </div>

      {/* The Envelope / Card Container */}
      <div className="relative">
        {!isOpen ? (
          /* Unopened Envelope */
          <div
            onClick={handleOpenCard}
            className="group relative cursor-pointer mx-auto max-w-lg aspect-[16/11] bg-gradient-to-br from-[#2f0e27] via-[#20091b] to-[#160613] rounded-3xl p-6 border-2 border-rose-500/40 shadow-[0_20px_50px_rgba(225,29,72,0.25)] hover:border-rose-400/80 hover:shadow-[0_20px_60px_rgba(244,63,94,0.4)] transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden"
          >
            {/* Envelope flap lines */}
            <div className="absolute inset-x-0 top-0 h-1/2 border-b-2 border-rose-500/30 bg-gradient-to-b from-rose-950/40 to-transparent pointer-events-none transform -skew-y-2 origin-top-left" />
            <div className="absolute inset-x-0 top-0 h-1/2 border-b-2 border-rose-500/30 bg-gradient-to-b from-rose-950/40 to-transparent pointer-events-none transform skew-y-2 origin-top-right" />

            {/* Glowing Wax Seal */}
            <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-amber-500 shadow-xl flex items-center justify-center border-2 border-amber-300/60 group-hover:scale-110 transition-transform duration-300 animate-pulse-slow">
              <div className="text-center flex flex-col items-center justify-center">
                <AppleEmoji type="heart" size={32} />
                <span className="text-[10px] sm:text-xs font-bold text-amber-100 tracking-wider font-kufi block mt-1">
                  أسولتي
                </span>
              </div>
            </div>

            <div className="relative z-10 mt-6 space-y-1.5">
              <span className="inline-flex items-center gap-1.5 text-base sm:text-lg font-bold text-rose-100 group-hover:text-rose-200 transition-colors">
                <Mail className="w-5 h-5 text-rose-400" />
                <span>اضغطي لفتح الكارت</span>
              </span>
              <p className="text-xs text-rose-300/70">
                رسالة من كل قلبي ليكي وحدك
              </p>
            </div>
          </div>
        ) : (
          /* Opened Letter */
          <div className="animate-in fade-in zoom-in-95 duration-500 mx-auto max-w-2xl">
            {/* Top flap decoration */}
            <div className="flex justify-between items-center mb-3 px-2">
              <div className="flex items-center gap-2 text-xs text-rose-300/80">
                <MailOpen className="w-4 h-4 text-rose-400" />
                <span>الرسالة مفتوحة لـ أسيل</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs text-rose-400/80 hover:text-rose-200 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 transition cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>إغلاق الظرف</span>
              </button>
            </div>

            {/* Parchment Paper Card */}
            <div className="relative bg-gradient-to-b from-[#fff7f2] via-[#fffbf9] to-[#fdede4] text-[#3d1927] rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.5)] border-4 border-[#e9b897]/60 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-rose-200/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-radial from-rose-200/40 to-transparent pointer-events-none" />
              
              <div className="border-b border-[#e9b897]/80 pb-4 mb-6 flex items-center justify-between">
                <div>
                  <h3 className="font-kufi text-xl sm:text-2xl font-bold text-[#8b1e3f] flex items-center gap-2">
                    <span>إلى حبيبتي أسولتي</span>
                    <AppleEmoji type="heart" size={24} />
                  </h3>
                  <p className="text-xs text-[#8c5364] mt-0.5">
                    كلام طالع من قلبي
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shadow-inner">
                  <AppleEmoji type="heart" size={20} />
                </div>
              </div>

              {/* Exact user requested message paragraphs */}
              <div className="font-amiri text-base sm:text-lg md:text-xl leading-[2.1] sm:leading-[2.2] space-y-4 text-justify font-normal selection:bg-rose-200">
                <p className="indent-4">
                  بصي انا عارف انك متدايقه لسه من الي حصل واني مكنتش معاكي طول الوقت الي فات ده.
                </p>

                <p className="indent-4">
                  بس انا فعلا وربنا كنت موجود وبراقبك طول الوقت مش متعلق وكدا بس انا فعلا حبيتك بجد ي اسيل وانا بردو اتفشخت اكتر منك والله بس انا بحبك يعني مهما حصل مش بفكر قد ايه فشختيني لا بفكر ف الايام الحلوه الي معاكي مش ببص للوحش.
                </p>

                <p className="indent-4 font-semibold text-[#8b1e3f]">
                  اسيل انا بحبك اوي وعايزك كويسه واشطر واحلى البنات دايما.
                </p>

                <p className="indent-4">
                  ف لما اقولك اعملي حاجه اسمعيني انا شايفلك الاحسن ليكي والله حتى لو حاجه هتدايقك اسمعيني بس وبردو نفسي تسمعي كلامي ف حوار الصور ده.
                </p>

                <p className="indent-4">
                  يعني لما اقولك مش تنزلي صور ليكي متنزليش متضحكيش عليا وتنزلي من ورايا أو صوره ثانيه.
                </p>

                <p className="text-center font-bold text-xl sm:text-2xl text-[#8b1e3f] pt-2 flex items-center justify-center gap-2">
                  <span>انا بحبك اوي افهمي بجد</span>
                  <AppleEmoji type="heart" size={24} />
                </p>
              </div>

              {/* Signature */}
              <div className="mt-8 pt-6 border-t border-[#e9b897]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-[#8c5364]">
                  <span>بحبك دايماً يا أسولتي</span>
                </div>

                {/* Heart Reaction */}
                <button
                  onClick={handleHeartReact}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer ${
                    hasHeartReacted
                      ? 'bg-rose-600 text-white'
                      : 'bg-rose-100 hover:bg-rose-200 text-rose-800'
                  }`}
                >
                  <AppleEmoji type="heart" size={18} />
                  <span>
                    {hasHeartReacted
                      ? `بحبك يا أسولتي (${heartCount})`
                      : 'اضغطي لو الكلام لمس قلبك'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
