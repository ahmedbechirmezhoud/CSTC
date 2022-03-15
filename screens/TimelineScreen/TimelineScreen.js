import { Dimensions, StyleSheet, Text, Image, View } from "react-native";
import Background from "../../components/Background/Background";
import { Card } from 'react-native-elements';
import Event from "../../components/Event";
import { collection, onSnapshot, query, orderBy, getDocs } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { db } from "../../configInit";
import Svg, {Rect} from "react-native-svg";
import { InfoContext } from "../../Context/InfoContext";

export default function TimelineScreen(){

    const [events, setEvents] = useState(undefined);
    const [timePercentage, setTimePercentage] = useState(0);

    function totalSeconds(date){
        return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
    }

    useEffect(() => {
        getDocs(query(collection(db, "timeline"), orderBy("dateTime", "asc"))).then((querySnapshot) => {
            const auxevents = [];
            querySnapshot.forEach((doc) => {
                auxevents.push(doc.data());
            });
            setEvents(auxevents);
            /*
            const startAt = (new Date(auxevents[0]?.dateTime.seconds*1000));
            const endsAt = (new Date(auxevents[1]?.dateTime.seconds*1000));
            const currentDate = (new Date((auxevents[1]?.dateTime.seconds*1000)).getTime());
            const diffTime = Math.abs(endsAt.getTime() - startAt.getTime());
            console.log(diffTime)
            setTimePercentage(diffTime/(diffTime));
            console.log(timePercentage)*/
        }).catch((error) => {
            dispatchInfo({ payload: { error : error } })
          });

        
    }, [])

    return(
        <Background>
            <Image
                source={require('../../assets/logo-name-slogan.png')}
                style={styles.logo}
            />
            {events && <Card title="Local Modules" containerStyle={styles.container} >
                <View style={{ display:"flex", justifyContent: "space-between", height:Dimensions.get("screen").height, paddingBottom:70 }}>
                {events && events.map((event, i) => <Event dateTime={event.dateTime} title={event.title} key={i} index={i} location={event.location} /> ) }
                </View>
            <Svg
                width={Dimensions.get("screen").width}
                height={Dimensions.get("screen").height}
                viewBox={"0 0 " + Dimensions.get("screen").width + " " + Dimensions.get("screen").height}
                style={{ alignSelf:"center", position:"absolute", zIndex:-50 }}
            >
                <Rect x={Dimensions.get("screen").width/2} y="15" width="0" height={Dimensions.get("screen").height*timePercentage} stroke="#373737" strokeWidth="7"  />
                <Rect x={Dimensions.get("screen").width/2} y={15+Dimensions.get("screen").height*timePercentage} width="0" height={Dimensions.get("screen").height-Dimensions.get("screen").height*timePercentage} stroke="#e07a2e" strokeWidth="7"  />
            </Svg>
            </Card>}
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
        width:"40%",
        resizeMode: "contain",
        
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#34495e'
    },
  });
  