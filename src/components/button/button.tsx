import './button.scss'

type Props = {
    text: string,
    classes: string
}

const Button: React.FC<Props> = ({text, classes}) => {

    return(
        <button className={`button ${classes}`}>{text}</button>
    )
}

export default Button