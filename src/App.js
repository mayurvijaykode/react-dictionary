import React, { useState, useRef } from 'react';
import './style.css';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

export default function App() {
  const [term, setTerm] = useState('');
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const searchHandler = async (word) => {
    let response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    let json = await response.json();
    console.log(json[0]);

    if (!!json) {
      setResult(json[0]);
    }

    if (typeof json[0] === 'undefined') {
      console.log('here');
      setNotFound(true);
    }
  };

  const clearHandler = () => {
    setResult(null);
    setTerm('');
    setNotFound(false);
  };

  return (
    <Container style={{ maxWidth: '500px' }}>
      <h1>Dictionary</h1>
      <p>Enter word to find it's definition</p>
      <Form>
        <Form.Group className="mb-3" controlId="wordId">
          <Form.Label>Word</Form.Label>
          <Form.Control
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </Form.Group>
      </Form>
      <Button variant="outline-secondary" onClick={() => clearHandler()}>
        Clear
      </Button>{' '}
      <Button variant="outline-primary" onClick={() => searchHandler(term)}>
        Search
      </Button>
      {notFound && (
        <p>Word you are looking for is not found. Try another word</p>
      )}
      {result && (
        <Card style={{ width: '18rem', marginTop: 10 }}>
          <Card.Body>
            <Card.Title>{result?.word}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Phonetics: {result?.phonetics[0].text}
            </Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Link href={result?.sourceUrls}>Learn more</Card.Link>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}
