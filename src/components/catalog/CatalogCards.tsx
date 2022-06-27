import './catalogCards.scss'

import Card from '../card/card'
import CustomSelectSort from './CustomSelectSort'
import { useStore } from 'effector-react'
import { appService } from '../../services/app/appService'
import { useEffect } from 'react'

import { serviceCatalog } from '../../services/catalog/catalogService'
import { Coffe } from '../types'
import Loader from '../loader/Loader'

const CatalogCards = () => {
  const coffes = useStore(appService.$coffes)
  const sort = useStore(serviceCatalog.$catalogSortDirection)

  const loading = useStore(appService.$isLoading)
  const offset = useStore(appService.$offset)

  const filteredCoffes = serviceCatalog.filteredAndSortedCoffes(sort)

  useEffect(() => {
    if (coffes.length === 0) {
      appService.setLoading(true)
      appService.fetchCoffesOffset()
    }
  }, [])

  return (
    <>
      <div className='catalog-cards-wrapper'>
        {loading && <Loader />}
        {filteredCoffes.length === 0 && !loading && (
          <div className='not-found'>Ничего не найдено</div>
        )}
        {!loading && filteredCoffes.length !== 0 && (
          <>
            <CustomSelectSort />
            <div className='catalog-cards'>
              {filteredCoffes.map((coffe: Coffe, i) => {
                if (i >= offset) return
                return (
                  <Card
                    key={coffe._id}
                    name={coffe.name}
                    roasting={coffe.roasting}
                    sourness={coffe.sourness}
                    bitterness={coffe.bitterness}
                    saturation={coffe.saturation}
                    imgSrc={coffe.imgSrc}
                    price={coffe.price}
                    sale={coffe.sale}
                    oldPrice={coffe.oldPrice}
                    classes='catalog-card'
                    textBtn='Подробнее'
                    linkTo={`/itemCard/${coffe._id}`}
                  />
                )
              })}
            </div>
            <button
              className='catalog-cards_btn'
              disabled={loading || offset >= coffes.length}
              onClick={() => {
                appService.setOffset(offset + 6)
              }}
            >
              Показать еще
            </button>
          </>
        )}
      </div>
    </>
  )
}

export default CatalogCards
