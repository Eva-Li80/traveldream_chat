import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { RootStackParamList } from '../types/type'

type AllPostNavProps = StackNavigationProp<RootStackParamList, "AllPosts">

type AllPostProps = {
    navigation: AllPostNavProps
}

const AllPosts = ({navigation}: AllPostProps) => {

    const handleNavigate = (id: string) => {
          navigation.navigate("PostDetails", {id})
    }
  return (
  <View style={styles.container}>
    <Text> AllPosts</Text>
    <TouchableOpacity onPress={() => handleNavigate("1")}>
        <Text>Go to Post 1</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigate("2")}>
        <Text>Go to Post 2</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      margin:20
    },
})

export default AllPosts
