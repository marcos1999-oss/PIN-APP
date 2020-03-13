import React from 'react';
import {Platform, View, Text} from "react-native";
import Pulse from "../Business/Home/Pulse";
import {Colors} from "../../Themes";
import {moderateScale, verticalScale} from "../../Utils/scaling";

const NoDealsView = () => {
    const IS_ANDROID = Platform.OS === "android";
    return(
        <View style={{
            flex: 1,
            alignItems: "center",
            flexDirection: "column",
            paddingVertical: verticalScale(30),
        }}>
            <View style={{ flex: 1}}>
                <Pulse
                    color={Colors.background}
                    diameter={400}
                    wrapperStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    contentView={
                        <View
                            style={{
                                backgroundColor: Colors.background,
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: IS_ANDROID
                                        ? "SignPainter_HouseScript"
                                        : "SignPainter",
                                    fontSize: moderateScale(28),
                                    color: "white",
                                }}
                            >
                                scopin
                            </Text>
                        </View>
                    }
                />
            </View>
            <View style={{
                height: 100,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontSize: 19,
                    textAlign: 'center',
                    color: "#C4C4C4"
                }}>Currently no new deals{"\n"}pass by locations to see more deals</Text>
            </View>
        </View>
    )
};

export default NoDealsView;
