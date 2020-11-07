import React, {useState} from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import Tags from 'react-native-tags'
import {Colors, Fonts} from '../theme'
import Text from './common/Text'
const styles=StyleSheet.create({
    label:{
        color:Colors.midGrey,
        fontSize:Fonts.size.body,
        fontFamily:Fonts.type.base
    }
})
export default function TagInput({formikProps}){
    const [borderColor,setBorderColor]=useState(Colors.lightGrey)
    return(
        <Tags
            initialTags={formikProps.values["careers"]}
            onChangeTags={(careers)=>{
                console.log("careers",careers)
                formikProps.setFieldValue("careers",careers)
            }}
            onTagPress={(index,tagLabel,event,deleted)=>console.log(index,tagLabel,event, deleted?"deleted":"not deleted")}
            inputStyle={{
                borderBottomColor:borderColor,
                borderBottomWidth:1,
                borderRadius:0,
                backgroundColor:"white",
                color:Colors.darkGrey,
                fontSize:Fonts.size.body,
                fontFamily:Fonts.type.base,
                lineHeight:17,
                paddingLeft:0,
            }}
            tagTextStyle={styles.label}
            renderTag={({tag,index, onPress, deleteTagOnPress, readonly})=>(
                <TouchableOpacity style={{
                    borderWidth:1,
                    borderColor:"#18B18D",
                    borderRadius:4,
                    marginVertical:3
                }}
                key={`${tag}-${index}`}
                onPress={onPress}
                >
                <View style={{padding:10}}>
                    <Text fwBold caption primaryColor>
                        {tag}
                    </Text>
                </View>

                </TouchableOpacity>
            )}


        />
    )
}