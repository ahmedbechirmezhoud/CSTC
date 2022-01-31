import React from "react";
import { StyleSheet } from "react-native";


const styles = StyleSheet.create({

    facebookButton:{

        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems:"center",
        width:"70%",
        height: 40,
        backgroundColor:"#024069",
        borderRadius:180,
        marginTop:24,

    },
    facebookIcon:{
       marginHorizontal:10
      },
    facebookButtonText:{
        color:"white",
        fontWeight:"bold",
        fontSize:16,
        marginHorizontal:16
    }

}
);

export default styles;