import styled from "styled-components/native";

export const SafeArea = styled.SafeAreaView`
  background-color: ${({theme})=> theme.colors.offwhite};
  flex: 1;
`;

export const Container= styled.View`
  flex: 1;
  background-color: ${({theme})=> theme.colors.offwhite};
`;

export const ContainerButtons= styled.View`
  flex: 0.1;
  flex-direction: row;
  justify-content: space-between;
  padding: 2px;
`;

export const Input = styled.TextInput`
  font-size: 16px;
  color: ${({theme})=> theme.colors.black_800};
  padding: 25px;
  
`;

