import styled from "styled-components/native";

export const Container = styled.View`
  border: 0.5px solid ${({theme}) => theme.colors.shadow};
  background-color: ${({theme}) => theme.colors.white};
  //justify-content: flex-end;
  padding: 0px 10px 10px 10px;
`;

export const ContainerHeader = styled.View`
  
`;

export const Header = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  padding: 15px 15px;
  background-color: ${({theme}) => theme.colors.white};

`;


export const ContainerImage = styled.View`
  height: 38px;
  width: 38px;
  background-color: #fff;
  border-radius: 50px;
`;


export const Name = styled.Text`
  font-size: 16px;
  font-weight: 700;
  padding: 10px;
  color: ${({theme}) => theme.colors.black_500};
`;

export const ContentView = styled.View`
  background-color: ${({theme}) => theme.colors.white};
  
`;

export const Content = styled.Text`
  padding: 0px 20px;
  margin-bottom: 10px;
  font-size: 17px;
`;


export const ContainerSub = styled.View`
   background-color: ${({theme}) => theme.colors.white};
   align-items: center;
   flex-direction: row;
   justify-content: space-between;
   padding: 10px 10px;
`;

export const ContainerLikesIcon = styled.View`
  flex-direction: row;
`;

export const BtnLike = styled.TouchableOpacity`
  justify-content: center;
  padding-left: 5px;
`;

export const Likes = styled.Text`
  color: ${({theme}) => theme.colors.blue_500};
  padding-left: 5px;
  font-size: 16px;
`;

export const TimePost = styled.Text`
  color: ${({theme}) => theme.colors.black_500};
  font-weight: 500;
  font-size: 14px;
`;