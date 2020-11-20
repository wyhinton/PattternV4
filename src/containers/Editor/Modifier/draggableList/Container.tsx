import React, { useState, useCallback, useEffect } from 'react'
import { Card } from './Card'
import update from 'immutability-helper'

const style = {
  width: '100%',
}

export interface Item {
  id: number
  text: string
  removeModifier: any
}

export interface ContainerState {
  cards: Item[]
}

export function Container(props){
  {

    const [cards, setCards] = useState([])
    useEffect(() => {
       setCards(props.activeitems)
  }, [props.activeitems]);

    const moveCard = useCallback(
      (dragIndex: number, hoverIndex: number) => {
        const dragCard = cards[dragIndex]
        setCards(
          update(cards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
            ],
          }),
        )
      },
      [cards],
    )

    const renderCard = (card, index: number) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
          type = {card.type}
          removeModifier = {props.removeModifier}
          openModifier = {props.openModifier}
          moveUpModifier = {props.moveUpModifier}
          dropDownItems = {props.dropDownItems}
        />
      )
    }

    return (
      <>
        <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
      </>
    )
  }
}

export default Container
