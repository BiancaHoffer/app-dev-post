import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { AuthContext } from '../../contexts/auth';

import { Button, Title } from './styles'

export function Buttons({title, onPress, ...rest}){
  const { loadingAuth } = useContext(AuthContext);
 
  return(
  <Button onPress={onPress} {...rest}>
    {loadingAuth ? <ActivityIndicator size={20} color='#FFF' /> : <Title>{title}</Title>}
  </Button>
 )
}