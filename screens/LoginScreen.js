import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, Alert } from "react-native";

export default function SignIn(props) {
  const {authenticateUser} = props;
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (email && password) {
      console.log(email, password);
      try {
        authenticateUser({ email, password }); // Pass object directly
      } catch (err) {
        console.log("Error during submission: ", err.message);
        let msg = err.message;
        if (msg.includes("invalid-login-credentials")) msg = "Invalid credentials";
        if (msg.includes("auth/invalid-email")) msg = "Invalid email";
        Alert.alert("Sign In Error", msg);
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.bg }}>
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 4, padding: 2, borderRadius: 10, backgroundColor: 'yellow' }}>
          <Text>Back</Text>
        </TouchableOpacity>

        <View style={{ flex: 1, paddingHorizontal: 8, paddingTop: 8, borderTopLeftRadius: 50, borderTopRightRadius: 50, backgroundColor: 'white' }}>
          <TextInput
            style={{ marginBottom: 3, padding: 4, backgroundColor: '#f0f0f0', borderRadius: 10 }}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={{ padding: 4, backgroundColor: '#f0f0f0', borderRadius: 10 }}
            secureTextEntry
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={handleSubmit} style={{ marginTop: 5, padding: 3, borderRadius: 10, backgroundColor: 'yellow' }}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
