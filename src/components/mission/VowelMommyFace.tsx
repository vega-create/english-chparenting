'use client';

// 母音媽媽的臉：a·e 眼睛、i 鼻子、o 嘴巴、u 臉輪廓
// 用 SVG 畫（不用外部圖檔），可縮放、可重複用。size 控制大小。
interface Props {
  size?: number;
  showLabels?: boolean;
  className?: string;
}

export default function VowelMommyFace({ size = 200, showLabels = false, className = '' }: Props) {
  const w = showLabels ? 340 : 200;
  const h = showLabels ? 240 : 240;
  return (
    <svg
      width={size}
      height={(size * h) / w}
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label="母音媽媽的臉，由 a e i o u 組成"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>母音媽媽 a e i o u</title>
      {(() => {
        const cx = showLabels ? 145 : 100;
        return (
          <g>
            {/* u ＝ 臉的輪廓 */}
            <path
              d={`M ${cx - 60},30 L ${cx - 60},130 Q ${cx - 60},185 ${cx},185 Q ${cx + 60},185 ${cx + 60},130 L ${cx + 60},30`}
              fill="#FFE4EC"
              stroke="#F48FB1"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* u 的小寫尾巴 */}
            <path
              d={`M ${cx + 60},130 L ${cx + 60},182 Q ${cx + 60},200 ${cx + 78},200`}
              fill="none"
              stroke="#F48FB1"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* a e ＝ 眼睛 */}
            <text x={cx - 26} y="95" fontFamily="Georgia, serif" fontSize="44" fontWeight="700" fill="#EC407A" textAnchor="middle">a</text>
            <text x={cx + 26} y="95" fontFamily="Georgia, serif" fontSize="44" fontWeight="700" fill="#EC407A" textAnchor="middle">e</text>
            {/* i ＝ 鼻子 */}
            <text x={cx} y="135" fontFamily="Georgia, serif" fontSize="40" fontWeight="700" fill="#AB47BC" textAnchor="middle">i</text>
            {/* o ＝ 嘴巴 */}
            <text x={cx} y="176" fontFamily="Georgia, serif" fontSize="38" fontWeight="700" fill="#EF5350" textAnchor="middle">o</text>
            {/* u 標記 */}
            <text x={cx} y="212" fontFamily="Georgia, serif" fontSize="17" fontWeight="700" fill="#F06292" textAnchor="middle">u（臉的輪廓）</text>

            {showLabels && (
              <g>
                <line x1={cx - 62} y1="80" x2="60" y2="80" stroke="#F8BBD0" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="54" y="85" fontFamily="sans-serif" fontSize="13" fill="#9E9E9E" textAnchor="end">a·e 眼睛</text>
                <line x1={cx + 30} y1="128" x2={cx + 130} y2="128" stroke="#F8BBD0" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x={cx + 136} y="133" fontFamily="sans-serif" fontSize="13" fill="#9E9E9E" textAnchor="start">i 鼻子</text>
                <line x1={cx + 30} y1="168" x2={cx + 130} y2="168" stroke="#F8BBD0" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x={cx + 136} y="173" fontFamily="sans-serif" fontSize="13" fill="#9E9E9E" textAnchor="start">o 嘴巴</text>
              </g>
            )}
          </g>
        );
      })()}
    </svg>
  );
}
