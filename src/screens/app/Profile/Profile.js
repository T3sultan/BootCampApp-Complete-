import React, {useState,useEffect} from "react";
import { View, Image, FlatList,TouchableOpacity } from "react-native";
import Text from "../../../components/common/Text";
import {Colors, Images, Metrics} from '../../../theme'
import API from '../../../api'
import commonStyles from '../../../theme/common-styles'
import Loading from '../../../components/common/Loading'
import Button from "../../../components/common/Button";
import ProfileEdit from "../Profile/ProfileEdit"
import FlashMessage from 'react-native-flash-message'
import {showMessage,hideMessage} from 'react-native-flash-message'
import { useIsFocused } from '@react-navigation/native';

export default function Profile({ navigation }) {
  const isFocused = useIsFocused();
  const [loading, setLoading]=useState(true)
  const [bootcampsLoading, setBootcampsLoading] = useState(true)
  const [userData, setUserData]=useState(null)
  const [bootcampsData,setBootcampsData]=useState([])

  
  useEffect(()=>{
    const didFocusSubscription = navigation.addListener(
      'focus',
      payload => {
        console.debug('focus', payload);
        getUserData()
        getUserBootcamps()
      }
    );
    
    return didFocusSubscription
  },[])
  
  // useEffect(()=>{
  //   getUserBootcamps()
  // },[])

  const getUserData = async ()=>{
    const response=await API.get("auth/profile")
    setUserData(response.data.data)
    setLoading(false)
  }

  const getUserBootcamps = async()=>{
    const response = await API.get("bootcamps/getuserbootcamps")
    setBootcampsData(response.data.data)
    setBootcampsLoading(false)
    
  }

  if(loading){
    return <Loading/>
  }

  const renderItem = ({item, index})=>{
    // console.log('item',item)
    return(
      <View style={{borderRadius:8, padding:18,backgroundColor:item.coverColor.code,width:Metrics.screenWidth*0.5,margin:5,}}>
        <Text numberOfLines={1} white title centered>
          {item.title}
        </Text>
        <TouchableOpacity onPress={()=>{
          // console.log('item id', item._id  )
          //setBootcampsLoading
          API.delete(`bootcamps/${item._id}`).then((res)=>{
            // console.log("res delete", res)
            if(res.status===200){
              const newList=bootcampsData.filter(
                (value)=>value._id!==item._id
              )
              setBootcampsData(newList)
              showMessage({
                message:'Deleted Bootcamp',
                type: "danger" ,
              })
            }
          })
        }} style={{alignSelf:'flex-end', marginTop:15}}>
          <Image source={Images.delete}/>

        </TouchableOpacity>
      </View>

    )
  }

  const renderBootcamps=()=>{
    if(bootcampsData.length===0){
      return(
        <View style={{margin:Metrics.base}}>
          <Text bold title>My Bootcamps</Text>
          <Image source={Images.emptyBootcamps}/>
          <Text centered bold>You have not created any bootcamps yet.</Text>
        </View>
      )
    }
    return(
      <View>
        <Text bold title>My Bootcamps</Text>
        <FlatList
          data={bootcampsData}
          keyExtractor={(item,index)=>index.toString()}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal:Metrics.base}}
          renderItem={renderItem}
        />
      </View>

    )

  }
  return (
    <View style={commonStyles.container}>
      <View style={{
        backgroundColor:Colors.green,
        borderBottomRightRadius:80,
        paddingVertical:Metrics.doubleBase,
        paddingHorizontal:Metrics.base,
        justifyContent:'space-between',
        flexDirection:'column',
        
        }}>
        <View>
          <Text title bold white>My Profile</Text>
          <View style={{marginTop:Metrics.base}}>
            <Text white>{userData.name}</Text>
            <Text white>{userData.email}</Text>

            <View style={{marginTop:Metrics.halfBase}}>
              <Text white>
              {userData.bio}
              </Text>
            </View>
          </View>
        </View>
        <View style={{alignSelf:''}}>
          <Button  style={{
            backgroundColor:Colors.green,
            borderColor:'#18B18D',
            width:165,
            height:32,
            marginTop:20
            }} title='Edit Profile' onPress={() => navigation.navigate('ProfileEdit',{email:userData.email,bio:userData.bio,name:userData.name})}/>
        </View>
        
      </View>
      <View>
        {bootcampsLoading?<Loading/>:renderBootcamps()}
      </View>
    </View>
  );
}
