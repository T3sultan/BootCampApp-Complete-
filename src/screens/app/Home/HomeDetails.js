import React from "react";
import { View,ScrollView,Image, TouchableOpacity } from "react-native";
import commonStyles from '../../../theme/common-styles'
import { Images,Metrics,Colors } from "../../../theme";
import Text from "../../../components/common/Text";
import Home from "../Home/Home"

export default function HomeDetails({ route, navigation }) {
  const {card}=route.params
  return (
    <ScrollView style={commonStyles.container}>
      <View 
        style={{
          padding:20, //60
          backgroundColor:card.coverColor.code,
          paddingBottom:Metrics.base,
          }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View>
            <Image source={Images.backWhite}/>
          </View>
        </TouchableOpacity>

        <View>
          <Text centered display bold white>
            {card.title}
          </Text>

          <View style={{flexDirection:'row', marginTop:Metrics.base, alignSelf:'center'}}>
            <View style={{flexDirection:"row", alignItems:'center'}}>
              <Image source={Images.calender}/>
              <Text style={{marginLeft:6}} white>
              {card.duration} months
              </Text>
            </View>

            <View style={{
                flexDirection:'row',
                alignItems:'center',
                marginLeft:Metrics.base}}
                >
              <Image source={Images.teacher}/>
              <Text style={{marginLeft:6}} white>
                {card.user.name}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={{
          justifyContent:'space-between',
          flexDirection:'row',
          marginRight:Metrics.base
        }}>
          {card.price && (
              <View 
                  style={{
                    // alignSelf:'flex-end',
                    // margin:Metrics.base,
                    marginTop:Metrics.doubleBase,
                    
                    padding: 6,
                    paddingHorizontal:10,
                    }}>
                    <Text caption white >
                      TK {card.price}
                    </Text>
                </View>
            )}
            {!card.price && (
              <View 
                  style={{
                    // alignSelf:'flex-end',
                    // margin:Metrics.base,
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
                                    
            {card.isScholarship && (
              <View 
                  style={{
                    // alignSelf:'flex-end',
                    // margin:Metrics.base,
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
          
            {card.jobGuarantee && (
              <View 
              style={{
                
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
      <View 
        style={{
          flexDirection:'row',
          alignItems:'center',
          margin:Metrics.base}}
        >
          <Image source={Images.location}/>
          <Text caption bold style={{marginLeft:Metrics.halfBase}}>
          {card.address}
          </Text>
      </View>
      <View style={{margin:Metrics.base}}>
        <Text title bold>
          {card.title}
        </Text>
        <View style={{marginTop:6}}>
          <Text midGrey>{card.description}</Text>
        </View>
      </View>
      <View style={{margin:Metrics.base}}>
          <View>
            <Text title bold>Contact</Text>
          </View>
         
          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:Metrics.halfBase}}>
            <View style={{flexDirection:'row'}}>
              <Image source={Images.homeBlue} style={{marginRight:10}}/>
              <Text>{card.website}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Image source={Images.phoneBlue} style={{marginRight:10}}/>
              <Text>{card.contact}</Text>
            </View>

          </View>
          
          <View style={{flexDirection:'row',marginTop:Metrics.halfBase}}>
            <Image source={Images.messageBlue} style={{marginRight:10}}/>
            <Text>{card.email}</Text>
          </View>

      </View>
      <View style={{margin:Metrics.base}}>
        <View>
          <Text title bold>Address</Text>
        </View>
        <View style={{marginTop:Metrics.halfBase}}>
          <Text>{card.address}</Text>
        </View>

      </View>
      <View style={{margin:Metrics.base}}>
        <View>
          <Text title bold>Careers</Text>
        </View>
        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
            {card.careers.map((careers, index)=>{
                
                return(
                    <View key={index}
                      style={{
                        marginTop:Metrics.halfBase,
                        backgroundColor:'#6FCF97',
                        borderColor:'white',
                        borderWidth:1,
                        borderRadius:30,
                        padding: 6,
                        paddingHorizontal:10,
                        marginRight:5
                        }}
                      >
                        <Text white style={{fontSize:14,lineHeight:21,padding:5}}>
                            {`${careers}`}
                        </Text>
                    </View>
                )
            })}
        </View>

      </View>
    </ScrollView>
    
  );
}
