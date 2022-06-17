import React from "react";
import { View } from 'react-native';
import { Container, Name, Image } from "./styles";
import { useNavigation } from '@react-navigation/native';

export function ListUsers({data}){
  const navigation = useNavigation();
  
  return(
      <Container onPress={()=> navigation.navigate('UserPost' , { user: data.name, userId: data.id, avatarUrl: data.avatarUrl })}>
        <Name>{data.name}</Name>
      </Container>
   
  );
}