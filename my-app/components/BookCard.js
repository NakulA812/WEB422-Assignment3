import React from 'react';
import useSWR from 'swr';
import Error from 'next/error';
import Link from 'next/link';
import { Card } from 'react-bootstrap';

export default function BookCard({ workId }) {
  const { data, error } = useSWR(workId ? `https://openlibrary.org/works/${workId}.json` : null);

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  const coverId = data?.covers?.[0];
  const src = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : 'https://placehold.co/200x300?text=Cover+Not+Available';

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={src}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://placehold.co/200x300?text=Cover+Not+Available';
        }}
        style={{ objectFit: 'cover', height: '300px' }}
      />
      <Card.Body>
        <Card.Title>{data.title || ''}</Card.Title>
        <Card.Text>{data.first_publish_date || data.first_publish_year || 'N/A'}</Card.Text>
        <Link href={`/works/${workId}`}>View Details</Link>
      </Card.Body>
    </Card>
  );
}
