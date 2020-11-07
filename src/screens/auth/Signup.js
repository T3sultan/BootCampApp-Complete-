import React, {useContext} from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "../../components/common/Text";
import { Colors, Images, Metrics } from "../../theme";
import cs from "../../theme/common-styles";
import { Formik } from "formik";
import * as yup from "yup";
import TextInput from "../../components/common/Input";
import Button from "../../components/common/Button";
import { TouchableOpacity } from "react-native-gesture-handler";
import API from "../../api";
import Loading from '../../components/common/Loading'
import { AuthContext } from "../../context/AuthContext";
import { showMessage } from "react-native-flash-message";
// import FlashMessage from "react-native-flash-message";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .label("Email")
    .email()
    .required("Email field is empty"),
  password: yup
    .string()
    .label("Password")
    .required("Password field is empty")
    .min(5, "Too short password"),
  name: yup.string().label("name").required("Name field is empty"),
  bio: yup.string().label("bio").required("Bio field is empty"),
});

export default function Signup({ navigation }) {
  const {authContext} = useContext(AuthContext)
  const { signUp } = authContext
  return (
    <View style={cs.container}>
      <Formik
        initialValues={{ email: "", password: "", bio: "", name: "" }}
        onSubmit={async (values, action) => {
          action.setSubmitting(true)
          const registerURL = "auth/register";
          try {
            let res = await API.post(registerURL, values);
            // console.log("res ", res);
            action.setSubmitting(false)
            signUp(res.data.token)
          } catch (err) {
            console.log("err ", err.response);
            action.setSubmitting(false)
            showMessage({
              message:err.response.data.msg,
              type:'danger'
            })
          }
        }}
        validationSchema={validationSchema}
      >
        {(formikProps) => {
          return (
            <View style={styles.formWrapper}>
              <TextInput
                placeholder="Full Name"
                formikProps={formikProps}
                formikKey={"name"}
                autoCapitalize="words"
              />

              <TextInput
                placeholder="Email"
                formikProps={formikProps}
                formikKey={"email"}
                autoCapitalize="none"
              />

              <TextInput
                placeholder="Password"
                formikProps={formikProps}
                formikKey={"password"}
                secureTextEntry={true}
              />

              <TextInput
                placeholder="Short bio"
                formikProps={formikProps}
                formikKey={"bio"}
              />

              {formikProps.isSubmitting?(
                <Loading/>
              ):(<Button
                onPress={formikProps.handleSubmit}
                style={{ margin: Metrics.doubleBase }}
                title="Sign up"
              />)}
              
            </View>
          );
        }}
      </Formik>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text semiBold centered>
            By continuing, you accept the <Text primaryColor>Terms of Use</Text>{" "}
            and <Text primaryColor>Privacy Policy.</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formWrapper: {
    marginTop: Metrics.doubleBase,
    marginHorizontal: Metrics.base,
  },

  footer: {
    flex: 1,
    justifyContent: "flex-end",
    margin: Metrics.doubleBase,
  },
});
