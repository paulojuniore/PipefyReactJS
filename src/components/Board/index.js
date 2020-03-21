import React from 'react'
import { Container } from './styles';

import List from '../List/index';

import { loadLists } from '../../services/api';

const lists = loadLists();

export default function Board() {
    return (
        <Container>
            {lists.map(list => <List key={list.title} data={list} />)}
        </Container>
    );
}
