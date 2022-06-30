import './toats.scss'
import { useState } from 'react'

type Props = {
  desc: string
  show: boolean
  setShow: (trig: boolean) => void
}

const Toats: React.FC<Props> = (props) => {
  const [showToats, setShowToats] = useState(props.show)
  return (
    <div className={`toats-wrapper ${props.show ? 'fade-in' : 'fade-out'}`}>
      <div className='toats'>
        <div className='toats-status status-success'></div>
        <div className='toats-content'>
          <div className='toats-content-desc'>{props.desc}</div>
          <div className='toats-content-close' onClick={() => props.setShow(false)}>
            ×
          </div>
        </div>
      </div>
    </div>
  )
}

export default Toats
