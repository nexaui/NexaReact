import {
  View,
  StyleSheet,
  useState,
  Input,
  Text,
  Buttons,
  assetsImage,
  Image,
  useFormValidation,
  Alert,
  Network,
  Storage,
  TouchableOpacity,
  ExpoSpeech
} from "NexaUI";

export default function HomeScreen({ navigation }) {
  const { values, errors, isValid, handleChange, handleBlur, resetForm } =
    useFormValidation(
      {
        email: "",
        password: "",
      },
      {
        email: {
          type: "email",
          length: [5, 100],
          placeholder: "Masukkan email anda",
        },
        password: {
          type: "password",
          length: [8, 32],
          placeholder: "Masukkan password anda",
        },
      }
    );

  const handleSubmit = async () => {
    console.log(values);
    if (isValid) {
      try {
        const response = await Network({
          type: "v4",
          path: "klien/masuk",
        }).post("/", {
          email: values.email,
          password: values.password,
        });

        if (response.status === "Success" || response.title === "Success") {
          // Save user session data to AsyncStorage
          await Storage.setItem("userSession", response.data);
          await Storage.setItem("isLoggedIn", true);

          resetForm();
        
          // Navigate to User screen with response data
          navigation.replace("User", { userData: response.data });
        } else {

          Alert.alert(response.title || "Konfirmasi", response.message);
        }
       
      } catch (error) {
        console.error("API Error:", error);
        Alert.alert("Error", "Gagal masuk. Silakan coba lagi.");
      }
    } else {
      console.log("Form errors:", errors);
      Alert.alert("Error", "Mohon lengkapi semua field yang diperlukan");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={assetsImage.get("rsbp")} style={styles.logo} />
      <Input
        label="Email"
        type="Email"
        Material="email"
        placeholder="Masukkan email anda"
        value={values.email}
        onChangeText={(text) => handleChange("email", text)}
        onBlur={() => handleBlur("email")}
        errors={errors.email}
        backgroundColor="#f5f5f5"
        keyboardType="email-address"
      />

      <Input
        label="Password"
        type="Password"
        Material="lock"
        placeholder="Masukkan password anda"
        value={values.password}
        onChangeText={(text) => handleChange("password", text)}
        onBlur={() => handleBlur("password")}
        errors={errors.password}
        backgroundColor="#f5f5f5"
        password
      />

      <Buttons
        label="Masuk"
        background="#24bca9"
        txColor="#FFFFFF"
        border={10}
        vertical={8}
        onPress={handleSubmit}
        disabled={!isValid}
      />

      
        <TouchableOpacity
        onPress={() => navigation.navigate("mendaftar")}>
        <Text style={styles.formFooter}>
         Belum punya akun?{' '}
          <Text style={{ textDecorationLine: 'underline' }}>Mendaftar</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
    padding: 16,
    gap: 16,
  },
  logo: {
    width: 132,
    height: 132,
    alignSelf: "center",
    borderRadius: 1,
    marginBottom: 20,
  },
  button: {
    padding: 8,
    marginTop: 16,
  },
    formFooter: {
    paddingVertical: 24,
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
});
