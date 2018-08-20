import React from 'react';

import Wrapper from './Wrapper';
import Face from './Face';
import Eye from './Eye';
import Mouth from './Mouth';

class Battery extends React.Component {
  render() {
    return (
      <Wrapper battery={100}>
        <Face>
          <Eye left />
          <Eye right />
          <Mouth />
        </Face>
      </Wrapper>
    );
  }
}

export default Battery;
