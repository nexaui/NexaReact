import {
  View,
  StyleSheet,
  useNavigation,
  useState,
  Input,
  Buttons,
} from "NexaUI";
const Components = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Buttons
        label="Form"
        background="#000"
        txColor="#FFFFFF"
        border={20}
        vertical={6}
        onPress={() =>
          navigation.navigate("From", {
            type: "From",
            count: 5,
            messages: ["Pesan 1", "Pesan 2", "Pesan 3"],
          })
        }
      />
      <Buttons
        label="Fonts Montserrat"
        background="#000"
        txColor="#FFFFFF"
        border={20}
        vertical={6}
        onPress={() =>
          navigation.navigate("Fonts", {
            type: "Fonts",
            count: 5,
            messages: ["Pesan 1", "Pesan 2", "Pesan 3"],
          })
        }
      />

      <Buttons
        label="Color"
        background="#000"
        txColor="#FFFFFF"
        border={20}
        vertical={6}
        onPress={() =>
          navigation.navigate("Color", {
            type: "Color",
            count: 5,
            messages: ["Pesan 1", "Pesan 2", "Pesan 3"],
          })
        }
      />

      <Buttons
        label="Icon"
        background="#000"
        txColor="#FFFFFF"
        border={20}
        vertical={6}
        onPress={() =>
          navigation.navigate("Icon", {
            type: "Icon",
            count: 5,
            messages: ["Pesan 1", "Pesan 2", "Pesan 3"],
          })
        }
      />

      <Buttons
        label="Buttons"
        background="#000"
        txColor="#FFFFFF"
        border={20}
        vertical={6}
        onPress={() =>
          navigation.navigate("Buttons", {
            type: "Buttons",
            count: 5,
            messages: ["Pesan 1", "Pesan 2", "Pesan 3"],
          })
        }
      />

      <Buttons
        label="Grid System"
        background="#000"
        txColor="#FFFFFF"
        border={20}
        vertical={6}
        onPress={() => navigation.navigate("Grid")}
      />

      <Buttons
        label="Typography"
        background="#000"
        txColor="#FFFFFF"
        border={20}
        vertical={6}
        onPress={() => navigation.navigate("Typography")}
      />

      <Buttons
        label="Html Dom"
        background="#000"
        txColor="#FFFFFF"
        border={20}
        vertical={6}
        onPress={() => navigation.navigate("Html")}
      />

      <Buttons
        label="Avatar"
        background="#000"
        txColor="#FFFFFF"
        border={20}
        vertical={6}
        onPress={() => navigation.navigate("Avatar")}
      />
      <Buttons
        label="Modal"
        background="#000"
        txColor="#FFFFFF"
        border={20}
        vertical={6}
        onPress={() => navigation.navigate("Modal")}
      />
    </View>
  );
};
export default Components;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    gap: 16,
  },
});
