import React from 'react';
import { MdAdd } from 'react-icons/md';
import { Container } from './styles';

import Card from '../Card/index';

export default function List({ data, index: listIndex }) {
    return (
        <Container done={data.done}>
            <header>
                <h2>{ data.title }</h2>
                { data.creatable && (
                    <button type="button">
                        <MdAdd size={24} color="#FFF" />
                    </button>
                )}
            </header>

            <ul>
                { 
                    data.cards.map((card, index) => {
                        return (
                            <Card 
                                key={card.id} 
                                data={card} 
                                index={index} 
                                listIndex={listIndex} />
                        )
                    })
                }
            </ul>
        </Container>
    );
}
