import React from "react";
import { ActivityIndicator, View } from "react-native";
import {Colors} from '../../theme'

export default function Loading({size='large'}){
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator color={Colors.primary} />
        </View>
    )
}