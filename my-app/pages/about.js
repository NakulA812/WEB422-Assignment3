import React from 'react';
import PageHeader from '@/components/PageHeader';
import BookDetails from '@/components/BookDetails';

export default function About({ book }) {
  return (
    <>
      <PageHeader text={`About the Developer - Nakul Ariwala`} />
      <p>
        I am Nakul Ariwala, a Computer Programming and Analysis student at Seneca College. I currently work for the Toronto Blue Jays.
      </p>
      <p>
        Outside of school and work, I’m a car and motorsport enthusiast and also enjoy playing soccer.
      </p>
      <p>
        Below is a sample book fetched at build-time from the Open Library API.
      </p>

      <BookDetails book={book} workId={'OL82586W'} showFavouriteBtn={false} />
    </>
  );
}

export async function getStaticProps() {
  const WORK_ID = 'OL82586W';
  const res = await fetch(`https://openlibrary.org/works/${WORK_ID}.json`);
  const data = await res.json();

  return {
    props: {
      book: data
    }
  };
}
