
import { Product } from './types';

export const PRODUCTS_DATA: { [key: string]: Product[] } = {
  "Shoes": [
    {
      id: 'af1-07-low-premium',
      name: 'AIRFORCE 1',
      tagline: "'07 Low Premium",
      price: 120.00,
      sizes: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5],
      brandText: 'AIRFORCE',
      colors: [
        {
          id: 'beige',
          name: 'Beige',
          colorHex: '#C5A896',
          image: 'https://picsum.photos/seed/af1-beige/400/400',
          mainImage: './assets/beige.png',
        },
        {
          id: 'green',
          name: 'Green',
          colorHex: '#5E6D55',
          image: 'https://picsum.photos/seed/af1-green/400/400',
          mainImage: './assets/green.png',
        },
        {
          id: 'yellow',
          name: 'Yellow',
          colorHex: '#D7A841',
          image: 'https://picsum.photos/seed/af1-yellow/400/400',
          mainImage: './assets/yellow.png',
        },
        {
          id: 'blue',
          name: 'Blue',
          colorHex: '#809EC4',
          image: 'https://picsum.photos/seed/af1-blue/400/400',
          mainImage: './assets/blue.png',
        },
        {
          id: 'red',
          name: 'Red',
          colorHex: '#B94545',
          image: 'https://picsum.photos/seed/af1-red/400/400',
          mainImage: './assets/red.png',
        },
        {
          id: 'purple',
          name: 'Purple',
          colorHex: '#8C5E9A',
          image: 'https://picsum.photos/seed/af1-purple/400/400',
          mainImage: './assets/purple.png',
        },
        {
          id: 'orange',
          name: 'Orange',
          colorHex: '#D98455',
          image: 'https://picsum.photos/seed/af1-orange/400/400',
          mainImage: './assets/orange.png',
        },
      ],
    },
    {
      id: 'run-swift-3',
      name: 'RUN SWIFT 3',
      tagline: "Men's Road Running Shoes",
      price: 95.00,
      sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
      brandText: 'SWIFT',
      colors: [
        {
          id: 'swift-black',
          name: 'Black',
          colorHex: '#222222',
          image: 'https://picsum.photos/seed/swift-black/400/400',
          mainImage: './assets/swift-black.png',
        },
        {
          id: 'swift-grey',
          name: 'Grey',
          colorHex: '#AAAAAA',
          image: 'https://picsum.photos/seed/swift-grey/400/400',
          mainImage: './assets/swift-grey.png',
        },
      ]
    }
  ],
  "Outfits": [
    {
      id: 'tech-fleece-hoodie',
      name: 'TECH FLEECE',
      tagline: 'Full-Zip Hoodie',
      price: 145.00,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      brandText: 'TECH',
      colors: [
        {
          id: 'fleece-grey',
          name: 'Grey',
          colorHex: '#A1A1A1',
          image: 'https://picsum.photos/seed/fleece-grey/400/400',
          mainImage: './assets/fleece-grey.png',
        },
        {
          id: 'fleece-black',
          name: 'Black',
          colorHex: '#272727',
          image: 'https://picsum.photos/seed/fleece-black/400/400',
          mainImage: './assets/fleece-black.png',
        },
      ],
    },
    {
      id: 'dri-fit-set',
      name: 'DRI-FIT',
      tagline: 'Top & Leggings Set',
      price: 110.00,
      sizes: ['XS', 'S', 'M', 'L'],
      brandText: 'DRI-FIT',
      colors: [
        {
          id: 'dri-fit-maroon',
          name: 'Maroon',
          colorHex: '#800000',
          image: 'https://picsum.photos/seed/dri-fit-maroon/400/400',
          mainImage: './assets/dri-fit-maroon.png',
        },
        {
          id: 'dri-fit-blue',
          name: 'Navy',
          colorHex: '#000080',
          image: 'https://picsum.photos/seed/dri-fit-blue/400/400',
          mainImage: './assets/dri-fit-blue.png',
        },
      ]
    }
  ],
  "Vests": [
    {
        id: 'puffer-vest-1',
        name: 'PUFFER VEST',
        tagline: 'Insulated Active Wear',
        price: 85.00,
        sizes: ['S', 'M', 'L', 'XL'],
        brandText: 'NIKE',
        colors: [
            {
                id: 'puffer-black',
                name: 'Black',
                colorHex: '#1E1E1E',
                image: 'https://picsum.photos/seed/puffer-black/400/400',
                mainImage: './assets/puffer-black.png',
            },
            {
                id: 'puffer-grey',
                name: 'Grey',
                colorHex: '#CDCDCD',
                image: 'https://picsum.photos/seed/puffer-white/400/400',
                mainImage: './assets/puffer-grey.png',
            }
        ]
    },
    {
        id: 'utility-vest-2',
        name: 'UTILITY VEST',
        tagline: 'Multi-Pocket Explorer',
        price: 130.00,
        sizes: ['M', 'L', 'XL', 'XXL'],
        brandText: 'NIKE',
        colors: [
            {
                id: 'utility-beige',
                name: 'Beige',
                colorHex: '#D2B48C',
                image: 'https://picsum.photos/seed/utility-beige/400/400',
                mainImage: './assets/utility-beige.png',
            },
        ]
    }
  ]
};
