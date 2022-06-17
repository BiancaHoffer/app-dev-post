import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Text, KeyboardAvoidingView, TouchableWithoutFeedback,  Keyboard } from 'react-native';
  
import { useNavigation } from '@react-navigation/native';
import { Container, Image, SubBtn } from './styles';

import { Inputs } from '../../components/Inputs';
import { Buttons } from '../../components/Buttons';

export function SignIn(){
  const navigation = useNavigation();
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');

  const { signIn, loadingAuth } = useContext(AuthContext);

  async function handleSignIn(){
    if(email === '' || password === ''){
      alert('Please, fill in the fields correctly.');
      setPassword('');
      return;
    }

    await signIn(email, password);

  }

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      
      <Container>
        
        <KeyboardAvoidingView behavior="position" enabled>
    
          <Image
            source={require('../../assets/logo.png')}
          />

          <Inputs 
            nameIcon='user' 
            placeholder='E-mail'
            autoCorrect={false} //para corretor não arrumar
            autoCapitalize='none' //para não começar com a primeira letra maicuscula
            keyboardType='email-address' //para chamar @ no teclado
            value={email}
            onChangeText={(e) => setEmail(e)}
          />

          <Inputs 
            nameIcon='lock' 
            placeholder='Password'
            autoCorrect={false} //para corretor não arrumar
            secureTextEntry
            value={password}
            onChangeText={(e) => setPassword(e)}
          />

          <Buttons
            title='SignIn'
            onPress={handleSignIn}
          />

          <SubBtn onPress={() => navigation.navigate('SignUp')}>
            <Text>Don't have an account? SignUp!</Text>
          </SubBtn>

        </KeyboardAvoidingView>

      </Container>

    </TouchableWithoutFeedback>
  )
}

