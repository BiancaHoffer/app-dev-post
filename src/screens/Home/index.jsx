import React, { useState, useContext, useCallback } from 'react';
import { Text, Button } from 'react-native';

import { AuthContext } from '../../contexts/auth';

import firebase from '../../services/firebaseConnection';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import { Header } from '../../components/header';
import { Loading } from '../../components/Loading';
import { Posts } from '../../components/Posts';

import { 
  Container, 
  ButtonPost, 
  ListPosts 
} from './styles';

export function Home(){
  const navigation = useNavigation();
  
  const[posts, setPosts] = useState([]);
  const[loading, setLoading] = useState(true);
  
  const[loadingRefresh, setLoadingRefresh] = useState(false);
  const[lastItem, setLastItem] = useState('');
  const[emptyList, setEmptyList] = useState(false);

  const { user } = useContext(AuthContext);

  //busca posts no banco de dados quando usuário entra na aplicação
  useFocusEffect(
    useCallback(()=>{
      let isActive = true;

      
      function fetchPosts(){
        firebase.firestore().collection('posts')
        .orderBy('created', 'desc')
        .limit(5)
        .get()
        .then((snapshot)=>{
          if(isActive){
            setPosts([])
            const postList = [];

            snapshot.docs.map(e => {
              postList.push({
                ...e.data(),
                id: e.id,
            
              })
            })

            setPosts(postList);
            setLastItem(snapshot.docs[snapshot.docs.length - 1]);
            setEmptyList(!!snapshot.empty);
            setLoading(false)
          }
        })
      }

      fetchPosts()

      return () => {
        //console.log('desmonstou')
        isActive = false;
      }
    }, [])
  )

  //busca posts no banco de dados 
  async function handleRefreshPosts(){
    setLoadingRefresh(true);

    firebase.firestore().collection('posts')
        .orderBy('created', 'desc')
        .limit(5)
        .get()
        .then((snapshot)=>{
          
            setPosts([])
            const postList = [];

            snapshot.docs.map(e => {
              postList.push({
                ...e.data(),
                id: e.id,
            
              })
            })

            setLastItem(snapshot.docs[snapshot.docs.length - 1]);
            setEmptyList(false);
            setPosts(postList);
            setLoading(false)
          
        })

        setLoadingRefresh(false);
      }
    


  //busca infinita
  async function handleListPosts(){
    if(emptyList){
      //se buscou toda a lista, paramos o loading
      setLoading(false);
      return null;
    }

    if(loading) return;

    firebase.firestore().collection('posts')
    .orderBy('created', 'desc')
    .limit(5)
    .startAfter(lastItem)
    .get()
    .then((snapshot)=>{
      const postList = [];

      snapshot.docs.map((e)=> {
        postList.push({
          ...e.data(),
          id: e.ui,
        })
      })

      setEmptyList(!!snapshot.empty);
      setLastItem(snapshot.docs[snapshot.docs.length -1]);
      setPosts(oldPosts => [...oldPosts, ...postList]);
      setLoading(false);
    })
  }

  return(
    <Container>
        <Header title='Explore'/>

        { loading ? 
          <Loading/> 
          :
          <ListPosts
            showsVerticalScrollIndicator={false}
            data={posts}
            
            renderItem={({item})=>(<Posts data={item} userId={user?.uid}/>)}
            
            //exibe ActiveIndicator
            refreshing={loadingRefresh}
            //quando puxa, executa função
            onRefresh={handleRefreshPosts}
            //loading infinito
            onEndReached={()=> handleListPosts()}
            onEndReachedThreshold={0.1}

          /> 
        }

        <ButtonPost 
          activeOpacity={0.8}
          onPress={()=> navigation.navigate('NewPost')}
        >
          <Feather name="plus" size={30} color="white" />
        </ButtonPost>
      
    </Container>
  )
}