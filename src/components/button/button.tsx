import './button.scss'
import {Link} from 'react-router-dom'

type Props = {
    text: string,
    classes: string,
    linkTo?: string | null 
}

const Button: React.FC<Props> = (props) => {
    const {text, classes, linkTo = null} = props

    const renderBtn = linkTo ? <Link to={linkTo} className={`button ${classes}`}>{text}</Link> : <button className={`button ${classes}`}>{text}</button>

    return(
        <div>
        {renderBtn}
        </div>
    )
}

export default Button