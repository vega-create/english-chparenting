'use client';

type CharacterName = 'finn' | 'coco' | 'polly' | 'benny' | 'ruby';
type CharacterAction = 'normal' | 'wave' | 'happy' | 'talk' | 'thumbsup' | 'listen' | 'clap' | 'sing' | 'cheer' | 'read' | 'think' | 'write' | 'star';

interface CharacterImageProps {
  name: CharacterName;
  action?: CharacterAction;
  size?: number; // px
  className?: string;
  animate?: 'bounce' | 'wave' | 'pulse' | 'none';
  flip?: boolean; // 左右翻轉
}

const actionMap: Record<CharacterName, string[]> = {
  finn: ['normal', 'wave', 'happy', 'talk', 'thumbsup'],
  coco: ['normal', 'wave', 'listen', 'talk', 'clap'],
  polly: ['normal', 'wave', 'sing', 'talk', 'cheer'],
  benny: ['normal', 'wave', 'read', 'talk', 'think'],
  ruby: ['normal', 'wave', 'write', 'talk', 'star'],
};

export default function CharacterImage({
  name,
  action = 'normal',
  size = 80,
  className = '',
  animate = 'none',
  flip = false,
}: CharacterImageProps) {
  // Fallback to normal if action doesn't exist for this character
  const validActions = actionMap[name] || ['normal'];
  const validAction = validActions.includes(action) ? action : 'normal';

  const src = `/characters/${name}/${name}-${validAction}.png`;

  const animationClass =
    animate === 'bounce' ? 'animate-bounce' :
    animate === 'wave' ? 'animate-wiggle' :
    animate === 'pulse' ? 'animate-pulse' :
    '';

  return (
    <img
      src={src}
      alt={`${name} ${validAction}`}
      width={size}
      height={size}
      className={`inline-block object-contain ${animationClass} ${className}`}
      style={{
        width: size,
        height: size,
        transform: flip ? 'scaleX(-1)' : undefined,
      }}
      draggable={false}
    />
  );
}

// Helper: get all character names
export const CHARACTER_NAMES: CharacterName[] = ['finn', 'coco', 'polly', 'benny', 'ruby'];

// Helper: map display name to CharacterName
export function getCharacterKey(displayName: string): CharacterName {
  const map: Record<string, CharacterName> = {
    'Finn': 'finn',
    'Coco': 'coco',
    'Polly': 'polly',
    'Benny': 'benny',
    'Ruby': 'ruby',
  };
  return map[displayName] || 'finn';
}
