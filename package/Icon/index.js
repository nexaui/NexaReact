import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Ionicons} from '@expo/vector-icons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
const myIcon = ({
  Feather,
  size,
  Ion,
  color,
  Material,
  ...props
}) => {
  if (Feather) {
      return(<FeatherIcon name={Feather} size={size} color={color} />)
  } else if (Material) {
      return(<Icon name={Material} size={size} color={color}/>)
  } else if (Ion) {
      return ( <Ionicons name={Ion} color={color} size={size} />)
  }
}
export default myIcon;
