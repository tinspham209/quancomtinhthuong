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

export default async function getRandomQuote() {
  return await fetch(`https://api.quotable.io/random?size=1`, {
    next: {
      revalidate: 60,
    },
  })
    .then((res) => {
      const data = res.json();
      return data;
    })
    .catch((error) => {
      console.log('error getGroupOrderInfo', error);
    });
}
