import React, { useState, useLayoutEffect, useContext } from "react";
import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import { AuthContext } from "../../contexts/auth";

import firebase from '../../services/firebaseConnection';

import { useNavigation } from '@react-navigation/native';

import { Buttons } from "../../components/Buttons";
import { SafeArea, Container, ContainerButtons, Input } from './styles';

export function NewPost(){
  const navigation = useNavigation();
  const[post, setPost] = useState('');
  
  const {user} = useContext(AuthContext);

  useLayoutEffect(()=>{
  }, [navigation, post])

  async function handlePost(){
    if(post === ''){
      alert('Please fill in before submitting.');
      return;
    }

    let avatarUrl = null;

    try{
      let response = await firebase.storage().ref('users').child(user?.uid).getDownloadURL();
      avatarUrl = response;
    } catch(error){
      avatarUrl = null;
    }

    await firebase.firestore().collection('posts')
    .add({
      created: new Date(),
      content: post,
      avatarUrl,
      likes: 0,
      userId: user?.uid,
      name: user?.name
    })
    .then(() =>{
      setPost('');
      console.log('Post created.');
      navigation.goBack();
    })
    .catch((error)=>{
      console.log(error)
    })
  } 


  return(
    <SafeArea>
    
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container>
            <ContainerButtons>
              <Buttons
                title='Cancel'
                style={{width:120, backgroundColor: '#6C7A9C'}}
                onPress={()=> navigation.goBack()}
              />
          
              <Buttons
                title='Publish'
                style={{width:120}}
                onPress={handlePost}
              />
            </ContainerButtons>

            <Input
              value={post}
              onChangeText={(e)=> setPost(e)}
              placeholder="What's happening?"
              autoCurrent={false}
              multiline={true}
              placeholderTextColor='gray'
              maxLength={350}
          
            />
          </Container>
        </TouchableWithoutFeedback>
      
    </SafeArea>
  )
}