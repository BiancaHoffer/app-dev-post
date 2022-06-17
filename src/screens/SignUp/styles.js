import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme})=>theme.colors.blue_100};
`;

export const ContainerInpusButtons = styled.View`
  flex: 0.8;
  justify-content: center;
  align-items: center;
  background-color: ${({theme})=>theme.colors.blue_100};
`;


