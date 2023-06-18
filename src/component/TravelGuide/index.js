import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

class TravelGuide extends Component {
  state = {packagesData: [], isLoading: true}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const response = await fetch('https://apis.ccbp.in/tg/packages')
    const data = await response.json()
    const updatedData = data.packages.map(eachData => ({
      id: eachData.id,
      name: eachData.name,
      imageUrl: eachData.image_url,
      description: eachData.description,
    }))
    this.setState({packagesData: updatedData, isLoading: false})
  }

  render() {
    const {packagesData, isLoading} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">Travel Guide</h1>
        <ul className="packages-container">
          {isLoading ? (
            <div data-testid="loader">
              <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
            </div>
          ) : (
            packagesData.map(eachData => (
              <li className="package-container" key={eachData.id}>
                <img
                  className="image"
                  src={eachData.imageUrl}
                  alt={eachData.name}
                />
                <div className="text-container">
                  <h1 className="image-heading">{eachData.name}</h1>
                  <p className="description">{eachData.description}</p>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    )
  }
}

export default TravelGuide
