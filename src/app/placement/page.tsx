import type { Metadata } from 'next';
import PlacementClient from './PlacementClient';

export const metadata: Metadata = {
  title: '起點測驗 | 冒險英語',
  description: '10 題小測驗，記下孩子現在的英文起點，之後再測一次就看得出進步多少。',
};

export default function PlacementPage() {
  return <PlacementClient />;
}
