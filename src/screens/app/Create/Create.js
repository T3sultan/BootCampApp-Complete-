import React from "react";
import { View, ScrollView,Alert } from "react-native";
import commonStyles from '../../../theme/common-styles'
import * as yup from 'yup'
import { Metrics,Colors } from "../../../theme";
import { Formik } from "formik";
import Input from '../../../components/common/Input';
import Text from '../../../components/common/Text';
import Button from '../../../components/common/Button';
import Loading from '../../../components/common/Loading';

import TagInput from "../../../components/Taginput";
import {Switch, Icon} from 'native-base'
import { TouchableOpacity } from "react-native-gesture-handler";
import FlashMessage from 'react-native-flash-message'
import {showMessage,hideMessage} from 'react-native-flash-message'

import API from '../../../api'

const colors=[
  {
    name:"orange",
    code:"#F2994A",
  },
  {
    name:"green",
    code:"#27AE60",
  },
  {
    name:"purple",
    code:"#9B51E0",
  },
  {
    name:"blue",
    code:"#2D9CDB",
  }
]
export default function Create({ navigation }) {
  return (
    <ScrollView style={commonStyles.container}>
      <View style={{margin:Metrics.base}}>
        <Text title bold>Create bootcamp</Text>
        <Formik
          initialValues={{
            title:'',
            description:'',
            careers:[],
            duration:'',
            address:'',
            email:'',
            website:'',
            price:'',
            contact:'',
            isScholarship:false,
            jobGuarentee:false,
            coverColor:{
              name:"orage",
              code:Colors.orange
            }
          }}
          onSubmit={(values,action)=>{
            console.log('values',values)
            action.setSubmitting(true)
            API.post('bootcamps',values)
            .then((res)=>{
              // console.log('res',res);
              action.setSubmitting(false)
              showMessage({
                message:'Successfully created',
                type: 'success',
              })
              action.resetForm();
              navigation.navigate('Profile')
              })
            .catch((err)=>{console.log(err);action.setSubmitting(false)})
          }}
        >
        {(formikProps)=>(
          <View style={{marginTop:Metrics.doubleBase}}>
          <Input
              formikKey='title'
              formikProps={formikProps}
              placeholder='Title'
              autoCapitalize='words'
            />
          <Input
              formikKey='description'
              formikProps={formikProps}
              placeholder='Description'
            />
          <View style={{marginBottom:Metrics.doubleBase}}>
            <Text style={{marginBottom:5}} lightGrey>
              Creers (press space after adding a career)
            </Text>
            <TagInput formikProps={formikProps} formikKey="careers"/>
          </View>
          <Input
              formikKey='duration'
              formikProps={formikProps}
              placeholder='Duration (in months)'
              keyboardType='numeric'
            />
          <Input
              formikKey='price'
              formikProps={formikProps}
              placeholder='Price'
              keyboardType={'numeric'}
            />
          <Input
              formikKey='address'
              formikProps={formikProps}
              placeholder='Bootcamp address'
            />
          <Input
              formikKey='email'
              formikProps={formikProps}
              placeholder='Contact Email'
              autoCapitalize='none'
            />
          <Input
              formikKey='contact'
              formikProps={formikProps}
              placeholder='Contact number'
            />
          <Input
              formikKey='website'
              formikProps={formikProps}
              placeholder='Bootcamp website'
              autoCapitalize='none'
            />
          <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            marginVertical:Metrics.base
          }}>
            <View style={{flex:1, marginRight:10}}>
              <Text style={{marginBottom:5}} bold>
                Scholarship Available
              </Text>
              <Text caption>
                Do you provide scholarship to the students?
              </Text>
            </View>
            <Switch
              onValueChange={(value)=>{
                formikProps.setFieldValue("isScholarship", value)
              }}
              value={formikProps.values["isScholarship"]}
            />
          </View>
          <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            marginVertical:Metrics.base
          }}>
            <View style={{flex:1, marginRight:10}}>
              <Text style={{marginBottom:5}} bold>
                Job Ready
              </Text>
              <Text caption>
                will students become job ready after completing?
              </Text>
            </View>
            <Switch
              onValueChange={(value)=>{
                formikProps.setFieldValue("jobGuarentee", value)
              }}
              value={formikProps.values["jobGuarentee"]}
            />
          </View>

          <View style={{marginTop:Metrics.doubleBase}}>
            <Text bold>Select your cover color</Text>
            <View style={{flexDirection:"row", paddingTop:20}}>
              {colors.map((item)=>{
                return(
                  <TouchableOpacity
                    key={item.name}
                    onPress={()=>{
                      formikProps.setFieldValue("coverColor",item)
                    }}
                    style={{
                      height:Metrics.doubleBase,
                      width:Metrics.doubleBase,
                      backgroundColor:item.code,
                      marginRight:Metrics.base,
                      borderRadius:Metrics.base,
                      alignItems:'center',
                      justifyContent:'center'
                    }}
                  >
                  {item.name===formikProps.values["coverColor"].name && (
                    <Icon
                      name="ios-checkmark"
                      style={{color:Colors.white,fontSize:30}}
                    />
                  )}

                  </TouchableOpacity>
                )
              })}

            </View>

          </View>

          {formikProps.isSubmitting ? (<Loading/>):(
            <Button onPress={formikProps.handleSubmit} style={{marginTop:Metrics.base}} title='Create'/>
          )}
          
          </View>
        )}

        </Formik>
      </View>
      <FlashMessage position='top'/>
    </ScrollView>
    
  );
}
