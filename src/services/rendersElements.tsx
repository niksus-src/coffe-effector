import grain from '../img/icons/grain.svg'

export const renderFeature = (amount: number = 1) => {
  let renderElements = []

  for (let index = 0; index < amount; index++) {
    renderElements.push(
      <li key={index}>
        <div className='active'></div>
      </li>
    )
  }
  if (amount !== 10) {
    for (let index = amount; index < 10; index++) {
      renderElements.push(
        <li key={index}>
          <div className='disable'></div>
        </li>
      )
    }
  }
  return renderElements
}

export const renderGrain = (amount: number = 1) => {
  let renderElements = []

  for (let index = 0; index < amount; index++) {
    renderElements.push(
      <li key={index}>
        <img src={grain} alt='grain' />
      </li>
    )
  }
  return renderElements
}
