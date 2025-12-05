import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Pagination, Table } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';

export default function Books() {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const router = useRouter();

  const queryString =
    Object.keys(router.query).length > 0
      ? new URLSearchParams(router.query).toString()
      : null;

  const { data, error } = useSWR(
    queryString
      ? `https://openlibrary.org/search.json?${queryString}&page=${page}&limit=10`
      : null
  );

  useEffect(() => {
    if (data) {
      setPageData(data);
    }
  }, [data]);

  function previous() {
    setPage((p) => Math.max(1, p - 1));
  }

  function next() {
    setPage((p) => p + 1);
  }

  const subtext =
    Object.keys(router.query).length > 0
      ? Object.entries(router.query)
          .map(([k, v]) => `${k}: ${v}`)
          .join(' · ')
      : 'No filters applied';

  return (
    <>
      <PageHeader text="Search Results" subtext={subtext} />

      <Table striped hover className="mb-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>First Published</th>
          </tr>
        </thead>
        <tbody>
          {pageData?.docs?.map((book) => (
            <tr
              key={book.key}
              onClick={() => router.push(`/works/${book.key.split('/').pop()}`)}
              style={{ cursor: 'pointer' }}
            >
              <td>{book.title}</td>
              <td>{book.first_publish_year || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev onClick={previous} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={next} />
      </Pagination>
    </>
  );
}
