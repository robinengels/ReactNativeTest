import React, {useEffect, useRef, useState} from 'react'
import {StyleSheet,View,TextInput,FlatList,Button, ActivityIndicator} from 'react-native'
import FilmItem from './FilmItem'
import load from '../../API/TMDBApi'

const Search = () => {

    const [films,setFilms] = useState([])
    const [loading,setLoading] = useState(false)
    const searchedFilm = useRef("")
    const c_page = useRef(0)
    const total_page= useRef(0)
    const shouldReset = useRef(false)

    var load_film = () => {
      console.log("Hello",searchedFilm)
      if(searchedFilm.current.length > 0){
        console.log("Loading films")
        setLoading(true)
        load(searchedFilm.current,c_page.current).then(res => {
          setFilms(films.concat(res.data.results))
          setLoading(false)
          c_page.current = res.data.page
          total_page.current = res.data.total_pages
      })
      .catch((err) => console.error(err))
    }
    }

    const pressed = () => {
        searchFilm()
    }

    useEffect( () => {
      if(shouldReset.current){
        shouldReset.current = false
        console.log("Resetting pages")
        c_page.current = 0
        total_page.current = 0
        load_film()
      }
    },[films]
    )

    const searchFilm = () => {
      shouldReset.current = true
      setFilms([])
    }

    const displayLoad = () => {
      if(loading){
        return(
          <View style={styles.loading}>
            <ActivityIndicator size="large"/>
          </View>
        )
      }
    }
    return(
        <View style={styles.main_container}>
            <TextInput 
              placeholder='Titre du film'
              style={styles.textinput}
              onChangeText= {(text) =>searchedFilm.current = text} 
              onSubmitEditing = {() =>{
                searchFilm()
              } } />
            <Button title='Rechercher' onPress={pressed}/>
            <FlatList
            data={films}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <FilmItem props={item}/>}
            onEndReachedThreshold={0.5}
            onEndReached={ () => {
              console.log("End Reached")
              if(c_page.current < total_page.current){
                console.log("Loading more movies")
                load_film()
              }
              }
            }/>
            {displayLoad()}
        </View>
    )
}

// Components/Search.js

const styles = StyleSheet.create({
    textinput: {
      marginLeft: 5,
      marginRight: 5,
      height: 50,
      borderColor: '#000000',
      borderWidth: 1,
      paddingLeft: 5
    },
    main_container :{
        flex:1,
        marginTop:20
    },
    loading :{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 100,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }
  })

export default Search