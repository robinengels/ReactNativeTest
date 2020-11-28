// Components/FilmItem.js

import React from 'react'
import { StyleSheet, Image,View, Text } from 'react-native'

const FilmItem = ({props}) => {
    return (
        <View style={styles.main_container}>
        <View style={styles.image}>
            <Image style={styles.image}
                   source={{uri:"https://image.tmdb.org/t/p/w500/"+props.poster_path}}/>
        </View>
        <View style={styles.info}>
            <View style={styles.header}>
                <Text>{props.title}</Text>
                <Text>{props.vote_average}</Text>
            </View>
            <View style={styles.desc}>
                <Text numberOfLines={6}>{props.overview}</Text>
            </View>
            <View style={styles.footer}>
                <Text>{props.release_date}</Text>
            </View>
        </View>
        </View>
    )
}


const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection:"row",
    margin : 5
  },
  title_text: {
    
  },
  info: {
    flex:2,
    flexDirection:"column"
  },
  image: {
    flex:1
  },
  header: {
      flex:1,
      flexDirection: "row"
  },
  desc: {
      flex: 3,
  },
  footer: {
      flex: 1
  },
  image: {
    width: 120,
    height: 180,
    backgroundColor: 'gray'
  }
  
})

export default FilmItem