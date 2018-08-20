import styled from 'styled-components';
import { opacify } from 'polished';

const Wrapper = styled.div`
  margin: 0 auto;
  border: 10px solid #61d095;
  background-color: ${opacify(0.7, '#61d095')};
  border-radius: 10px;
  text-align: center;
  width: 200px;
  height: 42px;

  &:after {
    content: '';
    background-color: #61d095;
  }
`;

export default Wrapper;
