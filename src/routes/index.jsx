import React, { useContext } from 'react';
import { AuthContext } from '../contexts/auth';

import { NavigationContainer } from '@react-navigation/native';
import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

import { Loading } from '../components/Loading';

export function Routes(){
  const { signed, loadingRender } = useContext(AuthContext);
  
  if(loadingRender) {
    return(
     <Loading/> 
    )
  }
  
  return(
    <NavigationContainer>
      {signed ? <AppRoutes/> : <AuthRoutes/>}
    </NavigationContainer>
  );
}

