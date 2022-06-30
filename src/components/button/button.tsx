import './button.scss'
import CustomLink from '../customLink/customLink'

type Props = {
  text: string
  classes: string
  linkTo?: string | null
  fn?: any
}

const Button: React.FC<Props> = (props) => {
  const { text, classes, linkTo = null, fn } = props

  const renderBtn = linkTo ? (
    <CustomLink to={linkTo} classes={`button ${classes}`}>
      {text}
    </CustomLink>
  ) : (
    <button className={`button ${classes}`} onClick={() => fn && fn()}>
      {text}
    </button>
  )

  return <div>{renderBtn}</div>
}

export default Button
