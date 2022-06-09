
import { Dispatch, SetStateAction, useState } from 'react'
import searchIconGray from '../../../img/icons/searchIconGray.svg'

import './search.scss'

type Props = {
    closeSearch: Dispatch<SetStateAction<boolean>>
}

const Search: React.FC<Props> = ({closeSearch}) => {

    const [isActive, setIsActive] = useState(false)
    const searchStyle = isActive ? 'search search_active' : 'search'
    const inputStyle = isActive ? 'search-input search-input_active' : 'search-input'

    const activeFound = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.length > 0) setIsActive(true)
        else setIsActive(false)
    }


    return(
        <>
            <div className={searchStyle}>
                <div className="search-icon">
                    <img src={searchIconGray} alt="search" />
                </div>
                <input className={inputStyle} type="text" placeholder='Поиск по товарам' onChange={(e)=>activeFound(e)}/>
                <div className="close-search" onClick={() => closeSearch(false)}>	&#10006;</div>
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