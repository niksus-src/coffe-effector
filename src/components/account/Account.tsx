import { Link, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './account.scss'

import personalImg from '../../img/account/personalLogo.png'
import { appService } from '../../services/app/appService'
import { useStore } from 'effector-react'
import { loginRes, Order, Products } from '../types'
import { accountService } from '../../services/account/accountService'

const Account = () => {
  const [isOpenSpec, setIsOpenSpec] = useState(false)
  const [isCurrentBtn, setIsCurrentBtn] = useState('current')
  const loginRes = useStore(appService.$loginResult)
  const allTotal = useStore(accountService.$allTotal)
  const nextDiscount = useStore(accountService.$nextDiscount)
  const history = useHistory()

  useEffect(() => {
    if ((loginRes && !loginRes.login) || loginRes === null) {
      sessionStorage.setItem('isLogin', 'false')
      history.push('/account')
      appService.setIsLogin(false)
    }
  }, [])

  const lacksDiscount: { [index: string]: number } = {
    '10': 5000,
    '15': 7000,
    '20': 10000,
  }

  return (
    <div className='account-wrapper'>
      <div className='account-links'>
        <Link to='/'>Главная</Link>
        <div className='circle-decoration-item-coffe'></div>
        <Link to='/catalog'>Личный кабинет</Link>
      </div>
      <div className='account-top account-block-wrapper'>
        <div className='account-top-personal'>
          <div className='account-top-personal-img'>
            <img src={personalImg} alt='personalImg' />
            <button className='account-btn'>Изменить</button>
          </div>
          <div className='account-top-personal-info'>
            <div className='account-top-personal-info-name'>
              {loginRes && loginRes.data && loginRes.data.name}, здравствуйте!
              <button
                className='account-btn account-exit'
                onClick={() => {
                  sessionStorage.removeItem('isLogin')
                  appService.setIsLogin(false)
                  history.push('/home')
                }}
              >
                Выйти
              </button>
            </div>
            <div className='account-top-personal-info-data'>
              {loginRes && loginRes.data && loginRes.data.mail}
              <br />
              {loginRes && loginRes.data && loginRes.data.phone}
            </div>
          </div>
        </div>
        <div className='account-top-sale'>
          {!isOpenSpec && (
            <div className='swing-in-top-fwd'>
              <div className='account-top-sale-title'>
                Ваша скидка: {loginRes && loginRes.data && loginRes.data.discount}%
              </div>
              <div className='account-top-sale-desc'>Сумма заказов: {allTotal} ₽*</div>
              {loginRes!.data.discount !== 20 && (
                <div className='account-top-sale-ps'>
                  *До скидки {nextDiscount}% не хватает покупок на сумму:{' '}
                  {lacksDiscount[nextDiscount] - allTotal} ₽
                </div>
              )}
            </div>
          )}
          {isOpenSpec && (
            <div className='account-top-sale-specification swing-in-top-fwd'>
              {loginRes!.data.discount !== 20 && (
                <div className='account-top-sale-specification-title'>
                  До скидки {nextDiscount}% не хватает покупок на сумму:
                  {lacksDiscount[nextDiscount] - allTotal} ₽
                </div>
              )}
              <div className='account-top-sale-specification-desc'>
                Скидка 10% - сумма покупок 5000 ₽
              </div>
              <div className='account-top-sale-specification'>
                Скидка 15% - сумма покупок 7000 ₽
              </div>
              <div className='account-top-sale-specification'>
                Скидка 20% - сумма покупок 10000 ₽
              </div>
            </div>
          )}
          <button
            className='account-top-sale-btn_specification'
            onClick={() => setIsOpenSpec(!isOpenSpec)}
          >
            {isOpenSpec ? '×' : '?'}
          </button>
        </div>
      </div>
      <div className='account-main account-block-wrapper'>
        <div className='account-main-title'>
          {isCurrentBtn === 'current' ? 'Мои заказы' : 'Завершенные'}
        </div>
        <div className='account-main-btns'>
          <button
            className={`account-btn account-main-btn ${
              isCurrentBtn === 'current' ? null : 'account-btn-disable'
            }`}
            onClick={() => setIsCurrentBtn('current')}
          >
            Текущие заказы
          </button>
          <button
            className={`account-btn account-main-btn ${
              isCurrentBtn === 'completed' ? null : 'account-btn-disable'
            }`}
            onClick={() => setIsCurrentBtn('completed')}
          >
            Завершенные
          </button>
        </div>
        {isCurrentBtn === 'current'
          ? currentBlock(loginRes!)
          : currentBlock(loginRes!, 'доставлено')}
      </div>
      <div className='account-footer'>
        <div className='account-footer-personal_shares'>
          <div className='account-footer-personal_shares-title'>Персональные акции</div>
          <div className='account-footer-personal_shares-cards_wrapper'>{cardShares()}</div>
        </div>
      </div>
    </div>
  )
}

const currentBlock = (loginRes: loginRes, status = '') => {
  const filterItems = loginRes.data.orders.filter((order) =>
    status === '' ? order.status !== 'доставлено' : order.status === 'доставлено'
  )
  const renderfilterItems = filterItems.map((order, i) => {
    return (
      <div key={i}>
        <div className='account-main-status'>
          {order.date} - {order.status}
        </div>
        <div className='account-main-products'>
          <table>
            <thead>
              <tr className='account-main-products-title'>
                <td>Товары:</td>
                <td>Стоимость за единицу:</td>
                <td>Скидка на единицу:</td>
                <td>Итоговая стоимость за товар:</td>
              </tr>
            </thead>
            <tbody>{productsItem(order)}</tbody>
          </table>
        </div>
        <div className='account-main-total'>
          Сумма заказа: {order.total} ₽
          <br />
          Доставка: 350 ₽
        </div>
      </div>
    )
  })
  return (
    <>{renderfilterItems.length > 0 ? renderfilterItems : <div className='empty'>Пусто</div>}</>
  )
}

const productsItem = (order: {
  discount: number
  products: Array<{
    amount: number
    productName: string
    heft: number
    price: number
  }>
}) => {
  return order.products.map((product, i) => (
    <tr className='account-main-products-item' key={i}>
      <td>
        {product.amount} х {product.productName}, {product.heft} г.
      </td>
      <td>{product.price} ₽</td>
      <td>{(product.price * order.discount) / 100} ₽</td>
      <td>
        {((product.price - (product.price * order.discount) / 100) * product.amount).toFixed(2)} ₽
      </td>
    </tr>
  ))
}

const cardShares = () => {
  return (
    <>
      <div className='card-shares'>
        <div className='card-shares-title'>Купи 3 пачки кофе и получи 4-ую в подарок!</div>
        <div className='card-shares-term'>Срок акции: до 31.08.2021</div>
      </div>
      <div className='card-shares'>
        <div className='card-shares-title'>Купи 3 пачки кофе и получи 4-ую в подарок!</div>
        <div className='card-shares-term'>Срок акции: до 31.08.2021</div>
      </div>
      <div className='card-shares'>
        <div className='card-shares-title'>Купи 3 пачки кофе и получи 4-ую в подарок!</div>
        <div className='card-shares-term'>Срок акции: до 31.08.2021</div>
      </div>
      <div className='card-shares'>
        <div className='card-shares-title'>Купи 3 пачки кофе и получи 4-ую в подарок!</div>
        <div className='card-shares-term'>Срок акции: до 31.08.2021</div>
      </div>
    </>
  )
}

export default Account
