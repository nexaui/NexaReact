import { View, StyleSheet, useState, Input, Buttons } from "NexaUI";
export default function HomeScreen({ navigation }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  return (
    <View style={styles.container}>
      <Input
        label="Username"
        type="Text"
        Material="account"
        placeholder="Enter your username"
        value={formData.username}
        onChangeText={(text) => setFormData({ ...formData, username: text })}
        errors={errors.username}
        backgroundColor="#f5f5f5"
      />

      <Input
        label="Email"
        type="Email"
        Material="email"
        placeholder="Enter your email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        errors={errors.email}
        backgroundColor="#f5f5f5"
      />

      <Input
        label="Password"
        type="Password"
        Material="lock"
        placeholder="Enter your password"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        errors={errors.password}
        backgroundColor="#f5f5f5"
        password
      />

      <Buttons
        label="Button Dasar"
        background="#007AFF"
        txColor="#FFFFFF"
        border={10}
        vertical={8}
        onPress={() => console.log(formData)}
      />

      <Buttons
        label="Componen Validasi"
        background="#007AFF"
        txColor="#FFFFFF"
        border={10}
        vertical={8}
        onPress={() => navigation.navigate("Validasi")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  button: {
    padding: 8,
    marginTop: 16,
  },
});
