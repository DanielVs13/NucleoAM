import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";
import { styles } from "../../theme/styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Product } from "./HomeScreen";
import { dbRealTime } from "../../config/firebaseConfig";
import { ref, remove, update } from "firebase/database";

const DetailProductScreen = () => {
  const route = useRoute();
  //@ts-ignore
  const { product } = route.params;
  const navigation = useNavigation();

  const [formEdit, setformEdit] = useState<Product>({
    id: "",
    code: "",
    nombre: "",
    descripcion: "",
    price: 0,
    stock: 0,
  });

  useEffect(() => {
    setformEdit(product);
  }, []);

  const handleSetValues = (key: string, value: string) => {
    setformEdit({ ...formEdit, [key]: value });
  };

  const handleUpdateProduct = async () => {
    const dbRef = ref(dbRealTime, "products/" + formEdit.id);
    try {
      await update(dbRef, {
        code: formEdit.code,
        nombre: formEdit.nombre,
        price: formEdit.price,
        stock: formEdit.stock,
        descripcion: formEdit.descripcion,
      });
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteProduct = async () => {
    const dbRef = ref(dbRealTime, "products/" + formEdit.id);
    try {
      await remove(dbRef);
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.rootDetail}>
      <Text>PRODUCTO</Text>
      <Divider />
      <View>
        <Text>Código:</Text>
        <TextInput
          mode="outlined"
          onChangeText={(value) => handleSetValues("code", value)}
          label={formEdit.code}
        />
        <Text>Nombre:</Text>
        <TextInput
          mode="outlined"
          onChangeText={(value) => handleSetValues("nombre", value)}
          label={formEdit.nombre}
        />
        <Text>Precio:</Text>
        <TextInput
          mode="outlined"
          onChangeText={(value) => handleSetValues("price", value)}
          label={formEdit.price.toString()}
        />
        <Text>Stock:</Text>
        <TextInput
          mode="outlined"
          onChangeText={(value) => handleSetValues("stock", value)}
          label={formEdit.stock.toString()}
        />
        <Text>Descrip:</Text>
        <TextInput
          mode="outlined"
          onChangeText={(value) => handleSetValues("descripcion", value)}
          label={formEdit.descripcion}
        />
      </View>
      <Button mode="contained-tonal" onPress={handleUpdateProduct}>
        Actualizar
      </Button>
      <Button mode="contained-tonal" onPress={handleDeleteProduct}>
        Eliminar
      </Button>
    </View>
  );
};

export default DetailProductScreen;
