import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Container } from './styles';

export function Loading(){
  return(
    <Container>
      <ActivityIndicator size={50} color='#5790DF'/>
    </Container>
  );
}