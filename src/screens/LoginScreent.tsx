import React, { useState } from "react";
import { View } from "react-native";
import { Text, TextInput, Button, Snackbar } from "react-native-paper";
import { styles } from "../theme/styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";

interface FormLogin {
  email: string;
  password: string;
}

const LoginScreent = () => {
  const navigation = useNavigation();

  const [formLogin, setFormLogin] = useState<FormLogin>({
    email: "",
    password: "",
  });

  const handleSetValues = (key: string, value: string) => {
    setFormLogin({ ...formLogin, [key]: value });
  };

  const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

  const handleSignIn = async () => {
    if (!formLogin.email || !formLogin.password) {
      setShowMessage({
        visible: true,
        message: "Complete todos los campos",
        color: "#ff0000", // Rojo para errores
      });
      return;
    }

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        formLogin.email,
        formLogin.password
      );
      console.log(response);
      // Aquí puedes redirigir al usuario a la pantalla principal o donde desees.
    } catch (e) {
      console.log(e);
      setShowMessage({
        visible: true,
        message: "Datos incorrectos",
        color: "#ff0000",
      });
    }
  };

  interface ShowMessage {
    visible: boolean;
    message: string;
    color: string;
  }

  const [showMessage, setShowMessage] = useState<ShowMessage>({
    visible: false,
    message: "",
    color: "#fff",
  });

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Inicio de Sesión</Text>
      <TextInput
        label="Correo"
        mode="outlined"
        placeholder="Ingrese su correo"
        onChangeText={(value) => handleSetValues("email", value)}
      />
      <TextInput
        mode="outlined"
        label="Contraseña"
        placeholder="Ingrese su contraseña"
        secureTextEntry={hiddenPassword}
        onChangeText={(value) => handleSetValues("password", value)}
        right={
          <TextInput.Icon
            icon={hiddenPassword ? "eye" : "eye-off"}
            onPress={() => setHiddenPassword(!hiddenPassword)}
          />
        }
      />
      <Button
        style={styles.botton}
        icon="login"
        mode="contained"
        onPress={handleSignIn}
      >
        Entrar
      </Button>

      <Snackbar
        style={{ ...styles.message, backgroundColor: showMessage.color }}
        visible={showMessage.visible}
        onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
      >
        <Text>{showMessage.message}</Text>
      </Snackbar>

      <Text
        style={styles.textRedicte}
        onPress={() =>
          navigation.dispatch(CommonActions.navigate({ name: "Registro" }))
        }
      >
        ¿No tienes una cuenta? Regístrate
      </Text>
    </View>
  );
};

export default LoginScreent;
