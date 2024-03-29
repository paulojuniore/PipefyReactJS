import React, { useRef, useContext } from 'react';
import { Container, Label } from './styles';

import { useDrag, useDrop } from 'react-dnd';

import BoardContext from '../Board/context';

export default function Card({ data, index, listIndex }) {
    const { move } = useContext(BoardContext);

    const ref = useRef();

    const [{ isDragging }, dragRef] = useDrag({
        item: { type: 'CARD', 
                id: data.id, 
                index, 
                listIndex, 
                content: data.content 
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    });
    
    const [, dropRef] = useDrop({
        accept: 'CARD',
        hover(item, monitor){
            const draggedListIndex = item.listIndex;
            const targetListIndex = listIndex;

            const draggedIndex = item.index;
            const targetIndex = index;
            if(draggedIndex === targetIndex && 
                draggedListIndex === targetListIndex){
                return;
            }
            
            // obtém o tamanho do container
            const targetSize = ref.current.getBoundingClientRect();

            /* calcula o pixel central vertical do card que está sendo passado
            por cima */
            const targetCenter = (targetSize.bottom - targetSize.top) / 2;

            // obtém a distância dos pontos do item que foram arrastados
            const draggedOffset = monitor.getClientOffset();

            /* obtém a diferença entre o que foi arrastado do card verticalmente
            e a distância total do topo. */
            const draggedTop = draggedOffset.y - targetSize.top;
            
            if(draggedIndex < targetIndex && draggedTop < targetCenter){
                return;
            }
            if(draggedIndex > targetIndex && draggedTop > targetCenter) {
                return;
            }

            move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

            item.index = targetIndex;
            item.listIndex = targetListIndex;
        }
    });

    dragRef(dropRef(ref));

    return (
        <Container ref={ref} isDragging={isDragging}>
            <header>
                <Label color={data.labels} />
            </header>
            <p>{data.content}</p>
            {data.user && <img src={data.user} alt="" />}
        </Container>
    );
}
