import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  //border: 0.3px solid ${({theme}) => theme.colors.shadow};
  background-color: ${({theme}) => theme.colors.white};
`;

export const Name = styled.Text`
  padding: 15px 20px;
  font-size: 16px;
`;


