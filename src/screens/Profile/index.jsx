import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Modal, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';

import firebase from '../../services/firebaseConnection';

import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

import { useNavigation } from '@react-navigation/native';

import { Buttons } from '../../components/Buttons';
import { Header } from '../../components/header';
import { Back } from '../../components/Back';
import { Inputs } from '../../components/Inputs';

import { Container, SubContainer, ContaierImageAvatar, Email, ImageAvatar, ModalContainer, ContainerInputBtn, ContainerBtn } from './style';

export function Profile(){
  const { user, signOut, setUser, storageUser } = useContext(AuthContext);
  const navigation = useNavigation();
  const[name, setName] = useState('');
  const[url, setUrl] = useState(null);
  const[modalVisible, setModalVisible] = useState(false);

  useEffect(()=>{
    let isActive = true;
    
    async function loadAvatar(){
      try{
        if(isActive){
          let response = await firebase.storage().ref('users').child(user?.uid).getDownloadURL();
          setUrl(response);
          //console.log(response);
        }
      }catch(error){
        console.log("Not photo: " + error)
      }
    }

    loadAvatar();

    return () => isActive = false; 
  }, [])

  async function handleSignOut(){
    await signOut();
  }

  function openModal(){
    setModalVisible(true);
  }

  function closeModal(){
    setModalVisible(false);
  }

  async function updateProfile(){
    if(name === '') {
      return;
    }

    await firebase.firestore().collection('users')
    .doc(user?.uid)
    .update({
      name: name
    })

    //atualizar nome em todos os posts
    const postDocs = await firebase.firestore().collection('posts')
    .where('userId', '==', user?.uid).get()

    //percorrer todos os posts do user e atualizar
    postDocs.forEach(async doc => {
      await firebase.firestore().collection('posts').doc(doc.id)
      .update({
        name: name
      })
    })

    let data = {
      uid: user.uid, 
      name: name,
      email: user.email,
    }

    setUser(data);
    storageUser(data);
    setModalVisible(false);

  }

  async function uploadFile(){
    //let result = await ImagePicker.launchCameraAsync
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })


   if(!result.cancelled){
    uploadImage(result.uri, user?.uid)  
    .then(()=>{
      uploadAvatarPosts();
    })

    setUrl(result.uri)
    //console.log(result.uri)
  }
}

//enviando imagem ao firebase
async function uploadImage(uri, imageName){
  const response = await fetch(uri);
  const blob = await response.blob();

  let ref = firebase.storage().ref('users').child(user?.uid)
  return ref.put(blob);
 }

//enviar imagem a todos os posts
 async function uploadAvatarPosts(){
  const storageRef = firebase.storage().ref('users').child(user?.uid);
  const url = await storageRef.getDownloadURL()
  .then(async(image)=>{
    const postDocs = await firebase.firestore().collection('posts')
    .where('userId', '==', user.uid).get();

    //percorrer posts e trocar url da imagem
    postDocs.forEach(async doc => {
      await firebase.firestore().collection('posts').doc(doc.id).update({
        avatarUrl: image
      })
    })
  })
  .catch((error)=>{
    console.log(error)
  })
 }

    
  return(
    <Container>

      <Header title={user?.name}/>

      <SubContainer>
        { url ? 

          <ContaierImageAvatar onPress={uploadFile}>
            
            <ImageAvatar source={{uri: url}}/>

          </ContaierImageAvatar>
        :
          <ContaierImageAvatar onPress={uploadFile}>
            
            <ImageAvatar source={require('../../assets/user.png')}/>
            
            
          </ContaierImageAvatar>
        }

        <Email>{user.name}</Email>
        
        <Email>{user.email}</Email>
        
        <Buttons title='Update profile' onPress={openModal}/>
        
        <Buttons title='SignOut' onPress={handleSignOut}/>
      </SubContainer>

      
      
        <Modal
          visible={modalVisible}
          animationType='slide'
          transparent={true}
        >

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            
            <ModalContainer>

              <Back onPress={closeModal}/>

              <ContainerInputBtn behavior={Platform.OS === 'android' ? '' : 'padding' }>
                
                <Email>Here you can change your name...</Email>

                <Inputs 
                  onChangeText={(e)=> setName(e)}
                  placeholder={user?.name} 
                  nameIcon='user'
                />
                
                <Buttons 
                  title='Save'
                  onPress={updateProfile}
                />
              
              </ContainerInputBtn>
            
            </ModalContainer>
            
          </TouchableWithoutFeedback> 

        </Modal>
      
    </Container>
   
  )
}
