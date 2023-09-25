import { RandomUnsplashImage } from './types';

export interface RandomQuote {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

const ACCESS_UNSPLASH_KEY = process.env.NEXT_PUBLIC_ACCESS_UNSPLASH_KEY;
const NUMBER_OF_IMAGES_RETURN = 1;

export default async function getRandomImage({
  numberOfImages = NUMBER_OF_IMAGES_RETURN,
}: {
  numberOfImages?: number;
}): Promise<RandomUnsplashImage[]> {
  const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${ACCESS_UNSPLASH_KEY}&count=${numberOfImages}`;

  return await fetch(apiUrl, {
    next: {
      revalidate: 60,
    },
  })
    .then((res) => {
      const data = res.json();
      return data;
    })
    .catch((error) => {
      console.log('error getRandomImage', error);
    });
}
