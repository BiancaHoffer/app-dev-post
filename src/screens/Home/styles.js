import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.white};
`;

export const SunContainer = styled.View`
  flex: 1;
  border: 1px solid red;

`;

/*
export const ContainerButtonPost = styled.View`
  flex: 0.5;
  border: 1px solid yellow;
`;
*/

export const ButtonPost = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.white};
  position: absolute;
  bottom: 3%;
  right: 5%;
  padding: 15px;
  border-radius: 50%;
  background-color: ${({theme}) => theme.colors.blue_500};
  box-shadow: 1px 1px 4px ${({theme}) => theme.colors.shadow};
  z-index: 99;
`;

export const ListPosts = styled.FlatList`
  flex: 1;
  background-color: ${({theme}) => theme.colors.white};
`;