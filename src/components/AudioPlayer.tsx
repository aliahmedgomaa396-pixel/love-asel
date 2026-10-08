import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Disc3, ExternalLink } from 'lucide-react';

interface AudioPlayerProps {
  autoPlayTriggered: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ autoPlayTriggered }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showLyrics, setShowLyrics] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  // Video ID for Rauf & Faik - Вечера (Official audio)
  const videoId = 'B4wNcK_syH4';

  useEffect(() => {
    if (autoPlayTriggered) {
      setIsPlaying(true);
      // Send play postMessage to YouTube iframe
      setTimeout(() => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
            '*'
          );
        }
      }, 600);
    }
  }, [autoPlayTriggered]);

  const togglePlay = () => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({
        event: 'command',
        func: nextState ? 'playVideo' : 'pauseVideo',
        args: [],
      }),
      '*'
    );
  };

  const toggleMute = () => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({
        event: 'command',
        func: nextMute ? 'mute' : 'unMute',
        args: [],
      }),
      '*'
    );
  };

  return (
    <>
      {/* Hidden YouTube Iframe for audio streaming */}
      <div className="fixed -top-96 -left-96 w-10 h-10 opacity-0 pointer-events-none overflow-hidden">
        {autoPlayTriggered && (
          <iframe
            ref={iframeRef}
            title="Rauf & Faik - Вечера"
            width="200"
            height="200"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&autoplay=1&loop=1&playlist=${videoId}&controls=0`}
            allow="autoplay; encrypted-media"
          />
        )}
      </div>

      {/* Floating Romantic Music Player Widget */}
      <div className="fixed bottom-4 left-4 z-40 max-w-sm">
        {isMinimized ? (
          <button
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-rose-950/80 backdrop-blur-md border border-rose-500/40 text-rose-200 shadow-xl hover:bg-rose-900/90 transition-all text-xs cursor-pointer group"
          >
            <Disc3 className={`w-4 h-4 text-rose-400 ${isPlaying ? 'animate-spin' : ''}`} />
            <span>Rauf & Faik - Вечера</span>
          </button>
        ) : (
          <div className="bg-gradient-to-br from-[#2a0e22]/95 via-[#1a0818]/95 to-[#120512]/95 backdrop-blur-xl border border-rose-500/30 rounded-2xl p-3 shadow-2xl text-rose-100 flex flex-col gap-2.5">
            {/* Header info */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center shadow-md ${
                      isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
                    }`}
                  >
                    <Disc3 className="w-6 h-6 text-white" />
                  </div>
                  {isPlaying && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
                    </span>
                  )}
                </div>

                <div className="text-right">
                  <p className="text-xs font-bold text-rose-100 tracking-wide">
                    Вечера (Evenings)
                  </p>
                  <p className="text-[11px] text-rose-300/80 font-medium flex items-center gap-1">
                    <Music className="w-3 h-3 inline text-rose-400" />
                    Rauf & Faik
                  </p>
                </div>
              </div>

              {/* Minimize button */}
              <button
                onClick={() => setIsMinimized(true)}
                title="تصغير"
                className="text-rose-400/60 hover:text-rose-200 text-xs px-1.5 py-0.5 rounded cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Audio wave animation indicator */}
            <div className="flex items-center justify-center gap-1 h-3 px-2">
              {[0.4, 0.8, 0.3, 0.9, 0.5, 0.7, 0.4, 0.9, 0.6, 0.3, 0.8, 0.5].map((val, idx) => (
                <div
                  key={idx}
                  className="w-1 bg-rose-400/70 rounded-full transition-all duration-300"
                  style={{
                    height: isPlaying ? `${Math.max(3, val * 12)}px` : '3px',
                    animation: isPlaying
                      ? `pulse-slow ${0.6 + (idx % 4) * 0.2}s ease-in-out infinite alternate`
                      : 'none',
                  }}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between border-t border-rose-500/20 pt-2 gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={togglePlay}
                  className="p-1.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white shadow transition cursor-pointer"
                  title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 translate-x-[-0.5px]" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-rose-300 transition cursor-pointer"
                  title={isMuted ? 'إلغاء الكتم' : 'كتم'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => setShowLyrics(!showLyrics)}
                  className="text-[11px] px-2 py-1 rounded-md bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 transition cursor-pointer"
                >
                  <span>الكلمات</span>
                </button>
              </div>

              <a
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] text-rose-400/70 hover:text-rose-300 flex items-center gap-0.5"
                title="فتح على YouTube"
              >
                <span>يوتيوب</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>

            {/* Lyrics popup / accordion */}
            {showLyrics && (
              <div className="mt-2 p-2.5 rounded-xl bg-black/40 border border-rose-500/20 text-xs text-rose-200/90 leading-relaxed max-h-48 overflow-y-auto">
                <p className="font-semibold text-rose-300 text-center mb-1">
                  أغنية Вечера لـ Rauf & Faik
                </p>
                <div className="text-[11px] space-y-1 text-center font-amiri text-rose-100">
                  <p className="italic text-rose-300/80 font-sans">
                    «Я помню те вечера... Мы жили в хрущёвке вдвоём»
                  </p>
                  <p>«فاكر كل الأمسيات الحلوة اللي عشناها سوا.. ومهما بعدنا مكانك محفوظ ف قلبي»</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
