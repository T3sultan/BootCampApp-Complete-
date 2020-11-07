import React, {useState,useEffect} from "react";
import { View, Image, FlatList,TouchableOpacity, StyleSheet } from "react-native";
import Text from "../../../components/common/Text";
import {Colors, Images, Metrics} from '../../../theme'
import API from '../../../api'
import commonStyles from '../../../theme/common-styles'
import Loading from '../../../components/common/Loading'
import Button from "../../../components/common/Button";
import ProfileEdit from "../Profile/ProfileEdit"
import FlashMessage from 'react-native-flash-message'
import {showMessage,hideMessage} from 'react-native-flash-message'
import HomeDetails from "../Home/HomeDetails"
const styles=StyleSheet.create({
  card:{
    borderRadius:4,
    borderWidth:2,
    borderColor:'#E8E8E8',
    backgroundColor:'white', marginBottom:34
  },
})
export default function Bookmark({ navigation }) {
  const [loading, setLoading]=useState(true)
  const [bootcampsLoading, setBootcampsLoading] = useState(true)
  const [userData, setUserData]=useState(null)
  const [bootcampsData,setBootcampsData]=useState([])

  useEffect(()=>{
    getUserData()
  },[])
  
  useEffect(()=>{
    getSavedBootcamps()
  },[])

  const getUserData = async ()=>{
    const response=await API.get("auth/profile")
    setUserData(response.data.data)
    setLoading(false)
  }

  const getSavedBootcamps = async()=>{
    const response = await API.get("bootcamps/getSavedBootcamps")
    
    setBootcampsData(response.data.bootcamps)
    setBootcampsLoading(false)
    
  }

  if(loading){
    return <Loading/>
  }

  const renderItem = ({item, index})=>{
   
    return(
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('HomeDetails',{card:item})}>
          <View>
            <View 
              style={{
                flexDirection:'row',
                alignItems:'center',
                margin:Metrics.base}}
              >
                <Image source={Images.location}/>
                <Text caption bold style={{marginLeft:Metrics.halfBase}}>
                {item.address}
                </Text>
            </View>
            
            <View 
              style={{
                paddingTop:10, //60
                backgroundColor:item.coverColor.code,
                paddingBottom:Metrics.base}}>
              <View>
                <Text centered display bold white>
                  {item.title}
                </Text>

                <View style={{flexDirection:'row', marginTop:Metrics.base, alignSelf:'center'}}>
                  <View style={{flexDirection:"row", alignItems:'center'}}>
                    <Image source={Images.calender}/>
                    <Text style={{marginLeft:6}} white>
                    {item.duration} months
                    </Text>
                  </View>

                  <View style={{
                      flexDirection:'row',
                      alignItems:'center',
                      marginLeft:Metrics.base}}
                      >
                    <Image source={Images.teacher}/>
                    <Text style={{marginLeft:6}} white>
                      {item.user.name}
                    </Text>
                  </View>
                </View>
              </View>
              
              <View style={{
                justifyContent:'space-between',
                flexDirection:'row',
                marginRight:Metrics.base
              }}>
                {item.price && (
                    <View 
                        style={{
                          
                          marginTop:Metrics.doubleBase,
                         
                          padding: 6,
                          paddingHorizontal:10,
                          }}>
                          <Text caption white >
                            TK {item.price}
                          </Text>
                      </View>
                  )}
                  {!item.price && (
                    <View 
                        style={{
                         
                          marginTop:Metrics.doubleBase,
                         
                          padding: 6,
                          paddingHorizontal:10,
                          }}>
                          <Text caption white>
                            TK 0
                          </Text>
                      </View>
                  )}

                  <View style={{
                alignSelf:'flex-end',
                flexDirection:'row',
                marginRight:Metrics.base}}>
                                          
                  {item.isScholarship && (
                    <View 
                        style={{
                          
                          marginTop:Metrics.doubleBase,
                          borderColor:'white',
                          borderWidth:1,
                          borderRadius:30,
                          padding: 6,
                          paddingHorizontal:10,}}>
                          <Text caption white>
                            Scholarship
                          </Text>
                      </View>
                  )}
                
                  {item.jobGuarantee && (
                    <View 
                    style={{
                      // alignSelf:'flex-end',
                      marginLeft:Metrics.halfBase,
                      marginTop:Metrics.doubleBase,
                      borderColor:'white',
                      borderWidth:1,
                      borderRadius:30,
                      padding: 6,
                      paddingHorizontal:10,}}>
                      <Text caption white>
                        Job Ready
                      </Text>
                    </View>
                  )}              
              </View>
          

              </View>

              </View>

            <View style={{margin:Metrics.base}}>
                <Text title bold>
                  {item.title}
                </Text>
                <View style={{marginTop:6}}>
                  <Text midGrey>{item.description}</Text>
                </View>
              </View>
          </View>          
        </TouchableOpacity>

    )
  }

  const renderBootcamps=()=>{
    if(bootcampsData.length===0){
      return(
        <View style={{margin:Metrics.base}}>
          
          <Image source={Images.emptyBootcamps}/>
          <Text centered bold>You have not saved any bootcamps yet.</Text>
        </View>
      )
    }
    return(
      <View>
        
        <FlatList
          data={bootcampsData}
          keyExtractor={(item,index)=>index.toString()}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal:Metrics.base}}
          renderItem={renderItem}
        />
      </View>

    )
  }
  return (
    <View style={commonStyles.container}>
      <View style={{margin:Metrics.base,marginBottom:34}}>
        <View>
          <Text title bold>Saved Bootcamps</Text>
        </View>
      </View>
      <View>
        {bootcampsLoading?<Loading/>:renderBootcamps()}
      </View>
    </View>
  );
}
