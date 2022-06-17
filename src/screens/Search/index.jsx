import React, { useState, useEffect, useContext } from 'react';
import { Text, Button, Image } from 'react-native';

import firebase from '../../services/firebaseConnection';

import { Container, List} from './styles';

import { Inputs } from '../..//components/Inputs'
import { ListUsers } from '../../components/ListUsers';


export function Search(){
  const[search, setSearch] = useState('');
  const[users, setUsers] = useState([]);
  
 
  useEffect(()=>{
    if(search === '' || search === undefined){
      setUsers([]);
      return;
    }

    const subscriber = firebase.firestore().collection('users')
    .where('name', '>=', search)
    .where('name', '<=', search + "\uf8ff")
    .onSnapshot(snapshot => {
      const listUsers= [];

      snapshot.forEach(doc => {
        listUsers.push({
          ...doc.data(),
          id: doc.id,
        })
      })

      //console.log(listUsers);
      setUsers(listUsers);
    })

    //para execução quando desmonta a tela
    return () => subscriber();

  }, [search])
 
  
  return(
    <Container>
      <Inputs 
        value={search}
        nameIcon='search'
        placeholder='Search...'
        onChangeText={(e) => setSearch(e)}
      />

      

      <List
        data={users}
        renderItem={({item}) => <ListUsers data={item}/>}
      />

    </Container>
  )
}