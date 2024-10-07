import React, { useState } from "react";
import { View } from "react-native";
import { Text, TextInput, Button, Snackbar } from "react-native-paper";
import { styles } from "../theme/styles";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";

interface FormRegister {
  email: string;
  password: string;
}

interface ShowMessage {
  visible: boolean;
  message: string;
  color: string;
}

const RegisterScreent = () => {
  const navigation = useNavigation();

  const [formaRegister, setFormaRegister] = useState<FormRegister>({
    email: "",
    password: "",
  });

  const [showMessage, setShowMessage] = useState<ShowMessage>({
    visible: false,
    message: "",
    color: "#ff0000",
  });

  const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

  const handleSetValues = (key: string, value: string) => {
    setFormaRegister({ ...formaRegister, [key]: value });
  };

  const handleRegister = async () => {
    if (!formaRegister.email || !formaRegister.password) {
      setShowMessage({
        visible: true,
        message: "Complete todos los campos",
        color: "#ff0000",
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        formaRegister.email,
        formaRegister.password
      );
      setShowMessage({
        visible: true,
        message: "Registro exitoso",
        color: "#008000", 
      });
    } catch (e) {
      console.log(e);
      setShowMessage({
        visible: true,
        message: "Error al crear usuario",
        color: "#ff0000",
      });
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Registro</Text>
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
        icon="account"
        mode="contained"
        onPress={handleRegister}
      >
        Registrarse
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
          navigation.dispatch(CommonActions.navigate({ name: "Login" }))
        }
      >
        ¿Ya tienes una cuenta? Inicia sesión
      </Text>
    </View>
  );
};

export default RegisterScreent;
