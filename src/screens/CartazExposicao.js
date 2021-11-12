import React from "react";
import { 
    ImageBackground, 
    StyleSheet, 
    Text, 
    View 
} from "react-native";

import image from '../images/exposicao.jpeg';

const CartazExposicao = () => (
  <View style={styles.container}>
    <ImageBackground 
        source={image} 
        resizeMode="stretch" 
        style={styles.image}
    
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
    width: "95%",
    height: "95%",
  }
});

export default CartazExposicao;