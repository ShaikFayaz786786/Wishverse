import { ThemeDefinition, AnimationDefinition } from '../types'

export const OCCASIONS = [
  'Birthday',
  'Anniversary',
  'Valentine’s Day',
  'Graduation',
  'New Year',
  'Wedding',
  'Congratulations',
  'Thank You',
  'Holiday & Festivity',
  'Thinking of You',
  'Custom Wish',
]

export const THEMES: ThemeDefinition[] = [
  {
    id: 'magical-starlight',
    name: 'Magical Starlight',
    description: 'Deep cosmic violet, glowing star dust, and ethereal aura.',
    previewGradient: 'linear-gradient(135deg, #1b0a2a 0%, #2e1065 50%, #4c1d95 100%)',
    accentColor: '#c084fc',
    badge: 'Popular',
  },
  {
    id: 'sunset-glow',
    name: 'Sunset Glow',
    description: 'Warm amber, golden hour radiance, and soothing rose tones.',
    previewGradient: 'linear-gradient(135deg, #450a0a 0%, #7c2d12 50%, #f97316 100%)',
    accentColor: '#fb923c',
    badge: 'Warm',
  },
  {
    id: 'neon-cyberpunk',
    name: 'Neon Cyberpunk',
    description: 'Electric magenta, neon cyan flares, and dark futuristic pulse.',
    previewGradient: 'linear-gradient(135deg, #09090b 0%, #0369a1 50%, #d946ef 100%)',
    accentColor: '#38bdf8',
    badge: 'Vibrant',
  },
  {
    id: 'romantic-blossom',
    name: 'Romantic Blossom',
    description: 'Soft rose petals, delicate blush quartz, and warm elegance.',
    previewGradient: 'linear-gradient(135deg, #3b0764 0%, #831843 50%, #f43f5e 100%)',
    accentColor: '#fb7185',
    badge: 'Love',
  },
  {
    id: 'golden-elegance',
    name: 'Golden Elegance',
    description: 'Midnight obsidian, brushed gold luxury, and champagne sparkle.',
    previewGradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #ca8a04 100%)',
    accentColor: '#facc15',
    badge: 'Luxury',
  },
  {
    id: 'celestial-dream',
    name: 'Celestial Dream',
    description: 'Deep abyss teal, emerald nebula clouds, and shimmering auroras.',
    previewGradient: 'linear-gradient(135deg, #022c22 0%, #064e3b 50%, #0d9488 100%)',
    accentColor: '#2dd4bf',
    badge: 'Dreamy',
  },
]

export const ANIMATIONS: AnimationDefinition[] = [
  {
    id: 'floating-sparkles',
    name: 'Floating Sparkles',
    description: 'Glimmering star particles drifting across the background.',
    icon: '✨',
  },
  {
    id: 'confetti-cascade',
    name: 'Confetti Cascade',
    description: 'Joyful celebration confetti falling across the screen.',
    icon: '🎉',
  },
  {
    id: 'gentle-hearts',
    name: 'Gentle Hearts',
    description: 'Soft floating romantic hearts rising gracefully.',
    icon: '💖',
  },
  {
    id: 'cosmic-fireworks',
    name: 'Cosmic Fireworks',
    description: 'Bursting light rays and glowing celestial fireworks.',
    icon: '🎆',
  },
  {
    id: 'floating-balloons',
    name: 'Celebration Balloons',
    description: 'Colorful festive balloons swaying in the breeze.',
    icon: '🎈',
  },
  {
    id: 'pulsing-glow',
    name: 'Pulsing Glow',
    description: 'Hypnotic ambient radial light pulses and color shifts.',
    icon: '🌟',
  },
]
