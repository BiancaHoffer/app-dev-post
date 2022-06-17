import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  width: 100%;
  z-index: 99;
`;

export const BtnIcon = styled.TouchableOpacity`
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: ${({theme}) => theme.colors.white};
  margin: 15px;
`;