import React, { Component } from 'react';
import './App.css';
import MapComponent from './MapComponent.js'
import promise from 'es6-promise';
import axios from 'axios';
import statesData from './helpers/us-states.js'

const config = {
  headers: {'Access-Control-Allow-Origin': '*'}
}
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edualizeNumbers: [],
      statesData: statesData,
    }
  }

  componentDidMount() {
        this.getEdualizeNumbers()
  }
    getEdualizeNumbers() {
      axios({
            url:'https://edualize.herokuapp.com/api/v1/median_expenditures/totals',
            timeout: 2000000,
            method: 'GET',
            responseType: 'json'
      })
        .then((response) => {
          if(response.status >= 400) {
            throw new Error('Bad response, bro');
          }
          return response
        })
        .then((response) => {
          this.calculateFundingDifferentialByState(response.data)
        })
    }

    calculateFundingDifferentialByState(response) {
      let newArr = []
      for (let i = 0; i < response.length - 1; i += 2) {
        newArr.push(Object.assign({}, {[response[i].state]: (response[i + 1].total - response[i].total)}))
      }
      this.setState({edualizeNumbers: newArr})
      this.addFundingDifferentialToGeoJson(newArr)
    }


    addFundingDifferentialToGeoJson(newArr) {
      let statesData = this.state.statesData;
       for (let i= 0; i < newArr.length - 1; i++) {
         let currentState = newArr[i]
         for(let j = 0; j < statesData.features.length - 1; j++) {
           let thisStateName = Object.keys(currentState).pop()
           if (statesData.features[j].properties.name === thisStateName) {
             statesData.features[j].properties.density = Object.values(currentState).pop()
           }
         }
       }
      return statesData
    }

  render() {
    return (
      <div className="App">
      {!this.state.EdualizeNumbers === [] ? <div>Loading...</div> : <MapComponent statesData={this.state.statesData} edualizeNumbers={this.state.edualizeNumbers}/> }  
      </div>
    );
  }
}

export default App;
