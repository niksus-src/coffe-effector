import './button.scss'
import CustomLink from '../customLink/customLink'

type Props = {
    text: string,
    classes: string,
    linkTo?: string | null 
}

const Button: React.FC<Props> = (props) => {
    const {text, classes, linkTo = null} = props

    const renderBtn = linkTo ? <CustomLink to={linkTo} classes={`button ${classes}`}>{text}</CustomLink> : <button className={`button ${classes}`}>{text}</button>

    return(
        <div>
        {renderBtn}
        </div>
    )
}

export default Button