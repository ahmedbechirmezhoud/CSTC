import {  StyleSheet, TextInput, Image, Text, Dimensions } from "react-native";
import React from "react";
import Background from "../../../components/Background/Background";
import BlueButton from "../../../components/BlueButton/BlueButton";
import { Card } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';


export default UpdateProfile = () => {

    const { register, handleSubmit, watch,control, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

	return (
		<Background>
			<Image
                source={require('../../../assets/logo-name-slogan.png')}
                style={styles.logo}
            />

			<Card title="Local Modules" containerStyle={styles.container} >				
					<Text style ={{fontSize: 15, fontWeight: "bold"}} >Update your profile </Text>
					<Text style ={{fontSize: 10, fontWeight: "100", marginBottom: 25}} >This information will be shared with the congress hotel</Text>
                    <Controller
                        control={control}
                        render={({field: { onChange, onBlur, value }}) => (
                        <TextInput
                            style={styles.inputBox}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            placeholder="Name"
                        />
                        )}
                        name="name"
                        rules={{ required: true }}
                    />
                    <Controller
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                    <TextInput
                        style={styles.inputBox}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                        placeholder="Phone"
                    />
                    )}
                    name="phone"
                    rules={{ required: true }}
                />
                <Controller
                        control={control}
                        render={({field: { onChange, onBlur, value }}) => (
                        <TextInput
                            style={styles.inputBox}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            placeholder="CIN"
                        />
                        )}
                        name="CIN"
                        rules={{ required: true }}
                    />
                    <Controller
                        control={control}
                        render={({field: { onChange, onBlur, value }}) => (
                        <TextInput
                            style={styles.inputBox}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            placeholder="Birthday date"
                        />
                        )}
                        name="birthday"
                        rules={{ required: true }}
                    />
                    <Controller
                        control={control}
                        render={({field: { onChange, onBlur, value }}) => (
                        <TextInput
                            style={styles.inputBox}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            placeholder="Address"
                        />
                        )}
                        name="address"
                        rules={{ required: true }}
                    />
                    <Controller
                        control={control}
                        render={({field: { onChange, onBlur, value }}) => (
                        <TextInput
                            style={styles.inputBox}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            placeholder="University"
                        />
                        )}
                        name="university"
                        rules={{ required: true }}
                    />
                   
				<BlueButton text={"Confirm"} buttonHandler={handleSubmit(onSubmit)} />
			</Card>
		</Background>
	);
};

const styles = StyleSheet.create({

	inputBox: {
        width: Dimensions.get("screen").width-100,
		backgroundColor: "#F8F8F8",
		borderColor: "#A8A8A8",
		borderWidth: 1,
		borderRadius: 10,
		marginVertical: 10,
		alignSelf: "center",
		color: "#525252",
		fontSize: 16,
		padding: 10,
		fontWeight:"bold"
	},
	logo:{
        width:"70%",
        resizeMode: "contain",
    },
	container:{
		borderRadius: 21,
		width:Dimensions.get("screen").width-50,
		display:"flex",
		alignItems: "center",
		justifyContent: "center",
        marginBottom:50

	}
});
