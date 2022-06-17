import React, { useState } from "react";
import { Image } from "react-native";

import firebase from '../../services/firebaseConnection';

import { AntDesign } from '@expo/vector-icons';

import { useNavigation } from "@react-navigation/native";

import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { 
  Container, 
  Header, 
  ContainerImage, 
  Name, 
  ContentView, 
  Content, 
  ContainerHeader, 
  ContainerSub, 
  ContainerLikesIcon, 
  BtnLike, 
  Likes, 
  TimePost 
} from "./styles";

export function Posts({data, userId}){

  const navigation = useNavigation();
  const[likes, setLikes] = useState(data?.likes);
  
  function formatDatePost(){
    //console.log(new Date(data.created.seconds * 1000));
    const datePost = new Date(data.created.seconds * 1000);

    return formatDistance(
      new Date(),
      datePost,
      {
        locale: ptBR
      }
    )
  
  }

  async function handleLikePost(data, likes){
    const docId = `${userId}_${data.id}`
  
    const doc = await firebase.firestore().collection('likes')
    .doc(docId).get();

    if(doc.exists){
      //checar se já curtiu o post, se sim, remover like
      await firebase.firestore().collection('posts')
      .doc(data.id).update({
        likes: likes - 1
      })
      await firebase.firestore().collection('likes').doc(docId)
      .delete()
      .then(()=>{
        setLikes(likes - 1)
      })
      return;
    }

    //Dando like
    await firebase.firestore().collection('likes')
    .doc(docId).set({
      postId: data.id,
      userId: userId
    })

    await firebase.firestore().collection('posts')
    .doc(data.id).update({
      likes: likes + 1
    })
    .then(()=>{
      setLikes(likes + 1)
    })
    
  }


  return(
    <Container>
      <ContainerHeader>
        <Header onPress={() => navigation.navigate('UserPost', { user: data.name, userId: data.userId})}>
          
          {data.avatarUrl ? 
            <ContainerImage>
              <Image
                source={{ uri: data.avatarUrl }}
                style={{borderRadius: 50, height:35, width:35 }}
              />
            </ContainerImage>
          :
            <ContainerImage>
              <Image
                source={require('../../assets/user.png')}
                style={{borderRadius: 50, height: 35, width:35 }}
              />
            </ContainerImage>
          }
          
          <Name numberOfLines={1}>{data.name}</Name>
        </Header>

        <ContentView>
          <Content>{data?.content}</Content>
        </ContentView>

      </ContainerHeader>

      <ContainerSub>
        
        <ContainerLikesIcon>
          <BtnLike onPress={() => handleLikePost(data, likes)}>
            <AntDesign
              name={likes === 0 ? "hearto" : "heart" }
              size={20}
              color="#5790DF"
              
            />
          </BtnLike>

          <Likes>{likes === 0 ? '' : likes}</Likes>
        </ContainerLikesIcon>

        <TimePost>Há {formatDatePost()}</TimePost>
        
      </ContainerSub>
    </Container>
  )
}