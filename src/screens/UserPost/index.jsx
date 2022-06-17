import React, { useCallback, useState, useContext } from "react";
import { View, Text } from 'react-native'
import { AuthContext } from "../../contexts/auth";

import firebase from '../../services/firebaseConnection';

import { useRoute, useFocusEffect, useNavigation } from "@react-navigation/native";


import { Header } from "../../components/header";
import { Back } from  '../../components/Back';
import { Posts } from '../../components/Posts';
import { Loading } from '../../components/Loading';

import { Container, PostList } from "./styles";

export function UserPost(){
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  //buscando postagems do usuário especifico
  useFocusEffect(
    useCallback(()=>{
      let isActive = true;

      firebase.firestore().collection('posts')
      //Quando criamos um filtro especifico como este, importante realizar indexação no console firebase
      .where('userId', '==', route.params?.userId) //para chamar apenas posts do id
      .orderBy('created', 'desc')
      .get() //para buscar todos os posts
      .then((snapshot)=>{
        const postList = [];
        
        snapshot.docs.map(e => {
          postList.push({ //push para adicionar objeto em array.
            ...e.data(),
            id: e.id
          }) 
        })
        if(isActive){
          setPosts(postList);
          setLoading(false);
          //console.log(postList);
        }
      })

      return () => {
        isActive = false;
      }
    }, [])
  )

  return(
    <Container>
      <Header title={route.params?.user}/>
      <Back 
        onPress={()=> navigation.goBack()} 
        style={{position: 'absolute', top: -10}}/>

      { loading ? 
        <Loading/> 
      : 
        <View>
          <View>{route.params?.avatarUrl}</View>

          <PostList
            data={posts}
            renderItem={({item}) => <Posts data={item} userId={user?.userId}/>}
            showsVerticalScrollIndicator={false}
          />
        </View>
      }

    </Container>
  )
}