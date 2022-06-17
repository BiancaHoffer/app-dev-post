import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const SubContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: ${({theme}) => theme.colors.blue_100};
`;

export const Email = styled.Text`
  padding: 10px;
  font-size: 16px;
  color: ${({theme}) => theme.colors.blue_700}
`;

export const ContaierImageAvatar = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 105px;
  width: 105px;
  border-radius: 50%;
  background-color: ${({theme}) => theme.colors.white};
  margin-bottom: 20px;
  
`;

export const ImageAvatar = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 50px;
`;

export const ModalContainer = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: ${({theme}) => theme.colors.blue_100};
`;

export const ContainerInputBtn = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;


export const ContainerBtn = styled.View`
  //align-items: center;
  //justify-content: center;
`;




