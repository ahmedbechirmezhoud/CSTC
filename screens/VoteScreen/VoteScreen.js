import { Dimensions, StyleSheet, Text, Image } from "react-native";
import Background from "../../components/Background/Background";
import { Card } from 'react-native-elements';
import { useState, useContext, useEffect } from "react";
import { InfoContext } from "../../Context/InfoContext";
import BlueButton from "../../components/BlueButton/BlueButton";

import { CheckBox } from 'react-native-elements';
import { getParticipantList, voteForParticipant } from "../../services/vote/userFuncs";
import { CurrentUser } from "../../utils/user";


export default function VoteScreen(){

    const { dispatchInfo } = useContext(InfoContext);
    const [universities, setUniversities] = useState([]);
    const [choosed, setchoosed] = useState(null);
    const [voted, setVoted] = useState(CurrentUser.votedFor);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        console.log(CurrentUser.votedFor)
        getParticipantList()
            .then((arr)=>{
                setUniversities(arr);
            })
            .catch(error => {
                dispatchInfo({ payload : { error } });
                console.log(error);
                setLoading(false);
            });
    }, [])

    const handleSubmit = () => {
        setLoading(true);
        voteForParticipant(choosed)
            .then(() => {
                setVoted(choosed);
                setLoading(false);
            })
            .catch(error => {
                dispatchInfo({ payload : { error } });
                console.log(error);
                setLoading(false);
            } )
        
    }

    return(
        <Background>
            <Card title="Local Modules" containerStyle={styles.container} >
            <Image   
                source={require("../../assets/cs.png")}
                style={styles.logo}
            />
            <Text style={{ fontSize:12, textAlign: "center" }} >Vote for the best video among</Text>
            { (universities && 
            (<>
            {universities.map((university, i) => (
                <CheckBox
                key={i}
                center
                title={university}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                containerStyle={ [styles.votebtn, (choosed === university) && styles.selected, (voted === university) && styles.voted ]}
                textStyle={{ fontWeight:"bold", color:"#fff" }}
                wrapperStyle={{ alignSelf: "flex-start" }}
                checked={choosed === university}
                onPress={() => setchoosed(university)}              
            />))}
            <BlueButton text="Vote" disabled={loading} style={{ alignSelf: "center", marginTop: Dimensions.get("screen").height/10 }} buttonHandler={handleSubmit} />
            </>))}
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
        height:Dimensions.get("screen").width/3,
        alignSelf: "center",
        resizeMode: "center",
        zIndex:500
    },
    votebtn:{
        width:Dimensions.get("screen").width*7/8,
        backgroundColor:"#9A9A9A",
        borderRadius: 2,
    },
    selected:{
        borderColor:"#009FF9",
        backgroundColor:"#009FF9",
        borderWidth: 4
    },
    voted:{
        backgroundColor:"#192630"
    }
    
  });
  