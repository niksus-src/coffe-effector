import './basket.scss'

import { Link } from 'react-router-dom'
import BasketElem from './BasketItem'
import { deliveryForm, $price, triggerFetchEvent } from '../../services/basket/deliveryService'
import { useForm } from 'effector-forms'
import { basketService } from '../../services/basket/basketService'

import masterCard from '../../img/icons/mastercard.png'
import visa from '../../img/icons/visa.png'
import { useStore } from 'effector-react'
import { appService } from '../../services/app/appService'
import Popup from '../popup/popup'
import { useState } from 'react'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Basket = () => {
  const { fields, hasError, errorText, submit } = useForm(deliveryForm)
  const [showPopup, setShowPopup] = useState(false)
  const basket = useStore(basketService.$basket)
  const login = useStore(appService.$loginResult)
  const allTotal = useStore(basketService.$allTotal)
  const priceDelivery = useStore($price)

  const notifySuccess = () =>
    toast.success('Заказ успешно оформлен', {
      position: 'bottom-right',
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  const notifyErrorDel = () =>
    toast.error('Укажите данные для доставки', {
      position: 'bottom-right',
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  const renderItems = () => {
    if (basket !== null)
      return basket.map((item) => (
        <tr className='basket-item' key={item.id}>
          <BasketElem
            id={item.id}
            imgSrc={item.imgSrc}
            name={item.name}
            heft={item.heft}
            amount={item.amount}
            price={item.price}
            discount={login ? login.data.discount : 0}
          />
        </tr>
      ))
  }

  const transformText = (value: number) => {
    const words = ['товар', 'товара', 'товаров']
    value = Math.abs(value) % 100
    let num = value % 10
    if (value > 10 && value < 20) return words[2]
    if (num > 1 && num < 5) return words[1]
    if (num === 1) return words[0]
    return words[2]
  }

  return (
    <div className='basket-wrapper'>
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className='basket'>
        <div className='basket-links'>
          <Link to='/'>Главная</Link>
          <div className='circle-decoration-item-coffe'></div>
          <Link to='/catalog'>Корзина</Link>
        </div>

        <div className='block-wrapper basket-content'>
          {basket && basket.length !== 0 ? (
            <>
              <div className='basket-content-top'>
                <div className='basket-content-top-title'>
                  <div>
                    {basket.length} {transformText(basket.length)} в корзине
                  </div>
                </div>
                <button
                  className='basket-content-top-btn_delete_all'
                  onClick={() => basketService.delAllItem()}
                >
                  Удалить все
                </button>
              </div>
              <div className='basket-content-main'>
                <table>
                  <thead>
                    <tr className='basket-content-main-title'>
                      <td>Удалить товар</td>
                      <td>Наименование товара</td>
                      <td>Цена</td>
                      <td>Количество</td>
                      <td>Скидка ({login ? login.data.discount : '0'}%)</td>
                      <td>Итого</td>
                    </tr>
                  </thead>
                  <tbody>{renderItems()}</tbody>
                </table>
              </div>
            </>
          ) : (
            <div className='empty'>Ваша корзина пуста</div>
          )}
        </div>

        <div className='block-wrapper delivery'>
          <div className='delivery-top'>
            <div className='delivery-top-title'>Доставка</div>
            <div className='delivery-top-price'>{priceDelivery} ₽</div>
          </div>
          <form className='delivery-form'>
            <div className='delivery-form-inputs'>
              <div className='delivery-form-inputs-item'>
                <input
                  type='text'
                  placeholder='Имя'
                  value={fields.name.value}
                  onChange={(e) => fields.name.onChange(e.target.value)}
                  className={hasError('name') ? 'error-input' : ''}
                />
                {hasError() && (
                  <div className='delivery-form-inputs-error'>
                    {errorText('name') === 'allString' ? 'Введите имя' : errorText('name')}
                  </div>
                )}
              </div>

              <div className='delivery-form-inputs-item'>
                <input
                  type='text'
                  placeholder='Страна'
                  value={fields.country.value}
                  onChange={(e) => fields.country.onChange(e.target.value)}
                  className={hasError('country') ? 'error-input' : ''}
                />
                {hasError() && (
                  <div className='delivery-form-inputs-error'>
                    {errorText('country') === 'allString' ? 'Введите страну' : errorText('country')}
                  </div>
                )}
              </div>
              <div className='delivery-form-inputs-item'>
                <input
                  type='text'
                  placeholder='Фамилия'
                  value={fields.surname.value}
                  onChange={(e) => fields.surname.onChange(e.target.value)}
                  className={hasError('surname') ? 'error-input' : ''}
                />
                {hasError() && (
                  <div className='delivery-form-inputs-error'>
                    {errorText('surname') === 'allString'
                      ? 'Введите фамилию'
                      : errorText('surname')}
                  </div>
                )}
              </div>
              <div className='delivery-form-inputs-item'>
                <input
                  type='text'
                  placeholder='Город'
                  value={fields.city.value}
                  onChange={(e) => fields.city.onChange(e.target.value)}
                  className={hasError('city') ? 'error-input' : ''}
                />
                {hasError() && (
                  <div className='delivery-form-inputs-error'>
                    {errorText('city') === 'allString' ? 'Введите город' : errorText('city')}
                  </div>
                )}
              </div>
              <div className='delivery-form-inputs-item'>
                <input
                  type='text'
                  placeholder='Телефон'
                  value={fields.phone.value}
                  onChange={(e) => fields.phone.onChange(e.target.value)}
                  className={hasError('phone') ? 'error-input' : ''}
                />
                {hasError() && (
                  <div className='delivery-form-inputs-error'>{errorText('phone')}</div>
                )}
              </div>
              <div className='delivery-form-inputs-item'>
                <input
                  type='text'
                  placeholder='Улица, дом'
                  value={fields.streetHome.value}
                  onChange={(e) => fields.streetHome.onChange(e.target.value)}
                  className={hasError('streetHome') ? 'error-input' : ''}
                />
                {hasError() && (
                  <div className='delivery-form-inputs-error'>{errorText('streetHome')}</div>
                )}
              </div>
              <div className='delivery-form-inputs-item'>
                <input
                  type='text'
                  placeholder='Email'
                  value={fields.mail.value}
                  onChange={(e) => fields.mail.onChange(e.target.value)}
                  className={hasError('mail') ? 'error-input' : ''}
                />
                {hasError() && (
                  <div className='delivery-form-inputs-error'>{errorText('mail')}</div>
                )}
              </div>
              <div className='delivery-form-inputs-item'>
                <input
                  type='text'
                  placeholder='Почтовый индекс'
                  value={fields.postcode.value}
                  onChange={(e) => fields.postcode.onChange(e.target.value)}
                  className={hasError('postcode') ? 'error-input' : ''}
                />
                {hasError() && (
                  <div className='delivery-form-inputs-error'>
                    {errorText('postcode') === 'allNumbers'
                      ? 'Введите индекс'
                      : errorText('postcode')}
                  </div>
                )}
              </div>
              <div className='delivery-form-inputs-item'>
                <input
                  type='text'
                  placeholder='Название компании (необязательно)'
                  value={fields.nameCompany.value}
                  onChange={(e) => fields.nameCompany.onChange(e.target.value)}
                />
              </div>
              <div className='delivery-form-inputs-item'>
                <input
                  type='text'
                  placeholder='Комментарий к заказу'
                  value={fields.comment.value}
                  onChange={(e) => fields.comment.onChange(e.target.value)}
                />
              </div>
            </div>
            <input
              type='submit'
              className={`delivery-form-btn_submit ${hasError() ? 'disable' : null}`}
              value='Рассчитать доставку'
              onClick={(e) => {
                e.preventDefault()
                submit()
                if (!hasError()) {
                  triggerFetchEvent()
                }
              }}
            />
          </form>
          <div className='error'>{hasError()}</div>
        </div>

        <div className='basket-footer'>
          <div className='block-wrapper basket-footer-promo'>
            <div className='basket-footer-promo-title'>Промокод</div>
            <div className='basket-footer-promo-desc'>
              Введите подарочный промокод в поле ниже и получите скидку на заказ до 20%. Скидка не
              распространяется на доставку
            </div>
            <input type='text' placeholder='Промокод' className='basket-footer-promo-input' />
            <button className='basket-footer-promo-btn' onClick={notifySuccess}>
              Ввести промокод
            </button>
          </div>
          <div className='block-wrapper basket-footer-payment'>
            <div className='basket-footer-payment-title'>
              <div className='basket-footer-payment-title-text'>
                Итог:
                <span>
                  {(
                    allTotal -
                    allTotal * (login ? login.data.discount / 100 : 0) +
                    priceDelivery
                  ).toFixed(2)}
                  ₽
                </span>
              </div>
              <div className='basket-footer-payment-title-img'>
                <img src={masterCard} alt='masterCard' />
                <img src={visa} alt='visa' />
              </div>
            </div>
            <div className='basket-footer-payment-desc'>
              Подытог: {allTotal} ₽ <br /> Скидка:
              <span>
                {allTotal * (login ? login.data.discount / 100 : 0)} ₽ (
                {login ? login.data.discount : '0'}%)
              </span>
              <br />
              Доставка: {priceDelivery} ₽
            </div>
            <button
              className='basket-footer-payment-btn'
              onClick={() => {
                submit()
                if (!hasError()) {
                  if (!login) setShowPopup(true)
                  else {
                    basketService.addOrderEvent({
                      id: login.id,
                      basket,
                      discount: login.data.discount,
                    })
                    basketService.delAllItem()
                    triggerFetchEvent()
                    notifySuccess()
                  }
                } else notifyErrorDel()
              }}
            >
              Оплатить заказ
            </button>
            <div className='basket-footer-payment-footer'>
              Ваши персональные данные будут использоваться для управления доступом к вашей учетной
              записи и для других целей, описанных в нашем документе политика конфиденциальности.
            </div>
          </div>
        </div>
        {showPopup && <Popup setShowPopup={setShowPopup} />}
      </div>
    </div>
  )
}

export default Basket
