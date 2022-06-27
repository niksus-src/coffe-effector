import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import './itemCoffe.scss'
import Button from '../button/button'
import tasteIcon from '../../img/item-card/taste-icon.svg'

import { appService } from '../../services/app/appService'
import { useStore } from 'effector-react'
import { basketService } from '../../services/basket/basketService'
import { renderFeature, renderGrain } from '../../services/rendersElements'

type Params = {
  id: string
}

const CoffeNames: { [index: string]: string } = {
  arabica: 'Арабика',
  robusta: 'Робуста',
  mixture: 'Смесь Арабика/Робуста',
}

const ItemCoffe = () => {
  const [count, setCount] = useState(1)
  const [actualHeft, setActualHeft] = useState('250')

  const { id } = useParams<Params>()

  useEffect(() => {
    appService.fetchCoffeById(`${id}`)
  }, [id])

  const coffe = useStore(appService.$coffe)

  const actualPrice = coffe?.price[actualHeft] ? coffe?.price[actualHeft]! * count : '0'

  return (
    <>
      {!coffe ? (
        <div className='item not-found'>Ничего не найдено</div>
      ) : (
        <div className='item'>
          <div className='links-item-coffe'>
            <Link to='/'>Главная</Link>
            <div className='circle-decoration-item-coffe'></div>
            <Link to='/catalog'>Каталог товаров</Link>
            <div className='circle-decoration-item-coffe'></div>
            <Link to='/catalog'>{coffe.name}</Link>
          </div>

          <div className='item-wrapper card-item'>
            <div className='card-main-wrapper'>
              <img className='card-img' src={process.env.PUBLIC_URL + coffe.imgSrc} alt='coffe' />
              <div className='card-main'>
                <div className='card-grain-item'>
                  <ul>{renderGrain(coffe.roasting)}</ul>
                </div>
                <div className='card-title'>{coffe.name}</div>
                <div className='card-desc'>{coffe.desc}</div>
                <div className='card-feature-item'>
                  <div className='card-coffe-characteristic'>
                    Кислинка
                    <ul>{renderFeature(coffe.sourness)}</ul>
                  </div>
                  <div className='card-coffe-characteristic'>
                    Горчинка
                    <ul>{renderFeature(coffe.bitterness)}</ul>
                  </div>
                  <div className='card-coffe-characteristic'>
                    Насыщенность
                    <ul>{renderFeature(coffe.saturation)}</ul>
                  </div>
                </div>
                <div className='heft-item'>
                  <input
                    type='radio'
                    id='250'
                    name='heft'
                    value='email'
                    checked={actualHeft === '250'}
                    onChange={() => setActualHeft('250')}
                  />
                  <label htmlFor='250'>250 г.</label>
                  <input
                    type='radio'
                    id='1000'
                    name='heft'
                    value='email'
                    checked={actualHeft === '1000'}
                    onChange={() => setActualHeft('1000')}
                  />
                  <label htmlFor='1000'>1000 г.</label>
                </div>
                <div className='buy-wrapper'>
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
                  <Button
                    text={`Купить за ${actualPrice} ₽`}
                    classes='buy-btn'
                    fn={() => basketService.insertItemFn(coffe, count, actualHeft)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='characteristic-wrapper'>
            <div className='item-wrapper taste'>
              <div className='taste-title'>Вкус</div>
              <div className='taste-content'>
                {coffe.taste?.map((elem, i) => (
                  <div className='taste-content-item' key={i}>
                    <img src={tasteIcon} alt='tasteIcon' className='taste-content-icon' />
                    <div className='taste-content-desc'>{elem}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className='item-wrapper characteristic'>
              <div className='characteristic-title'>Характеристики</div>
              <div className='characteristic-desc'>
                <div className='characteristic-desc-item'>
                  <div className='characteristic-name'>Страна производитель:</div>
                  <div className='desc'>{coffe.manufacturer}</div>
                </div>
                <div className='characteristic-desc-item'>
                  <div className='characteristic-name'>Способ обработки: </div>
                  <div className='desc'>{coffe.processing}</div>
                </div>
                <div className='characteristic-desc-item'>
                  <div className='characteristic-name'>Вид кофейного дерева:</div>
                  <div className='desc'>{CoffeNames[coffe.kind]}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ItemCoffe
