import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, Button, Avatar, IconButton, Portal, Modal, Divider, TextInput, FAB } from 'react-native-paper';
import { styles } from '../../theme/styles';
import { signOut } from 'firebase/auth';
import { auth, dbRealTime } from '../../config/firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { FlatList } from 'react-native-gesture-handler';
import ProductCardComponent from './components/ProductCardComponent';
import NewProductComponents from './components/NewProductComponents';
import { onValue, ref } from 'firebase/database';

interface FormUser {
  name: string;
  edad: number;
}

export interface Product {
  id: string;
  code: string;
  nombre: string;
  descripcion: string;
  price: number;
  stock: number;
}

export const HomeScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [formUser, setFormUser] = useState<FormUser>({ name: '', edad: 0 });
  const [userData, setUserData] = useState<firebase.User | null>(null);
  const [showModalProfile, setShowModalProfile] = useState<boolean>(false);
  const [showModalProducts, setShowModalProducts] = useState<boolean>(false);

  useEffect(() => {
    setUserData(auth.currentUser);
    setFormUser({ name: auth.currentUser?.displayName ?? '', edad: 0 });
    getAllProducts();
  }, []);

  const handleSetValues = (key: string, value: string | number) => {
    setFormUser({ ...formUser, [key]: value });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setFormUser({ name: '', edad: 0 });
      })
      .catch((error) => {
        console.error('Error al desloguearse:', error);
      });
  };

  const handleUpdateUser = async () => {
    try {
      await updateProfile(userData!, { displayName: formUser.name });
    } catch (error) {
      console.log(error);
    }
    setShowModalProfile(false);
  };

  const modalClose = () => {
    setShowModalProfile(false);
  };

  const getAllProducts = () => {
    const dbRef = ref(dbRealTime, 'products');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const getKeys = Object.keys(data);
      const listProduct: Product[] = [];

      getKeys.forEach((key) => {
        const value = { ...data[key], id: key };
        listProduct.push(value);
      });

      setProducts(listProduct);
    });
  };

  return (
    <>
      <View style={styles.homeheard}>
        <View style={styles.bienvenida}>
          <Avatar.Icon size={45} icon="folder" />
          <View>
            <Text>Bienvenido</Text>
            <Text>{userData?.displayName}</Text>
            <Text>Edad: {formUser.edad}</Text>
          </View>
          <View>
            <IconButton
              icon="account-heart"
              size={30}
              onPress={() => setShowModalProfile(true)}
              style={styles.iconPefil}
            />
          </View>
        </View>
        <Text>PRODUCTOS</Text>

        <View>
          <FlatList
            data={products}
            renderItem={({ item }) => <ProductCardComponent product={item} />}
            keyExtractor={item => item.id}
          />
        </View>

        <Button mode="contained" onPress={handleLogout} style={styles.logout}>
          Desloguearse
        </Button>
      </View>

      <Portal>
        <Modal visible={showModalProfile} contentContainerStyle={styles.modela2}>
          <IconButton
            icon="close"
            size={24}
            onPress={modalClose}
            style={styles.closeIcon}
          />
          <Text>Mi PERFIL.</Text>
          <Divider />
          <TextInput
            mode='outlined'
            label="Nombre"
            value={formUser.name}
            onChangeText={(value) => handleSetValues('name', value)}
          />
          <TextInput
            mode='outlined'
            label="Edad"
            value={formUser.edad.toString()}
            onChangeText={(value) => handleSetValues('edad', parseInt(value) || 0)}
          />
          <TextInput
            mode='outlined'
            label="Correo"
            value={userData?.email!}
          />
          <Button mode='contained' onPress={handleUpdateUser}>Actualizar</Button>
        </Modal>
      </Portal>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setShowModalProducts(true)}
      />

      <NewProductComponents
        showModalProduct={showModalProducts}
        setShowModalPorducts={setShowModalProducts}
      />
    </>
  );
};

export default HomeScreen;