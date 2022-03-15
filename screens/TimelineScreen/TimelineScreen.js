import { Dimensions, StyleSheet, Text, Image } from "react-native";
import Background from "../../components/Background/Background";
import { Card } from 'react-native-elements';


export default function TimelineScreen(){
    return(
        <Background>
            <Image
                source={require('../../assets/logo-name-slogan.png')}
            />
            <Card title="Local Modules" containerStyle={styles.container} >
                <Text style={styles.paragraph}>
                    React Native Card View for Android and IOS using
                    "react-native-elements"
                </Text>
            </Card>
        </Background>
    )
}


const styles = StyleSheet.create({
    container:{
        borderRadius: 20,
        width: "100%",
        height:Dimensions.get("screen").height
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#34495e'
    },
  });
  