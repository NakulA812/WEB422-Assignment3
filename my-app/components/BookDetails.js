import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import { addToFavourites, removeFromFavourites } from '../lib/userData';

function joinOrNA(arr) {
  if (!arr || !Array.isArray(arr) || arr.length === 0) return 'N/A';
  return arr.join(', ');
}

export default function BookDetails({ book, workId, showFavouriteBtn = true }) {
  if (!book) return null;

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(Array.isArray(favouritesList) && favouritesList.includes(workId));
  }, [favouritesList, workId]);

  const coverId = book?.covers?.[0];
  const coverSrc = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : 'https://placehold.co/400x600?text=Cover+Not+Available';

  const description = book.description
    ? (typeof book.description === 'string' ? book.description : book.description.value)
    : null;

  const characters = joinOrNA(book.subject_people);
  const settings = joinOrNA(book.subject_places);

  async function favouritesClicked() {
    if (!workId) return;

    let updatedList = [];

    if (showAdded) {
      updatedList = await removeFromFavourites(workId);
    } else {
      updatedList = await addToFavourites(workId);
    }

    setFavouritesList(updatedList);
  }

  return (
    <Container>
      <Row>
        <Col lg="4">
          <img
            onError={(event) => {
              event.target.onerror = null;
              event.target.src = 'https://placehold.co/400x600?text=Cover+Not+Available';
            }}
            className="img-fluid w-100"
            src={coverSrc}
            alt="Cover Image"
          />
          <br /><br />
        </Col>

        <Col lg="8">
          <h3>{book.title}</h3>

          {description && <p>{description}</p>}

          <br />

          {book.subject_people && (
            <>
              <h5>Characters</h5>
              <div>{characters}</div>
              <br />
            </>
          )}

          {book.subject_places && (
            <>
              <h5>Settings</h5>
              <div>{settings}</div>
              <br />
            </>
          )}

          {book.links && Array.isArray(book.links) && book.links.length > 0 && (
            <>
              <h5>More Information</h5>
              {book.links.map((link, idx) => (
                <div key={idx}>
                  <span>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.title || link.url}
                    </a>
                    <br />
                  </span>
                </div>
              ))}
              <br />
            </>
          )}

          {showFavouriteBtn && (
            <Button
              variant={showAdded ? 'primary' : 'outline-primary'}
              onClick={favouritesClicked}
            >
              {showAdded ? '+ Favourite (added)' : '+ Favourite'}
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}
