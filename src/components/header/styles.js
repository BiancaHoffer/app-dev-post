import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.white};
`;



export const Title = styled.Text`
  padding: 20px;
  font-size: 20px;
  font-weight: 600;
`;