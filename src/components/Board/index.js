import React, { useState } from 'react'
import { loadLists } from '../../services/api';
import producer from 'immer';

import { Container } from './styles';

import List from '../List/index';

import BoardContext from './context';

const data = loadLists();

export default function Board() {
    const [lists, setLists] = useState(data);

    function move(fromList, from, to) {
        setLists(producer(lists, draft => {
            const dragged = draft[fromList].cards[from];

            draft[fromList].cards.splice(from, 1)
            draft[fromList].cards.splice(to, 0, dragged);
        }))
    }

    return (
        <BoardContext.Provider value={{ lists, move }}>
            <Container>
                {lists.map((list, index) => <List key={list.title} data={list} index={index} />)}
            </Container>
        </BoardContext.Provider>

    );
}
