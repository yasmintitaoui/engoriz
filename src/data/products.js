import tysonismFront from '../assets/products/tees/tysonism/front.png'
import tysonismBack from '../assets/products/tees/tysonism/back.png'

import gtdFront from '../assets/products/tees/gtd/front.png'
import gtdBack from '../assets/products/tees/gtd/back.png'

import worldSaversFront from '../assets/products/tees/world-savers/front.png'
import worldSaversBack from '../assets/products/tees/world-savers/back.png'

import armageddonFront from '../assets/products/tees/armageddon/front.png'
import armageddonBack from '../assets/products/tees/armageddon/back.png'

import brentFront from '../assets/products/tees/brent/front.png'
import brentBack from '../assets/products/tees/brent/back.png'

import immuneFront from '../assets/products/tees/immune-bs/front.jpeg'
import immuneBack from '../assets/products/tees/immune-bs/back.jpeg'

import lostFront from '../assets/products/tees/lost-in-the-desert/front.png'
import lostBack from '../assets/products/tees/lost-in-the-desert/back.png'

import rudeFront from '../assets/products/tees/rude-man/front.png'
import rudeBack from '../assets/products/tees/rude-man/back.png'

import unicornFront from '../assets/products/tees/unicorn-tyler/front.jpeg'
import mawjoudFront from '../assets/products/tees/mawjoud/front.png'

import lovePainBlack from '../assets/products/tees/love-pain/front-black.png'
import lovePainWhite from '../assets/products/tees/love-pain/front-white.png'

import loveV2BlackGrey from '../assets/products/tees/love-pain-v2/black-grey.png'
import loveV2WhiteBlack from '../assets/products/tees/love-pain-v2/white-black.png'
import loveV2WhitePink from '../assets/products/tees/love-pain-v2/white-pink.png'
import loveV2CreamBrown from '../assets/products/tees/love-pain-v2/cream-brown.png'

const commonSizes = ['S', 'M', 'L', 'XL', 'XXL']
const commonFits = ['Regular', 'Cropped']

const commonDetails = [
  'Heavy cotton feel',
  'Made by demand',
  'Cash on delivery available',
]

const products = [
  {
    id: 1,
    name: 'LOVE PAIN TEE',
    slug: 'love-pain',
    price: 249,
    compareAt: 300,
    collection: 'SS26 DROP 02',
    dropName: 'LOVE PAIN CAPSULE',
    featured: true,
    bestseller: true,
    newArrival: true,
    colors: [
      { name: 'Black / Red', hex: '#111111', accent: '#8b1111' },
      { name: 'White / Red', hex: '#fafafa', accent: '#8b1111' },
    ],
    sizes: commonSizes,
    fits: commonFits,
    description: 'Love Pain graphic tee. Made by demand after order confirmation.',
    details: commonDetails,
    images: {
      front: lovePainBlack,
      back: lovePainWhite,
    },
    imagesByColor: {
      'Black / Red': { front: lovePainBlack, back: lovePainWhite },
      'White / Red': { front: lovePainWhite, back: lovePainBlack },
    },
  },

  {
    id: 2,
    name: 'LOVE PAIN TEE V2',
    slug: 'love-pain-v2',
    price: 229,
    compareAt: 249,
    collection: 'SS26 DROP 02',
    dropName: 'LOVE PAIN CAPSULE',
    featured: true,
    bestseller: true,
    newArrival: true,
    colors: [
      { name: 'Black / Grey', hex: '#111111', accent: '#666666' },
      { name: 'White / Black', hex: '#fafafa', accent: '#111111' },
      { name: 'White / Pink', hex: '#fafafa', accent: '#f2a8bd' },
      { name: 'Cream / Brown', hex: '#f4efe6', accent: '#7a5a27' },
    ],
    sizes: commonSizes,
    fits: commonFits,
    description: 'Love Pain capsule V2 graphic tee. Made by demand after order confirmation.',
    details: commonDetails,
    images: {
      front: loveV2BlackGrey,
      back: loveV2WhiteBlack,
    },
    imagesByColor: {
      'Black / Grey': { front: loveV2BlackGrey, back: loveV2WhiteBlack },
      'White / Black': { front: loveV2WhiteBlack, back: loveV2BlackGrey },
      'White / Pink': { front: loveV2WhitePink, back: loveV2BlackGrey },
      'Cream / Brown': { front: loveV2CreamBrown, back: loveV2BlackGrey },
    },
  },

  {
    id: 3,
    name: 'TYSONISM BLACK OVERSIZED TEE',
    slug: 'tysonism',
    price: 229,
    compareAt: 249,
    collection: 'SS26 DROP 01',
    featured: true,
    bestseller: true,
    colors: [{ name: 'Black / White', hex: '#111111', accent: '#f5f5f5' }],
    sizes: commonSizes,
    fits: commonFits,
    description: 'Tysonism graphic tee. Made by demand after order confirmation.',
    details: commonDetails,
    images: {
      front: tysonismFront,
      back: tysonismBack,
    },
  },

  {
    id: 4,
    name: 'GTD INSPIRED BLACK OVERSIZED TEE',
    slug: 'gtd',
    price: 229,
    compareAt: 249,
    collection: 'SS26 DROP 01',
    featured: true,
    bestseller: true,
    colors: [{ name: 'Black / Gold', hex: '#111111', accent: '#b59a45' }],
    sizes: commonSizes,
    fits: commonFits,
    description: 'GTD inspired graphic tee. Made by demand after order confirmation.',
    details: commonDetails,
    images: {
      front: gtdFront,
      back: gtdBack,
    },
  },

  {
    id: 5,
    name: 'WORLD SAVERS BLACK OVERSIZED TEE',
    slug: 'world-savers',
    price: 229,
    compareAt: 249,
    collection: 'SS26 DROP 01',
    featured: true,
    bestseller: true,
    colors: [{ name: 'Black / White', hex: '#111111', accent: '#f5f5f5' }],
    sizes: commonSizes,
    fits: commonFits,
    description: 'World Savers graphic tee. Made by demand after order confirmation.',
    details: commonDetails,
    images: {
      front: worldSaversFront,
      back: worldSaversBack,
    },
  },

  {
    id: 6,
    name: 'ARMAGEDDON PINK / WHITE TEE',
    slug: 'armageddon',
    price: 229,
    compareAt: 249,
    collection: 'SS26 DROP 01',
    featured: true,
    colors: [{ name: 'White / Pink', hex: '#fafafa', accent: '#d8a2c8' }],
    sizes: commonSizes,
    fits: commonFits,
    description: 'Armageddon graphic tee. Made by demand after order confirmation.',
    details: commonDetails,
    images: {
      front: armageddonFront,
      back: armageddonBack,
    },
  },

  {
    id: 7,
    name: 'BRENT OVERSIZED TEE',
    slug: 'brent',
    price: 229,
    compareAt: 249,
    collection: 'SS26 DROP 01',
    featured: true,
    newArrival: true,
    colors: [{ name: 'White / Black', hex: '#fafafa', accent: '#111111' }],
    sizes: commonSizes,
    fits: commonFits,
    description: 'Brent graphic tee. Made by demand after order confirmation.',
    details: commonDetails,
    images: {
      front: brentFront,
      back: brentBack,
    },
  },

  {
    id: 8,
    name: 'IMMUNE AGAINST B.S.S.S TEE',
    slug: 'immune-bs',
    price: 229,
    compareAt: 249,
    collection: 'SS26 DROP 01',
    featured: true,
    colors: [{ name: 'White / Black', hex: '#fafafa', accent: '#111111' }],
    sizes: commonSizes,
    fits: commonFits,
    description: 'Immune Against B.S.S.S graphic tee. Made by demand after order confirmation.',
    details: commonDetails,
    images: {
      front: immuneFront,
      back: immuneBack,
    },
  },

  {
    id: 9,
    name: 'LOST IN THE DESERT TEE',
    slug: 'lost-in-the-desert',
    price: 229,
    compareAt: 249,
    collection: 'SS26 DROP 01',
    featured: true,
    newArrival: true,
    colors: [{ name: 'Black / White', hex: '#111111', accent: '#f5f5f5' }],
    sizes: commonSizes,
    fits: commonFits,
    description: 'Lost In The Desert graphic tee. Made by demand after order confirmation.',
    details: commonDetails,
    images: {
      front: lostFront,
      back: lostBack,
    },
  },

  {
    id: 10,
    name: 'RUDE MAN BLACK OVERSIZED TEE',
    slug: 'rude-man',
    price: 229,
    compareAt: 249,
    collection: 'SS26 DROP 01',
    featured: true,
    colors: [{ name: 'Black / White', hex: '#111111', accent: '#f5f5f5' }],
    sizes: commonSizes,
    fits: commonFits,
    description: 'Rude Man graphic tee. Made by demand after order confirmation.',
    details: commonDetails,
    images: {
      front: rudeFront,
      back: rudeBack,
    },
  },

  {
    id: 11,
    name: 'UNICORN TYLER INSPIRED TEE',
    slug: 'unicorn-tyler',
    price: 229,
    compareAt: 249,
    collection: 'SS26 DROP 01',
    featured: true,
    colors: [{ name: 'Black / White', hex: '#111111', accent: '#f5f5f5' }],
    sizes: commonSizes,
    fits: commonFits,
    description: 'Unicorn Tyler inspired graphic tee. Made by demand after order confirmation.',
    details: commonDetails,
    images: {
      front: unicornFront,
      back: unicornFront,
    },
  },

  {
    id: 12,
    name: 'MAWJOUD GRAPHIC TEE',
    slug: 'mawjoud',
    price: 229,
    compareAt: 249,
    collection: 'SS26 DROP 01',
    featured: true,
    newArrival: true,
    colors: [{ name: 'Black / White', hex: '#111111', accent: '#f5f5f5' }],
    sizes: commonSizes,
    fits: commonFits,
    description: 'Mawjoud graphic tee. Made by demand after order confirmation.',
    details: commonDetails,
    images: {
      front: mawjoudFront,
      back: mawjoudFront,
    },
  },
]

export default products