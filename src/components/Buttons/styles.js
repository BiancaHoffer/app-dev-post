import styled from "styled-components/native";

export const Button = styled.TouchableOpacity`
  align-self: center;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 50px;
  border-radius: 50%;
  margin: 10px;
  background-color: ${({theme}) => theme.colors.blue_500};
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({theme}) => theme.colors.offwhite};
`;

