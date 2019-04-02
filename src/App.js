import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';
import {Container, Row, Col} from 'reactstrap';
import classNames from 'classnames';

class App extends Component {
    state = {
      coins: {}
    }

  componentDidMount() {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USD')
    request.send(null)
    request.onload = () => {
      const res = JSON.parse(request.response)
      this.parseApiData(res.Data)
    }
  }

  parseApiData(coins) {
    /*
      Parse raw coins data for faster/easier use. 
    */
    let coinsParsed = {}

    coins.forEach(coin => {
      coin = {
        name: coin.RAW.USD.FROMSYMBOL,
        price: coin.RAW.USD.PRICE.toFixed(2)
      }
      coinsParsed[coin.name] = coin
    })

    
    this.setState({coins: coinsParsed})
    this.subscribeStream(Object.keys(coinsParsed))
  }

  subscribeStream(symbols) {
    /*
      Subscribe to websocket stream using coin symbols.
    */
    let cryptoio = socketIOClient.connect('https://streamer.cryptocompare.com')
    let subscriptions = []

    symbols.forEach(symbol => {
      subscriptions.push('5~CCCAGG~'+ symbol +'~USD')
    })

    cryptoio.emit('SubAdd', {'subs': subscriptions})

    cryptoio.on('m', message => {
      
      this.handleMessage(message)
    })
  }

  handleMessage(message) {

    message = message.split('~')
    
    // coin value goes up(1) or down(2)
    if ((message[4] === "1") || (message[4] === "2")) {

      let coin = {
        name: message[2],
        price: message[5]
      }

      if (message[4] === "1") {
        coin.isUp = true
        coin.isDown = false
      }
      else if (message[4] === "2") {
        coin.isUp = false
        coin.isDown = true
      }
      this.updateCoin(coin)
    }
  }
  
  updateCoin(coin) {
    // this.state.coins[coin.name] = coin
    let coins = this.state.coins
    coins[coin.name] = coin
    this.setState(coins[coin.name])
    
    /*
      Reset coin status after short interval to remove binded css classes.
      This will allow tick animations be reapplied and play again.
    */
    window.setTimeout(() => {
      coins[coin.name].isUp = false
      coins[coin.name].isDown = false
      this.setState(coins[coin.name])
    }, 500)
  }

  render() {
    return (
      <Container fluid>
        <Row className="title"><h1>Real-time Cryptocurrency Exchange Rate</h1></Row>
        <Row className="coins" noGutters>
          {Object.keys(this.state.coins).map((key, index) => {
            return (
              <Col key={index} xs="4" md="3" lg="2">
                <section className={classNames({"Coin": true,'tickGreen': this.state.coins[key].isUp, 'tickRed': this.state.coins[key].isDown})}>
                  <span><b>{this.state.coins[key].name}</b></span>
                  <span>{String.fromCharCode(36)}{this.state.coins[key].price}</span>
                </section>
              </Col>
            )})}
          </Row>
      </Container>
    );
  }
}

export default App;
