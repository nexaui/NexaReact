import {
  View,
  StyleSheet,
  useState,
  Input,
  Buttons,
  useFormValidation,
  Alert,
  SelectList,
  Network,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "NexaUI";

export default function mendaftar({ navigation }) {
  const genderData = [
    { key: "L", value: "Laki-laki" },
    { key: "P", value: "Perempuan" },
  ];

  const { values, errors, isValid, handleChange, handleBlur, resetForm } =
    useFormValidation(
      {
        fullName: "",
        nik: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
      },
      {
        fullName: {
          type: "text",
          length: [3, 50],
          placeholder: "Nama lengkap sesuai KTP",
        },
        nik: {
          type: "text",
          length: [16],
          placeholder: "Nomor NIK Sesuai KTP",
        },
        phone: {
          type: "tel",
          length: [10, 13],
          placeholder: "Contoh: 081234567890",
        },
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
        confirmPassword: {
          type: "password",
          length: [8, 32],
          placeholder: "Konfirmasi password anda",
          match: "password",
        },
        gender: {
          type: "text",
          length: [1, 1],
          placeholder: "Pilih Jenis Kelamin",
        },
      }
    );

  const handleSubmit = async () => {
    if (isValid) {
      try {
        const response = await Network({
          type: "v4",
          path: "klien/mendaftar",
        }).post("/", {
          fullName: values.fullName,
          nik: values.nik,
          phone: values.phone,
          email: values.email,
          password: values.password,
          gender: values.gender,
        });
        if (response.status === "Success" || response.title === "Success") {
          resetForm();
          Alert.alert(response.title, response.message);
        } else {
          Alert.alert(response.title || "Konfirmasi", response.message);
        }
        console.log("API Response:", response);
      } catch (error) {
        console.error("API Error:", error);
        Alert.alert("Error", "Gagal mengirim data. Silakan coba lagi.");
      }
    } else {
      console.log("Form errors:", errors);
      Alert.alert("Error", "Mohon lengkapi semua field yang diperlukan");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Input
          label="Nama Lengkap"
          type="Text"
          Material="account"
          placeholder="Nama lengkap sesuai KTP"
          value={values.fullName}
          onChangeText={(text) => handleChange("fullName", text)}
          onBlur={() => handleBlur("fullName")}
          errors={errors.fullName}
          backgroundColor="#f5f5f5"
        />

        <SelectList
          setSelected={(val) => handleChange("gender", val)}
          data={genderData}
          placeholder="Pilih Jenis Kelamin"
          label="Jenis Kelamin"
          searchPlaceholder="Cari..."
          save="key"
          onBlur={() => handleBlur("gender")}
          errors={errors.gender}
          backgroundColor="#f5f5f5"
        />

        <Input
          label="Nomor NIK"
          type="Text"
          Material="barcode"
          placeholder="Nomor NIK Sesuai KTP"
          value={values.nik}
          onChangeText={(text) => {
            const cleanText = text.replace(/[^\d]/g, "");
            handleChange("nik", cleanText);
          }}
          onBlur={() => handleBlur("nik")}
          errors={errors.nik}
          backgroundColor="#f5f5f5"
          keyboardType="numeric"
        />

        <Input
          label="Nomor Telpon"
          type="tel"
          Material="phone"
          placeholder="Contoh: 081234567890"
          value={values.phone}
          onChangeText={(text) => {
            const cleanText = text.replace(/[^\d+]/g, "");
            handleChange("phone", cleanText);
          }}
          onBlur={() => handleBlur("phone")}
          errors={errors.phone}
          backgroundColor="#f5f5f5"
          keyboardType="phone-pad"
        />

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

        <Input
          label="Konfirmasi Password"
          type="Password"
          Material="lock"
          placeholder="Konfirmasi password anda"
          value={values.confirmPassword}
          onChangeText={(text) => handleChange("confirmPassword", text)}
          onBlur={() => handleBlur("confirmPassword")}
          errors={errors.confirmPassword}
          backgroundColor="#f5f5f5"
          password
        />
        <Buttons
          label="Mendaftar"
          background="#24bca9"
          txColor="#FFFFFF"
          border={10}
          vertical={8}
          onPress={handleSubmit}
          disabled={!isValid}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
    flexGrow: 1,
  },
  button: {
    padding: 8,
    marginTop: 16,
  },
});
