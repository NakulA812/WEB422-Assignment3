/********************************************************************************
* WEB422 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Nakul Hetalkumar Ariwala Student ID: 152006227 Date: 11/06/2025
*
********************************************************************************/
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Form, Button, Container } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';

export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = (data) => {
    // remove empty fields
    const query = Object.fromEntries(Object.entries(data).filter(([k, v]) => v !== ''));
    router.push({
      pathname: '/books',
      query
    });
  };

  return (
    <Container>
      <PageHeader text="Book Search" subtext="Search Open Library by author, title, subject, language and year." />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="author">
          <Form.Label>Author *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Author name"
            {...register('author', { required: true })}
            className={errors.author ? 'is-invalid' : ''}
          />
          {errors.author && <div className="invalid-feedback">Author is required.</div>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Book title" {...register('title')} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control type="text" placeholder="Subject" {...register('subject')} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="language">
          <Form.Label>Language (3-letter code)</Form.Label>
          <Form.Control type="text" placeholder="e.g. eng" {...register('language')} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="first_publish_year">
          <Form.Label>First Publish Year</Form.Label>
          <Form.Control type="text" placeholder="e.g. 1979" {...register('first_publish_year')} />
        </Form.Group>

        <Button type="submit">Search</Button>
      </Form>
    </Container>
  );
}
