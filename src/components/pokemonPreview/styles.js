import styled from 'styled-components';

export const Container = styled.div`
    cursor: pointer;
    user-select: none;
    > img {
        user-drag: none;
    }


  border: 1px solid #d9d9d9;
  padding: 5px;
  border-radius: 5px;
  margin: 5px;
  
  font-size: 15px;
  font-family: "Segoe UI";
  font-weight: medium;

  :hover {
      background-color: #f9f9f9;
  }
`;
