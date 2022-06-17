import React, { useState } from 'react';

import { Feather } from '@expo/vector-icons';

import { Container, ContainerIcon, Input } from './styles';

export function Inputs({nameIcon, placeholder, onChangeText, value, ...rest}){
  return(
    <Container>
      <ContainerIcon>
        <Feather
          name={nameIcon}
          size={24}
          color="#E9E9EB"
        />
      </ContainerIcon>

      <Input 
        value={value}
        placeholder={placeholder} 
        placeholderTextColor='#627575'
        onChangeText={onChangeText}
        {...rest}  
      />
    </Container>
  )
}