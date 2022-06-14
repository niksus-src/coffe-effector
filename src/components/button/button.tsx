import './button.scss'

type Props = {
    text: string,
    classes: string
}

const Button: React.FC<Props> = (props) => {
    const {text, classes} = props

    return(
        <button className={`button ${classes}`}>{text}</button>
    )
}

export default Button