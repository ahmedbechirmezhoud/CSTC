import { Dimensions, StyleSheet, Text, Image, View } from "react-native";
import Background from "../../components/Background/Background";
import { Card } from 'react-native-elements';
import Event from "../../components/Event";
import { collection, onSnapshot, query, orderBy, getDocs } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { db } from "../../configInit";
import Svg, {Rect} from "react-native-svg";
import { InfoContext } from "../../Context/InfoContext";
import BlueButton from "../../components/BlueButton/BlueButton";

export default function VoteClosedScreen(){

    const { dispatchInfo } = useContext(InfoContext);


    return(
        <Background>
            <Card title="Local Modules" containerStyle={styles.container} >
            <Image   
                source={require("../../assets/cs.png")}
                style={styles.logo}
            />
            <Text style={{ fontSize:25, textAlign: "center" }} >Vote is closed </Text>
           
            </Card>
        </Background>
    )
}


const styles = StyleSheet.create({
    container:{
        borderRadius: 20,
        width: "100%",
        height:Dimensions.get("screen").height,
        display:"flex",
        flexDirection: "column",
        alignItems:"center",
        justifyContent:"flex-start"
    },
    logo:{
        width:Dimensions.get("screen").width/3,
        alignSelf: "center",
        resizeMode: "center",
        zIndex:500
    },
  });
  