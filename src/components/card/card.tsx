import './card.scss'
import coffe from '../../img/coffe/coffe.png'

import Button from '../button/button'
import React, { useState } from 'react'
import { renderFeature, renderGrain } from '../../services/rendersElements'

type Props = {
  name: string
  roasting: number
  sourness: number
  bitterness: number
  saturation: number
  imgSrc: string
  sale: boolean
  classes?: string
  textBtn: string
  linkTo?: string
  setShowToatsFn?: (trigger: boolean) => void
  price: {
    [index: string]: number
  }
  oldPrice: {
    [index: string]: number | null
  }
}

const Card: React.FC<Props> = ({
  name,
  roasting,
  sourness,
  bitterness,
  saturation,
  imgSrc = coffe,
  sale = false,
  classes = '',
  textBtn = 'В корзину',
  linkTo,
  price,
  oldPrice,
  setShowToatsFn,
}) => {
  const [actualHeft, setActualHeft] = useState<string>('250')

  return (
    <div className={`card ${classes}`} key={name}>
      <div className='heft'>
        <select
          name='heft'
          id='heft'
          value={actualHeft}
          onChange={(e) => setActualHeft(e.target.value)}
        >
          <option value='250'>250 г.</option>
          <option value='1000'>1000 г.</option>
        </select>
      </div>
      <div className='card-content'>
        <div className='card-img'>
          <img src={process.env.PUBLIC_URL + imgSrc} alt='coffe' />
        </div>
        <div className='card-feature'>
          <div className='card-grain'>
            <ul>{renderGrain(roasting)}</ul>
          </div>
          <div className='card-coffe-characteristic'>
            Кислинка
            <ul>{renderFeature(sourness)}</ul>
          </div>
          <div className='card-coffe-characteristic'>
            Горчинка
            <ul>{renderFeature(bitterness)}</ul>
          </div>
          <div className='card-coffe-characteristic'>
            Насыщенность
            <ul>{renderFeature(saturation)}</ul>
          </div>
        </div>
      </div>
      <div className='card-title'>{name}</div>
      <div className='card-desc'>Свежеобжаренный кофе - описание товара, вкус, аромат</div>

      <div className='card-footer'>
        <div className='price'>
          {price[actualHeft]} ₽{sale && <div className='oldPrice'>{oldPrice[actualHeft]} ₽</div>}
        </div>
        <Button
          text={textBtn}
          classes='card-btn'
          linkTo={linkTo}
          fn={() => setShowToatsFn && setShowToatsFn(true)}
        />
      </div>
      {sale && <div className='sale'>%</div>}
    </div>
  )
}

export default Card
