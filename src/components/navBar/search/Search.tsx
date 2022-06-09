
import { useState } from 'react'
import searchIconGray from '../../../img/icons/searchIconGray.svg'

import './search.scss'

const Search = () => {

    const [isActive, setIsActive] = useState(false)
    const searchStyle = isActive ? 'search search_active' : 'search'
    const inputStyle = isActive ? 'search-input search-input_active' : 'search-input'

    return(
        <>
            <div className={searchStyle}>
                <div className="search-icon">
                    <img src={searchIconGray} alt="search" />
                </div>
                <input className={inputStyle} type="text" placeholder='Поиск по товарам' 
                    onFocus={() => setIsActive(true)}
                    onBlur={() => setIsActive(false)}/>
                    { isActive && 
                        <div className="found">
                            <div className="found-item">Ячменный напиток Millor - Здоровое питание</div>
                            <div className="found-item">Ячменный напиток Millor - Здоровое питание</div>
                            <div className="found-item">Ячменный напиток Millor - Здоровое питание</div>
                            <div className="found-item">Ячменный напиток Millor - Здоровое питание</div>
                            <div className="found-item">Ячменный напиток Millor - Здоровое питание</div>
                            <div className="found-empty">Ничего не найдено</div>
                        </div>
                    }
            </div>
        </>
    )
}

export default Search