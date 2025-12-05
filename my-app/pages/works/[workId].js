import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Error from 'next/error';
import PageHeader from '../../components/PageHeader';
import BookDetails from '../../components/BookDetails';

export default function Work() {
  const router = useRouter();
  const { workId } = router.query;

  if (!workId) return null;

  const { data, error, isLoading } = useSWR(
    `https://openlibrary.org/works/${workId}.json`
  );

  if (isLoading) return null;
  if (error || !data) return <Error statusCode={404} />;

  return (
    <>
      <PageHeader text={data.title} />
      <BookDetails book={data} workId={workId} />
    </>
  );
}
