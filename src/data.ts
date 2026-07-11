export type QuoteServiceType = 'house' | 'driveway' | 'deck' | 'fence' | 'full_package';
export type DirtLevelType = 'light' | 'medium' | 'heavy';

export const FALLBACK_ASSETS: Record<string, string> = {
  '/assets/house_siding_beforeafter.png': 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80',
  '/assets/driveway_clean_beforeafter.png': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
  '/assets/composite_deck_washed.jpg': 'https://images.unsplash.com/photo-1595514535315-99df946892e8?auto=format&fit=crop&w=1200&q=80',
  '/assets/concrete_patio_beforeafter.jpg': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  '/assets/patio_dirt_washing.png': 'https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&w=1200&q=80',
  '/assets/bricksteps_beforeafter.jpg': 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80',
  '/assets/front_walkway_beforeafter.jpg': 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
  '/assets/brick_chimney_beforeafter.png': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
  '/assets/hero_background_video.MOV': 'https://assets.mixkit.co/videos/preview/mixkit-man-cleaning-the-entrance-of-his-house-with-pressure-washer-40156-large.mp4',
};

export const SERVICE_OPTIONS = [
  { value: 'house' as QuoteServiceType, label: 'House Siding Wash' },
  { value: 'driveway' as QuoteServiceType, label: 'Driveway & Walkway Clean' },
  { value: 'deck' as QuoteServiceType, label: 'Deck & Patio Restorations' },
  { value: 'fence' as QuoteServiceType, label: 'Fence Pressure Washing' },
  { value: 'full_package' as QuoteServiceType, label: 'Full House Exterior Makeover' },
];

export const SERVICE_DETAILS = [
  {
    title: 'House Washing',
    description:
      'Our low pressure chemical soft wash relies on specialized biodegradable detergents to safely melt away moss, thick black mold, and green roof/siding algae. Perfect for vinyl, cedar shakes, wood panels, and hardie planks.',
    image: '/assets/house_siding_beforeafter.png',
    isSplit: true,
  },
  {
    title: 'Driveway and Sidewalk Cleaning',
    description:
      'High-powered surface clean machinery spins intense water jets directly against ground surfaces to evenly extract deep grimy grey mud, dark grease stains, weeds in joint lines, and weathered concrete shadows.',
    image: '/assets/driveway_clean_beforeafter.png',
    isSplit: true,
  },
  {
    title: 'Patio Cleaning',
    description:
      'Restore outdoor patio surfaces safely. By optimizing the distance and water-to-soap ratio, we remove slippage risks, green algae layers, and decaying organic foliage elements cleanly.',
    image: '/assets/concrete_patio_beforeafter.jpg',
    isSplit: true,
  },
  {
    title: 'Wood Deck Cleaning',
    description:
      'Restore wood deck surfaces and brighten aged boards without damaging the deck structure or fasteners. Our gentle cleaning process removes mildew, mold, and old stains while preserving the wood grain.',
    image: '/assets/composite_deck_washed.jpg',
    isSplit: true,
  },
  {
    title: 'Pathway & Stone Wash Detailing',
    description:
      'Our high PSI rotary surface scoured pathways return weathered stone, pathways and garden steps to pristine condition. Programmatically cleans away years of moss.',
    image: '/assets/patio_dirt_washing.png',
    isSplit: false,
  },
  {
    title: 'Brick Steps Restoration',
    description:
      'Restore brick steps with careful pressure washing that removes grime, moss, and mineral buildup while preserving masonry joints and preventing erosion. This service refreshes the look of entry stairs and improves curb appeal on every property.',
    image: '/assets/bricksteps_beforeafter.jpg',
    isSplit: true,
  },
];

export const TESTIMONIALS = [
  {
    name: 'Jason Mathews',
    location: 'Cape Cod, MA resident',
    date: 'July 2026',
    text:
      "Max and his crew did a solid job on my patio. Didn't think it would ever come clean, but it looks brand new now. They showed up on time, got the work done, and didn't leave a mess. Definitely recommend if you need your place cleaned up.",
    image: '/assets/concrete_patio_beforeafter.jpg',
    isSplit: true,
  },
  {
    name: 'Tyler McCarthy',
    location: 'Cape Cod, MA resident',
    date: 'June 2026',
    text:
      "Called them up to handle the front walkway. They came through and got the stone looking sharp again. Huge difference from how it looked before. Nice guys, showed up when they said they would, and got it finished without any hassle. Probably going to use them again when I need a touch-up.",
    image: '/assets/front_walkway_beforeafter.jpg',
    isSplit: true,
  },
  {
    name: 'Jack Sweeney',
    location: 'Somers CT resident',
    date: 'June 2026',
    text:
      "Pretty stoked with how the chimney turned out. Was definitely skeptical at first because it was pretty neglected, but it looks awesome now. Solid work, quick turnaround, and no BS. I'll definitely have them back out when it gets dirty again.",
    image: '/assets/brick_chimney_beforeafter.png',
    isSplit: true,
  },
];
