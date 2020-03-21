import React from 'react';
import { Container, Label } from './styles';

export default function Card({ data }) {
  return (
    <Container>
        <header>
            <Label color={data.labels} />
        </header>
        <p>{ data.content }</p>
        { data.user && <img src={data.user} alt="" /> }
    </Container>
  );
}
