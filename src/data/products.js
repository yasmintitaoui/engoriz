import tysonismFront from '../assets/products/tees/tysonism/front.webp'
import tysonismBack from '../assets/products/tees/tysonism/back.webp'

import gtdFront from '../assets/products/tees/gtd/front.webp'
import gtdBack from '../assets/products/tees/gtd/back.webp'

import worldSaversFront from '../assets/products/tees/world-savers/front.webp'
import worldSaversBack from '../assets/products/tees/world-savers/back.webp'

import armageddonFront from '../assets/products/tees/armageddon/front.webp'
import armageddonBack from '../assets/products/tees/armageddon/back.webp'

import brentFront from '../assets/products/tees/brent/front.webp'
import brentBack from '../assets/products/tees/brent/back.webp'

import immuneBlackFront from '../assets/products/tees/immune-bs/black-front.webp'
import immuneBlackBack from '../assets/products/tees/immune-bs/black-back.webp'
import immuneWhiteFront from '../assets/products/tees/immune-bs/white-front.webp'
import immuneWhiteBack from '../assets/products/tees/immune-bs/white-back.webp'

import lostFront from '../assets/products/tees/lost-in-the-desert/front.webp'
import lostBack from '../assets/products/tees/lost-in-the-desert/back.webp'

import rudeFront from '../assets/products/tees/rude-man/front.webp'
import rudeBack from '../assets/products/tees/rude-man/back.webp'

import unicornFront from '../assets/products/tees/unicorn-tyler/front.webp'
import mawjoudFront from '../assets/products/tees/mawjoud/front.webp'

import lovePainBlack from '../assets/products/tees/love-pain/front-black.webp'
import lovePainWhite from '../assets/products/tees/love-pain/front-white.webp'

import loveV2BlackGrey from '../assets/products/tees/love-pain-v2/black-grey.webp'
import loveV2WhiteBlack from '../assets/products/tees/love-pain-v2/white-black.webp'
import loveV2WhitePink from '../assets/products/tees/love-pain-v2/white-pink.webp'
import loveV2CreamBrown from '../assets/products/tees/love-pain-v2/cream-brown.webp'

import drakeThePunkFront from '../assets/products/tees/drake-the-punk/front.webp'
import drakeThePunkBack from '../assets/products/tees/drake-the-punk/back.webp'
import lamarismFront from '../assets/products/tees/lamarism/front.webp'
import lamarismBack from '../assets/products/tees/lamarism/back.webp'
import njrFront from '../assets/products/tees/njr/front.webp'
import njrBack from '../assets/products/tees/njr/back.webp'

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
      'Black / Grey': { front: loveV2BlackGrey, back: loveV2BlackGrey },
      'White / Black': { front: loveV2WhiteBlack, back: loveV2WhiteBlack },
      'White / Pink': { front: loveV2WhitePink, back: loveV2WhitePink },
      'Cream / Brown': { front: loveV2CreamBrown, back: loveV2CreamBrown },
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
    colors: [{ name: 'Black / White', hex: '#111111' }],
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
    colors: [{ name: 'Black / Gold', hex: '#111111' }],
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
    colors: [{ name: 'Black / White', hex: '#111111' }],
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
    colors: [{ name: 'Black', hex: '#111111'}],
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
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'White', hex: '#fafafa' },
    ],
    sizes: commonSizes,
    fits: commonFits,
    description: 'Immune Against B.S.S.S graphic tee. Made by demand after order confirmation.',
    details: commonDetails,
    images: {
      front: immuneBlackFront,
      back: immuneBlackBack,
    },
    imagesByColor: {
      Black: {
        front: immuneBlackFront,
        back: immuneBlackBack,
      },
      White: {
        front: immuneWhiteFront,
        back: immuneWhiteBack,
      },
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
    colors: [{ name: 'Black / White', hex: '#818589' }],
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
    colors: [{ name: 'Black / White', hex: '#111111' }],
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
    colors: [{ name: 'Black / White', hex: '#111111' }],
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
    colors: [{ name: 'Black / White', hex: '#111111' }],
    sizes: commonSizes,
    fits: commonFits,
    description: 'Mawjoud graphic tee. Made by demand after order confirmation.',
    details: commonDetails,
    images: {
      front: mawjoudFront,
      back: mawjoudFront,
    },
  },

  {
    id: 13,
    name: 'DRAKE THE PUNK TEE',
    slug: 'drake-the-punk',
    price: 229,
    compareAt: 249,
    collection: 'SS26 DROP 01',
    featured: true,
    newArrival: true,
    colors: [{ name: 'Black / White', hex: '#FFFFFF' }],
    sizes: commonSizes,
    fits: commonFits,
    description: 'Drake The Punk oversized tee. Made by demand after order confirmation.',
    details: commonDetails,
    images: {
      front: drakeThePunkFront,
      back: drakeThePunkBack,
    },
  },

  {
    id: 14,
    name: 'LAMARISM TEE',
    slug: 'lamarism',
    price: 229,
    compareAt: 249,
    collection: 'SS26 DROP 01',
    featured: true,
    newArrival: true,
    colors: [{ name: 'Black / White', hex: '#FFFFFF' }],
    sizes: commonSizes,
    fits: commonFits,
    description: 'Lamarism graphic tee. Made by demand after order confirmation.',
    details: commonDetails,
    images: {
      front: lamarismFront,
      back: lamarismBack,
    },
  },

  {
    id: 15,
    name: 'NJR OVERSIZED TEE',
    slug: 'njr',
    price: 229,
    compareAt: 249,
    collection: 'SS26 DROP 01',
    featured: true,
    newArrival: true,
    colors: [{ name: 'Black / White', hex: '#111111' }],
    sizes: commonSizes,
    fits: commonFits,
    description: 'NJR graphic tee. Made by demand after order confirmation.',
    details: commonDetails,
    images: {
      front: njrFront,
      back: njrBack,
    },
  },
]

export default products