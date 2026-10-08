import React from 'react';

type EmojiType = 'heart' | 'mending_heart' | 'rose' | 'sparkling_heart' | 'white_heart';

const EMOJI_MAP: Record<EmojiType, string> = {
  heart: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/2764-fe0f.png',
  mending_heart: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/2764-fe0f-200d-1fa79.png',
  rose: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f339.png',
  sparkling_heart: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f496.png',
  white_heart: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f90d.png',
};

interface AppleEmojiProps {
  type: EmojiType;
  className?: string;
  size?: number;
}

export const AppleEmoji: React.FC<AppleEmojiProps> = ({ type, className = '', size = 22 }) => {
  return (
    <img
      src={EMOJI_MAP[type]}
      alt={type}
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`inline-block align-middle select-none pointer-events-none drop-shadow-sm ${className}`}
      loading="lazy"
    />
  );
};
