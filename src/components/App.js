import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (e) => {
      this.state.filters.type = e.target.value
  }

  onFindPetsClick = () => {
    if (this.state.filters.type === 'all'){
      fetch('/api/pets')
      .then(res => res.json())
      .then(allPets => this.setState({
        pets: allPets
      }))
    }
    else{
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(res => res.json())
      .then(data => this.setState({
        pets: data
      }))
    }
  }

  onAdoptPet = (chosenId) => {
    let chosenPet = (this.state.pets.filter(pet => pet.id === chosenId))[0]
    chosenPet.isAdopted = !chosenPet.isAdopted
    this.setState({
      pets: this.state.pets.map(pet => pet.id === chosenId.id ? chosenPet:pet)
    })
  }

 

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
              onChangeType={this.onChangeType}
              onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
              pets={this.state.pets} 
              onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
