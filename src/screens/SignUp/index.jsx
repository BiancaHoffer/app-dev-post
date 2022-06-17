import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { KeyboardAvoidingView, TouchableWithoutFeedback,  Keyboard } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Back } from '../../components/Back';
import { Inputs } from '../../components/Inputs'
import { Buttons } from '../../components/Buttons';

import { Container, ContainerInpusButtons, Teste } from './styles';

export function SignUp(){ 
    const navigation = useNavigation();
    
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    
    const { signUp } = useContext(AuthContext);

    async function handleSignUp(){
      if(name === '' || email === '' || password === '' || confirmPassword === ''){
        alert('Please, fill in the fields correctly.');
        setPassword('');
        setConfirmPassword('');
        return;
      }

      if(confirmPassword !== password){
        alert("Passwords don't match, try again.");
        return;
      }

      await signUp(email, password, name);

    }

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <Container>
        
        <Back onPress={()=> navigation.navigate('SignIn')}/>

        <ContainerInpusButtons>
              
          
            <KeyboardAvoidingView behavior="position" enabled>
            
              <Inputs
                nameIcon={'user'}
                placeholder='Name'
                value={name}
                onChangeText={(e)=>setName(e)}
              />
              <Inputs
                nameIcon={'mail'}
                placeholder='E-mail'
                autoCorrect={false}
                keyboardType='email-address'
                autoCapitalize='none'
                value={email}
                onChangeText={(e)=>setEmail(e)}
              />
              <Inputs
                nameIcon={'lock'}
                placeholder='Password'
                autoCorrect={false}
                autoCapitalize='none'
                secureTextEntry
                value={password}
                onChangeText={(e)=>setPassword(e)}
              />
              <Inputs
                nameIcon={'lock'}
                placeholder='Confirm Password'
                autoCorrect={false}
                autoCapitalize='none'
                secureTextEntry
                value={confirmPassword}
                onChangeText={(e)=>setConfirmPassword(e)}
              />
              <Buttons title='SignUp' onPress={handleSignUp}/>
          
            </KeyboardAvoidingView>
          
        </ContainerInpusButtons>
          
      </Container>

    </TouchableWithoutFeedback>
  )
}