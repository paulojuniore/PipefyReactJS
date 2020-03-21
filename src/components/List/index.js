import React from 'react';

import { MdAdd } from 'react-icons/md';

import { Container } from './styles';

export default function List() {
    return (
        <Container>
            <header>
                <h3>Tarefas</h3>
                <button type="button">
                    <MdAdd size={24} color="#FFF" />
                </button>
            </header>
        </Container>
    );
}
