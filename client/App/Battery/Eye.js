import styled from 'styled-components';

const Eye = styled.div`
  top: 11px;
  width: 8px;
  height: 8px;
  position: absolute;
  border-radius: 50%;
  background-color: #000;

  ${props => (props.left ? 'left: 0;' : 'right: 0;')};
`;

export default Eye;
