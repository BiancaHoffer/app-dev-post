import React from 'react';

import { Ionicons } from '@expo/vector-icons';

import { useRoute, useNavigation } from "@react-navigation/native";

import { Container, BtnIcon } from './styles'

export function Back({onPress, style}){
  const navigation = useNavigation()
  
  return(
    <Container style={style}>
      <BtnIcon
        onPress={onPress}
      >
        <Ionicons 
          name="chevron-back-outline" 
          size={30} 
          color="#5790DF"/>
      </BtnIcon>
    </Container>
  )
}