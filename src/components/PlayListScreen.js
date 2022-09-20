import * as React from 'react';
import { StyleSheet,Text, View, FlatList, SafeAreaView } from 'react-native';
import PlayList from './PlayList';
import NavBar from './NavBar.js';

const playListArr = [
  {
    id: '1',
    imageURL: 'https://i1.sndcdn.com/avatars-000500544273-6kcyh0-t500x500.jpg',
    name: 'Milk-tea',
    author: 'Dang Khuong'
  }, 
  {
    id: '2',
    imageURL: 'https://static.tuoitre.vn/tto/r/2017/06/29/eminem-014-1498724304.jpg',
    name: 'Bubble-tea',
    author: 'Someone'
  },

  {
    id: '3',
    imageURL: 'https://c4.wallpaperflare.com/wallpaper/81/477/97/rihana-singer-wallpaper-preview.jpg',
    name: 'Sunshine',
    author: 'Wester'
  },
  {
    id: '3',
    imageURL: 'https://c4.wallpaperflare.com/wallpaper/81/477/97/rihana-singer-wallpaper-preview.jpg',
    name: 'Sunshine',
    author: 'Wester'
  },
  {
    id: '3',
    imageURL: 'https://c4.wallpaperflare.com/wallpaper/81/477/97/rihana-singer-wallpaper-preview.jpg',
    name: 'Sunshine',
    author: 'Wester'
  },
  {
    id: '3',
    imageURL: 'https://c4.wallpaperflare.com/wallpaper/81/477/97/rihana-singer-wallpaper-preview.jpg',
    name: 'Sunshine',
    author: 'Wester'
  }
];
const renderItem = function({item}){
  return(<PlayList playList = {item}/>);
} 

export default function PlayListScreen({navigation}) {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
          <FlatList data={playListArr}
          renderItem ={renderItem}
          keyExtractor= {(item)=> item.id}
          showsVerticalScrollIndicator={false}
          />
      </SafeAreaView>
      <NavBar navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: '100%',
    // height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#101010'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});