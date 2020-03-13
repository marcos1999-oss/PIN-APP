import React from "react";
import { Text, View, SafeAreaView, Dimensions } from "react-native";
import { Formik } from "formik";
import CustomIcon from "../../CustomIcon";
import { Btn, TextInput } from "../../Components/Common";
import Image from "react-native-auto-height-image";
import { city2 } from "../../Assets";
import { FormContainer } from "./Common";

/*Style*/
import style from "./style.js";
const countryCode = "800";
const networkProvider = "923";

export default class ForgetPasswordSuccess extends React.Component {
    constructor(props) {
        super(props);
    }

    form = {
        phone: `${countryCode} - ${networkProvider} - `,
    };

    submit = (values, actions) => {
        // alert(actions);
    };

    continuePress = () => {

    };

    render() {
        const deviceWidth = Dimensions.get("window").width;
        return (
            <SafeAreaView style={style.l_container}>
                <View style={{ marginTop: 30, alignItems: "center", marginBottom: 15 }}>
                    <Text style={{ fontSize: 14, color: 'white', marginBottom: 16 }}>
                        Success
                    </Text>
                    <CustomIcon name="setting" size={40} color={"#fff"} />
                </View>


                <View style={{ marginLeft: 25, marginTop: 16, marginBottom: 15 }}>
                    <Text style={{ fontSize: 16, color: 'white', marginBottom: 16 }}>
                        Support Team
                    </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 10, color: 'white', marginBottom: 16 }}>
                        You will receive a password reset email soon...
                    </Text>
                </View>


                <Image style={style.l_bottom} source={city2} width={deviceWidth} />

                <View style={{ marginLeft: 25, marginRight: 25, marginTop: 50 }}>
                    <Btn
                        color={'#FFFFFF'}
                        textColor={"#5F92F3"}
                        block
                        rounded
                        title="Continue"
                        onPress={this.continuePress}
                    />

                    <Text style={{ marginTop: 8, fontSize: 10, color: 'white', textAlign: 'center', marginBottom: 16 }}>
                        Please check you email
                    </Text>
                </View>
            </SafeAreaView>
        );
    }
}
