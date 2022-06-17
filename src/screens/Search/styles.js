import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: ${({theme}) => theme.colors.blue_100};
`;

export const List = styled.FlatList`
  flex: 1;
  width: 100%;
  background-color: ${({theme}) => theme.colors.white};
`;