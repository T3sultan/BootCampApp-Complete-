import React, {useState,useEffect} from "react";
import { View, ScrollView,TouchableOpacity,Image,TextInput } from "react-native";
import { Images,Metrics,Colors} from "../../../theme";
import commonStyles from '../../../theme/common-styles'
import Text from "../../../components/common/Text";
import { Formik } from "formik";
import * as yup from 'yup'
import API from '../../../api'



export default function ProfileEdit({ route, navigation }) {
  const {name,bio,email}=route.params
  const [characterCount,setCharacterCount]=useState(null)
  const [aboutMe,setAboutMe]=useState(null)
  const [userName,setUserName]=useState(null)
  useEffect(()=>{
    setCharacterCount(bio.length)
    setAboutMe(bio)
    setUserName(name)
  },[])
  return (
    <ScrollView style={{...commonStyles.container,padding:Metrics.base}}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{marginRight:Metrics.base}}>
              <View>
                <Image source={Images.back}/>
              </View>
          </TouchableOpacity>
          <View>
            <Text bold>Edit Profile</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={ async ()=>{
            const updateUrl='auth/profile'
            try{
                
                let res=await API.put(updateUrl, { bio: aboutMe, name: userName })
                navigation.navigate('Profile')
               
            }
            catch(err){
              console.log('err ',err.response)
            }
          }}>
            <View>
              <Text bold style={{color:Colors.primary}}>Save</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={{marginTop:48}}>
        <View>
          <Text caption>
            About me
          </Text>
          <TextInput 
            multiline 
            numberOfLines={4} 
            maxLength={300} 
            editable 
            defaultValue={bio}
            onChangeText={(text) => {setCharacterCount(text.length);setAboutMe(text)}}
            style={{marginTop:13,borderBottomColor:'#333333',borderBottomWidth:1}}/>
          <Text small style={{alignSelf:'flex-end'}}>{characterCount}/300</Text>
        </View>
        
      </View>
      <View style={{marginTop:48}}>
        <View>
          <Text caption>
            Name
          </Text>
          <TextInput onChangeText={(text) => {setUserName(text)}} editable={true} defaultValue={name} style={{marginTop:13,borderBottomColor:'#333333',borderBottomWidth:1}}/>
        </View>
      </View>
      <View style={{marginTop:35}}>
        <View>
          <Text caption>
            Email
          </Text>
          <TextInput editable={false} value={email} style={{marginTop:13,color:Colors.midGrey,borderBottomColor:'#333333',borderBottomWidth:1}}/>
        </View>
      </View>
    </ScrollView>
    );
}
