import './basketItem.scss'
import CustomLink from '../customLink/customLink'
import React, { useEffect, useState } from 'react'
import { BasketItem } from '../types'
import { basketService } from '../../services/basket/basketService'
import { appService } from '../../services/app/appService'

const BasketElem: React.FC<BasketItem> = ({ id, imgSrc, name, heft, amount, price, discount }) => {
  const [count, setCount] = useState(amount)

  useEffect(() => {
    basketService.changeAmount({ id, count })
  }, [count])

  const transformLink = (link: string) => {
    return link.split('/')[0]
  }

  return (
    <>
      <td>
        <button className='basket-item-del_item' onClick={() => basketService.delItem(id)}>
          &#10006;
        </button>
      </td>
      <td>
        <div className='basket-item-main'>
          <img
            src={process.env.PUBLIC_URL + imgSrc}
            alt='coffe'
            className='basket-item-main-img'
          ></img>
          <div className='basket-item-main-text'>
            <CustomLink to={`/itemCard/${transformLink(id)}`} classes='basket-item-main-text-title'>
              {name}
            </CustomLink>
            <div className='basket-item-main-text-heft'>{heft} г.</div>
          </div>
        </div>
      </td>
      <td>{price} ₽ </td>
      <td className='basket-item-amount'>
        <div className='counter'>
          <button
            className='counter-btn'
            onClick={() => appService.handlerCount(-1, count, setCount)}
          >
            -
          </button>
          <input
            type='text'
            className='counter-number'
            value={count}
            onChange={(e) => appService.changeCount(e, setCount)}
          />
          <button
            className='counter-btn'
            onClick={() => appService.handlerCount(1, count, setCount)}
          >
            +
          </button>
        </div>
      </td>
      <td>{((price * discount) / 100) * count} ₽ </td>
      <td>{price * count - ((price * discount) / 100) * count} ₽ </td>
    </>
  )
}

export default BasketElem
