import { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";


export default function Event({ index, title, location, dateTime }){

    const [date, setDate] = useState(new Date(dateTime.seconds*1000));
    const [color, setColor] = useState("#e07a2e")
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        setDate(new Date(dateTime.seconds*1000));
        const currentDate = new Date();
        setColor((date < currentDate) ? "#373737" : "#e07a2e" )

    }, [dateTime])
    
    return(
        <View style={{ display:"flex", alignItems:"center", flexDirection:(index%2 === 0 ) ? "row" : "row-reverse", justifyContent:"flex-start", width: Dimensions.get("screen").width, paddingBottom:30 }}>
            <Text style={{ width:(Dimensions.get("screen").width /2)-35, textAlign:(index%2 === 0 ) ? "right" : "left", textAlignVertical:"center", height:70, paddingRight:10, paddingLeft:10,fontSize:10   }} ><Text style={{ fontWeight: "bold", fontSize:12 }}>{title}</Text>{'\n' + location}</Text>
            <Svg
                width={70}
                height={70}
                viewBox="0 0 70 70"
                style={{ alignSelf:"center" }}  
                >
                <Text style={{ color: "#fff", fontWeight:"800", textAlign:"center",textAlignVertical:"top", height:65 }}><Text style={{ fontSize:6 }} >{days[date.getDay()]}</Text>{ '\n' + date.getHours() + "H" + date.getMinutes()}</Text>
                <Circle r={35} opacity={1} cx={35} cy={35} fill={color} />
            </Svg>
        </View>

    )
}


  