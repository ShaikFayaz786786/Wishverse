import { WishTemplate } from '../types'

export const WISH_TEMPLATES: WishTemplate[] = [
  // ==================== BIRTHDAYS ====================
  {
    id: 'birthday-milestone-21',
    name: '21st Milestone Birthday',
    category: 'Birthday',
    occasion: 'Birthday',
    title: 'Happy 21st Birthday, Emily! 🎂✨',
    recipientName: 'Emily',
    senderName: 'Your Closest Friends',
    message: `Happy 21st Birthday! Today marks the start of an extraordinary new chapter filled with unforgettable adventures, big dreams, and endless possibilities. 

May every door you open lead to happiness, and may you always keep your infectious sparkle and boundless energy. Cheers to celebrating YOU today and all the amazing memories ahead! 🥂✨`,
    theme: 'magical-starlight',
    animationPreset: 'cosmic-fireworks',
    badge: 'Trending',
    icon: '🎂',
    tags: ['birthday', '21st', 'milestone', 'celebration', 'party'],
  },
  {
    id: 'birthday-best-friend',
    name: 'Best Friend Forever Birthday',
    category: 'Birthday',
    occasion: 'Birthday',
    title: 'To My Absolute Favorite Human! 💖🎉',
    recipientName: 'Alex',
    senderName: 'Your Ride-or-Die',
    message: `Happy Birthday to the one who knows all my secrets, makes me laugh until my stomach hurts, and always has my back no matter what! 

I’m so grateful for every late-night talk, impromptu road trip, and spontaneous memory we’ve shared. Here's to another year of unstoppable laughter, unforgettable adventures, and conquering the world together! 🌟🥂`,
    theme: 'neon-cyberpunk',
    animationPreset: 'confetti-cascade',
    badge: 'Popular',
    icon: '👯',
    tags: ['bff', 'best friend', 'birthday', 'friendship', 'fun'],
  },
  {
    id: 'birthday-golden-decade',
    name: 'Golden 30th / 50th Milestone',
    category: 'Birthday',
    occasion: 'Birthday',
    title: 'Cheers to Your Golden Milestone! 🥂👑',
    recipientName: 'Michael',
    senderName: 'The Whole Family',
    message: `A truly remarkable milestone for an extraordinary person! Over the years, you’ve touched so many lives with your warmth, wisdom, generosity, and genuine kindness. 

May this milestone year bring you robust health, timeless joy, deep fulfillment, and grand new adventures. Keep shining like the gold you are! ✨🎂`,
    theme: 'golden-elegance',
    animationPreset: 'champagne-bubbles',
    badge: 'Luxury',
    icon: '👑',
    tags: ['milestone', '30th', '40th', '50th', 'luxury', 'family'],
  },
  {
    id: 'birthday-whimsical-bloom',
    name: 'Sweet Whimsical Birthday',
    category: 'Birthday',
    occasion: 'Birthday',
    title: 'Wishing You a Day as Sweet as You! 🌸🎈',
    recipientName: 'Sophia',
    senderName: 'With Love Always',
    message: `Wishing you a day overflowing with sweet surprises, your favorite treats, and the warmest smiles! 

May your upcoming year bloom with exciting opportunities, beautiful moments, and pure contentment. Never stop being the gentle, radiant soul that brightens every room you enter! 💐✨`,
    theme: 'cherry-blossom',
    animationPreset: 'cherry-petals',
    badge: 'Heartfelt',
    icon: '🌸',
    tags: ['sweet', 'blossom', 'cute', 'birthday', 'sister', 'daughter'],
  },

  // ==================== LOVE & ROMANCE ====================
  {
    id: 'love-romantic-valentine',
    name: 'Timeless Valentine Love Letter',
    category: 'Love & Romance',
    occasion: 'Valentine’s Day',
    title: 'To My One and Only Valentine 💖🌹',
    recipientName: 'My Beloved',
    senderName: 'Yours Forever',
    message: `From the moment you entered my life, every day has felt brighter, warmer, and infinitely more beautiful. You are my favorite thought, my safe harbor, and the greatest gift I could ever ask for. 

Thank you for loving me as I am and for turning ordinary moments into magical memories. Happy Valentine’s Day, my love—today, tomorrow, and forever. ❤️✨`,
    theme: 'romantic-blossom',
    animationPreset: 'gentle-hearts',
    badge: 'Romantic',
    icon: '❤️',
    tags: ['valentine', 'love', 'romance', 'partner', 'sweetheart'],
  },
  {
    id: 'love-proposal-forever',
    name: 'Proposal & Forever Promise',
    category: 'Love & Romance',
    occasion: 'Custom Wish',
    title: 'A Love Story Written in the Stars 💍✨',
    recipientName: 'My Soulmate',
    senderName: 'Your Love',
    message: `Looking into your eyes, I see my home, my present, and my entire future. You have given my life a purpose and joy that words can barely capture. 

I promise to stand by you in every storm, celebrate with you in every victory, and cherish you through every season of life. Will you walk this lifelong journey hand-in-hand with me? 💖💍`,
    theme: 'midnight-velvet',
    animationPreset: 'shooting-stars',
    badge: 'Special',
    icon: '💍',
    tags: ['proposal', 'promise', 'love', 'forever', 'stars'],
  },

  // ==================== WEDDINGS & ANNIVERSARIES ====================
  {
    id: 'wedding-fairytale-blessings',
    name: 'Fairytale Wedding Blessings',
    category: 'Weddings & Anniversaries',
    occasion: 'Wedding',
    title: 'Happily Ever After Begins Today! 🕊️💍',
    recipientName: 'The Beautiful Couple',
    senderName: 'Warmest Congratulations',
    message: `May your wedding day be the breathtaking start of a lifetime filled with deep companionship, shared laughter, and unwavering love! 

As you unite your hearts and build a home together, may every passing year deepen your bond and multiply your blessings. Wishing you endless happiness in your new fairytale! 🥂✨`,
    theme: 'golden-elegance',
    animationPreset: 'floating-sparkles',
    badge: 'Celebration',
    icon: '🕊️',
    tags: ['wedding', 'marriage', 'couple', 'blessings', 'bride', 'groom'],
  },
  {
    id: 'anniversary-silver-golden',
    name: 'Silver & Golden Anniversary',
    category: 'Weddings & Anniversaries',
    occasion: 'Anniversary',
    title: 'Celebrating Years of True Love & Harmony 🥂❤️',
    recipientName: 'Mom & Dad',
    senderName: 'With Immense Love & Respect',
    message: `Watching your journey together is the truest definition of loyalty, dedication, and everlasting love. You’ve weathered storms with grace and celebrated joys with pure gratitude. 

Thank you for setting the gold standard of what a partnership should be. Happy Anniversary, and may your love continue to grow even sweeter with each passing day! 🌟💑`,
    theme: 'ruby-royalty',
    animationPreset: 'gentle-hearts',
    badge: 'Milestone',
    icon: '💑',
    tags: ['anniversary', 'parents', 'couple', 'golden', 'silver', 'love'],
  },

  // ==================== CAREER & MILESTONES ====================
  {
    id: 'career-graduation-victory',
    name: 'Graduation & Bright Future',
    category: 'Career & Milestones',
    occasion: 'Graduation',
    title: 'You Did It! The World is Yours! 🎓🚀',
    recipientName: 'Graduate',
    senderName: 'So Incredibly Proud',
    message: `All the late-night study sessions, perseverance, and hard work have led to this triumphant moment! You earned this cap and gown with flying colors. 

As you step into the world, believe in your talent, trust your instincts, and never stop reaching for the stars. The best is yet to come! 🌟🎓`,
    theme: 'celestial-dream',
    animationPreset: 'confetti-cascade',
    badge: 'Success',
    icon: '🎓',
    tags: ['graduation', 'college', 'degree', 'success', 'proud'],
  },
  {
    id: 'career-promotion-new-job',
    name: 'Promotion & New Job Triumph',
    category: 'Career & Milestones',
    occasion: 'Congratulations',
    title: 'Congratulations on Your Big Promotion! 💼🔥',
    recipientName: 'Champion',
    senderName: 'Your Biggest Cheerleaders',
    message: `Huge congratulations on your well-deserved career achievement! Your relentless dedication, leadership, and brilliance have paved the path to this well-earned victory. 

We have zero doubts that you will excel in this new role and set new benchmarks of success. Celebrate big—you earned every bit of this! 🍾🚀`,
    theme: 'aurora-borealis',
    animationPreset: 'shooting-stars',
    badge: 'Career',
    icon: '💼',
    tags: ['promotion', 'new job', 'career', 'corporate', 'success'],
  },
  {
    id: 'career-startup-venture',
    name: 'New Venture & Startup Launch',
    category: 'Career & Milestones',
    occasion: 'Congratulations',
    title: 'To Daring Dreams & Bold New Beginnings! 🚀✨',
    recipientName: 'Founder',
    senderName: 'Cheering You On',
    message: `It takes immense courage and vision to build something new from the ground up! May your new business venture thrive, inspire, and scale beyond your wildest expectations. 

May resilience guide your challenging days and groundbreaking victories illuminate your journey. Here’s to building the future! 🥂🌟`,
    theme: 'neon-cyberpunk',
    animationPreset: 'cosmic-fireworks',
    badge: 'Inspiring',
    icon: '🚀',
    tags: ['startup', 'entrepreneur', 'launch', 'business', 'venture'],
  },
  {
    id: 'career-retirement-tribute',
    name: 'Golden Retirement Tribute',
    category: 'Career & Milestones',
    occasion: 'Congratulations',
    title: 'Happy Retirement! Your Legacy Lives On 🌴☀️',
    recipientName: 'Dear Colleague / Mentor',
    senderName: 'With Deep Appreciation',
    message: `After decades of extraordinary contributions, wisdom, and leadership, it’s time to trade deadlines for relaxed mornings and new hobbies! 

Thank you for being such an inspiring mentor and teammate. May your retirement be filled with leisurely travels, good health, and the company of loved ones. You will be dearly missed! 🍹🌺`,
    theme: 'autumn-whisper',
    animationPreset: 'floating-balloons',
    badge: 'Honor',
    icon: '🌴',
    tags: ['retirement', 'farewell', 'work', 'mentor', 'rest'],
  },

  // ==================== HOLIDAYS & FESTIVALS ====================
  {
    id: 'holiday-new-year-2026',
    name: 'Spectacular New Year Celebration',
    category: 'Holidays & Festivals',
    occasion: 'New Year',
    title: 'Happy New Year! 365 Days of Pure Magic! 🎆✨',
    recipientName: 'Everyone',
    senderName: 'Warmest Wishes',
    message: `As the clock strikes midnight and a brand-new year unfolds, may it bring you fresh hope, good health, roaring prosperity, and boundless moments of joy! 

Leave behind what was, embrace what will be, and make every single second count. Here is to making this year the most memorable and victorious one yet! 🥂🎆`,
    theme: 'magical-starlight',
    animationPreset: 'cosmic-fireworks',
    badge: 'Festive',
    icon: '🎆',
    tags: ['new year', '2026', 'celebration', 'party', 'fireworks'],
  },
  {
    id: 'holiday-christmas-wonder',
    name: 'Cozy Christmas & Winter Glow',
    category: 'Holidays & Festivals',
    occasion: 'Christmas',
    title: 'Merry Christmas & Joyous Holidays! 🎄❄️',
    recipientName: 'Dearest Family & Friends',
    senderName: 'With Holiday Cheer',
    message: `May the spirit of Christmas fill your home with harmony, your heart with boundless love, and your life with laughter and cheer! 

May you enjoy cozy evenings by the fireplace, delicious holiday feasts, and cherished moments with those who matter most. Wishing you a peaceful and truly magical holiday season! 🎅✨`,
    theme: 'ruby-royalty',
    animationPreset: 'snowfall-magic',
    badge: 'Cozy',
    icon: '🎄',
    tags: ['christmas', 'xmas', 'holidays', 'winter', 'snow'],
  },
  {
    id: 'holiday-diwali-lights',
    name: 'Diwali Festival of Lights',
    category: 'Holidays & Festivals',
    occasion: 'Diwali',
    title: 'Happy Diwali! May Light Fill Your Life 🪔✨',
    recipientName: 'Dear Ones',
    senderName: 'With Warmest Festive Blessings',
    message: `Wishing you and your family a dazzling and blessed Diwali! May the divine glow of Diyas illuminate your path toward endless happiness, radiant health, and abundant wealth. 

May the sweetness of festive treats and the warmth of family bonds bring everlasting delight to your home. Shubh Deepavali! 🪔🌟`,
    theme: 'golden-elegance',
    animationPreset: 'floating-lanterns',
    badge: 'Festive',
    icon: '🪔',
    tags: ['diwali', 'deepavali', 'lights', 'festival', 'diyas'],
  },
  {
    id: 'holiday-eid-mubarak',
    name: 'Eid Mubarak Blessings & Peace',
    category: 'Holidays & Festivals',
    occasion: 'Eid Mubarak',
    title: 'Eid Mubarak! Peace, Joy & Harmony 🌙✨',
    recipientName: 'Dear Family & Friends',
    senderName: 'With Sincere Prayers',
    message: `Eid Mubarak to you and your loved ones! May this holy celebration bring peace to your mind, warmth to your home, and divine prosperity to your family. 

May all your prayers be answered and may your life be enriched with love, harmony, and gratitude. Have a blessed and joyful Eid! 🌙🕌`,
    theme: 'emerald-enchantment',
    animationPreset: 'firefly-dance',
    badge: 'Blessed',
    icon: '🌙',
    tags: ['eid', 'mubarak', 'ramadan', 'festival', 'peace'],
  },
  {
    id: 'holiday-thanksgiving-gratitude',
    name: 'Thanksgiving & Grateful Hearts',
    category: 'Holidays & Festivals',
    occasion: 'Thank You',
    title: 'Grateful for You This Season 🍂🦃',
    recipientName: 'Dear Friends & Family',
    senderName: 'With Deepest Gratitude',
    message: `At this season of reflection and Thanksgiving, having you in my life is one of my greatest blessings! 

Thank you for your steady support, your kindness, and all the warm memories we create together. May your holiday table be blessed with bounty and your days surrounded by love. 🍁🥧`,
    theme: 'autumn-whisper',
    animationPreset: 'firefly-dance',
    badge: 'Warm',
    icon: '🍂',
    tags: ['thanksgiving', 'gratitude', 'autumn', 'harvest', 'thank you'],
  },

  // ==================== CARE & GRATITUDE ====================
  {
    id: 'care-mothers-day',
    name: 'Mother’s Day Eternal Love',
    category: 'Care & Gratitude',
    occasion: 'Mother’s Day',
    title: 'To the Most Amazing Mom in the Universe 🌸💖',
    recipientName: 'Dearest Mom',
    senderName: 'Your Loving Child',
    message: `Thank you for your infinite patience, unconditional love, and the countless sacrifices you make every single day. Your warm embrace is my safest home and your wisdom is my guiding star. 

I am who I am today because of you. Wishing you a day as wonderful, loving, and beautiful as your heart! Happy Mother’s Day! 💐❤️`,
    theme: 'cherry-blossom',
    animationPreset: 'cherry-petals',
    badge: 'Heartfelt',
    icon: '💐',
    tags: ['mom', 'mother', 'mothers day', 'family', 'love'],
  },
  {
    id: 'care-fathers-day',
    name: 'Father’s Day Pillar of Strength',
    category: 'Care & Gratitude',
    occasion: 'Father’s Day',
    title: 'To My Hero, Mentor & Greatest Dad 👑💙',
    recipientName: 'Dear Dad',
    senderName: 'With Utmost Respect & Love',
    message: `Happy Father’s Day to my rock and greatest role model! Thank you for teaching me how to stand tall, work hard, and treat others with kindness. 

Your quiet strength and steady guidance have made all the difference in my life. I’m endlessly proud to be your child! 🌟🛡️`,
    theme: 'ocean-breeze',
    animationPreset: 'floating-sparkles',
    badge: 'Respect',
    icon: '👑',
    tags: ['dad', 'father', 'fathers day', 'hero', 'mentor'],
  },
  {
    id: 'care-get-well-soon',
    name: 'Get Well Soon & Warm Recovery',
    category: 'Care & Gratitude',
    occasion: 'Get Well Soon',
    title: 'Sending Healing Thoughts & Big Hugs! 🌼🍵',
    recipientName: 'Dear Friend',
    senderName: 'Thinking of You',
    message: `Sending you the warmest rays of sunshine, healing energy, and gentle hugs as you recover! 

Please take all the time you need to rest, recuperate, and recharge. We are all rooting for you and can’t wait to see your bright smile and vibrant self back very soon! Get well quickly! 🌸✨`,
    theme: 'lavender-haze',
    animationPreset: 'pulsing-glow',
    badge: 'Comfort',
    icon: '🌼',
    tags: ['get well', 'health', 'recovery', 'comfort', 'healing'],
  },
  {
    id: 'care-baby-shower',
    name: 'Baby Shower & Little Miracle',
    category: 'Care & Gratitude',
    occasion: 'Baby Shower',
    title: 'Welcome to the World, Little Miracle! 🍼🎈',
    recipientName: 'The Proud Parents',
    senderName: 'With Tender Love',
    message: `A precious bundle of joy is on the way to fill your lives with sweet lullabies, tiny footprints, and boundless love! 

May your home be filled with peaceful sleep, heartwarming baby giggles, and unforgettable firsts. Congratulations on embarking on the sweetest adventure of parenthood! 👶🍼✨`,
    theme: 'lavender-haze',
    animationPreset: 'floating-balloons',
    badge: 'Sweet',
    icon: '👶',
    tags: ['baby', 'baby shower', 'newborn', 'parents', 'cute'],
  },
  {
    id: 'care-farewell-good-luck',
    name: 'Bittersweet Farewell & Good Luck',
    category: 'Care & Gratitude',
    occasion: 'Farewell & Good Luck',
    title: 'Farewell & Best Wishes on Your Journey! ✈️🌍',
    recipientName: 'Adventurer',
    senderName: 'Your Friends Back Home',
    message: `It’s never easy saying goodbye, but we are thrilled for the incredible new journey and horizons waiting for you! 

Thank you for all the laughter, camaraderie, and fantastic memories. Go chase those big dreams with full confidence—we will be cheering you on from afar! Stay in touch always! 🌟✈️`,
    theme: 'sunset-glow',
    animationPreset: 'shooting-stars',
    badge: 'Voyage',
    icon: '✈️',
    tags: ['farewell', 'goodbye', 'bon voyage', 'travel', 'new journey'],
  },
  {
    id: 'care-housewarming',
    name: 'Housewarming & Cozy Home',
    category: 'Care & Gratitude',
    occasion: 'Housewarming',
    title: 'Congratulations on Your Beautiful New Home! 🏡🗝️',
    recipientName: 'New Homeowners',
    senderName: 'Warmest Neighbors & Friends',
    message: `May your new home be a sanctuary of peace, a playground of laughter, and a haven of unforgettable gatherings with family and friends! 

May every room hold happy moments and every doorway open to prosperity and sweet comfort. Congratulations on turning this house into your dream home! 🗝️✨`,
    theme: 'emerald-enchantment',
    animationPreset: 'firefly-dance',
    badge: 'New Home',
    icon: '🏡',
    tags: ['housewarming', 'home', 'new house', 'cozy', 'blessings'],
  },
]

export const TEMPLATE_CATEGORIES = [
  'All',
  'Birthday',
  'Love & Romance',
  'Weddings & Anniversaries',
  'Career & Milestones',
  'Holidays & Festivals',
  'Care & Gratitude',
] as const
