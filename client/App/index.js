import React from 'react';
import reset from '../reset';

import Wrapper from './Wrapper';
import Content from './Content';
import Title from './Title';
import Battery from './Battery';
import Level from './Level';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 0.0
    };
  }

  componentDidMount() {
    navigator.getBattery().then(battery => {
      // Add the battery data to the state
      this.setState(battery);

      // Listen to when the level of the battery changes
      battery.addEventListener('levelchange', () => {
        this.setState(battery);
      });

      // Listen to when the status of charging changes
      battery.addEventListener('chargingchange', () => {
        this.setState(battery);
      });
    });
  }

  render() {
    // Adding global styles
    reset();

    // Get the level from the state
    const { level } = this.state;

    return (
      <Wrapper>
        <Content>
          <Title>What is my battery?</Title>
          <Battery />
          <Level>{parseInt(level)}%</Level>
        </Content>
      </Wrapper>
    );
  }
}

export default App;
