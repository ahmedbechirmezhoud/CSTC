import React, { useContext } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { InfoContext } from "../Context/InfoContext";


export default function ErrorModal(){

    const {info, dispatchInfo} = useContext(InfoContext);

    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={info?.error != null}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          dispatchInfo({payload : {error : null}});
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{info.error?.message}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() =>  dispatchInfo({payload : {error : null}})}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
}


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
  