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
  Storage,
  useNavigation
} from "NexaUI";

export default function Setting({ route }) {
  const params = route.params;
  const navigation = useNavigation();
  const genderData = [
    { key: "L", value: "Laki-laki" },
    { key: "P", value: "Perempuan" },
  ];

  const { values, errors, isValid, handleChange, handleBlur, resetForm } =
    useFormValidation(
      {
        fullName: params?.nama_lengkap || "",
        nik: params?.nik || "",
        phone: params?.no_hp || "",
        email: params?.email || "",
        password: "",
        confirmPassword: "",
        gender: params?.jenis_kelamin || "",
        address: params?.alamat || "",
        birthPlace: params?.tempat_lahir || "",
        birthDate: params?.tanggal_lahir || "",
      },
      {
        fullName: {
          type: "text",
          length: [3, 50],
          required: true,
        },
        nik: {
          type: "text",
          length: [16],
          required: true,
        },
        phone: {
          type: "tel",
          length: [10, 13],
          required: true,
        },
        email: {
          type: "email",
          required: true,
        },
        password: {
          type: "password",
          length: [8, 32],
          required: false,
        },
        gender: {
          type: "text",
          required: true,
        },
        address: {
          type: "text",
          length: [10, 255],
          required: true,
        },
        birthPlace: {
          type: "text",
          length: [3, 50],
          required: true,
        },
        birthDate: {
          type: "date",
          required: true,
        },
      }
    );

  const handleSubmit = async () => {
    if (isValid) {
      try {
        // Format tanggal ke YYYY-MM-DD
        const formatDate = (dateString) => {
          if (!dateString || dateString === "") return null;
          try {
            // Cek jika format sudah YYYY-MM-DD
            if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
              return dateString;
            }
            // Jika format DD-MM-YYYY, konversi ke YYYY-MM-DD
            const [day, month, year] = dateString.split("-");
            if (!day || !month || !year) return null;
            // Pastikan nilai tanggal valid
            const date = new Date(year, month - 1, day);
            if (isNaN(date.getTime())) return null;

            // Format dengan leading zeros
            const formattedDay = day.padStart(2, "0");
            const formattedMonth = month.padStart(2, "0");
            return `${year}-${formattedMonth}-${formattedDay}`;
          } catch (error) {
            console.error("Error formatting date:", error);
            return null;
          }
        };

        // Validasi data sebelum dikirim
        if (!values.address || values.address.trim().length < 10) {
          Alert.alert("Error", "Alamat harus diisi minimal 10 karakter");
          return;
        }

        if (!values.birthPlace || values.birthPlace.trim().length < 3) {
          Alert.alert("Error", "Tempat lahir harus diisi minimal 3 karakter");
          return;
        }

        if (!values.birthDate) {
          Alert.alert("Error", "Tanggal lahir harus diisi");
          return;
        }

        const formattedDate = formatDate(values.birthDate);
        console.log("Formatted birth date:", formattedDate);

        if (!formattedDate) {
          Alert.alert("Error", "Format tanggal lahir tidak valid");
          return;
        }

        const formData = {
          id: params.id,
          fullName: values.fullName.trim(),
          nik: values.nik.trim(),
          phone: values.phone.trim(),
          email: values.email.trim(),
          gender: values.gender,
          address: values.address.trim(),
          birthPlace: values.birthPlace.trim(),
          birthDate: formattedDate,
        };

        // Log data yang akan dikirim
        console.log("Data yang akan dikirim ke server:", formData);

        // Hanya tambahkan password jika diisi
        if (values.password) {
          formData.password = values.password;
        }

        const response = await Network({
          type: "v4",
          path: "klien/setting",
        }).post("/", formData);

 
        if (response.status === "Success" || response.title === "Success") {
          const currentSession = await Storage.getItem("userSession");
          if (currentSession) {
            const updatedSession = {
              ...currentSession,
              nama_lengkap: values.fullName.trim(),
              nik: values.nik.trim(),
              no_hp: values.phone.trim(),
              email: values.email.trim(),
              jenis_kelamin: values.gender,
              alamat: values.address.trim(),
              tempat_lahir: values.birthPlace.trim(),
              tanggal_lahir: formattedDate,
            };
            await Storage.setItem("userSession", updatedSession);
            console.log("Session berhasil diupdate:", updatedSession);
            navigation.replace("User", { userData: formData });
          }

          Alert.alert(response.title, response.message);
        } else {
          Alert.alert(
            response.title || "Error",
            response.message || "Gagal menyimpan data"
          );
        }
      } catch (error) {
        console.error("Error detail:", error);
        Alert.alert("Error", "Gagal mengirim data. Silakan coba lagi.");
      }
    } else {
      console.log("Form errors:", errors);
      Alert.alert("Error", "Mohon lengkapi semua field yang diperlukan");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.formContainer}>
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
            defaultOption={
              params?.jenis_kelamin
                ? {
                    key: params.jenis_kelamin,
                    value:
                      params.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan",
                  }
                : null
            }
            onBlur={() => handleBlur("gender")}
            errors={errors.gender}
            backgroundColor="#f5f5f5"
          />

          <View style={styles.rowContainer}>
            <View style={styles.halfWidth}>
              <Input
                label="Tempat Lahir"
                type="Text"
                Material="map-marker"
                placeholder="Tempat lahir"
                value={values.birthPlace}
                onChangeText={(text) => handleChange("birthPlace", text)}
                onBlur={() => handleBlur("birthPlace")}
                errors={errors.birthPlace}
                backgroundColor="#f5f5f5"
              />
            </View>
            <View style={styles.halfWidth}>
              <Input
                label="Tanggal Lahir"
                type="Date"
                Material="calendar"
                placeholder="DD-MM-YYYY"
                value={values.birthDate}
                onChangeText={(text) => handleChange("birthDate", text)}
                onBlur={() => handleBlur("birthDate")}
                errors={errors.birthDate}
                backgroundColor="#f5f5f5"
                mode="date"
                format="DD-MM-YYYY"
                confirmBtnText="Pilih"
                cancelBtnText="Batal"
                customStyles={{
                  dateInput: {
                    borderWidth: 0,
                    alignItems: "flex-start",
                  },
                }}
              />
            </View>
          </View>

          <Input
            label="Alamat Lengkap"
            type="TextArea"
            Material="home"
            placeholder="Masukkan alamat lengkap"
            value={values.address}
            onChangeText={(text) => handleChange("address", text)}
            onBlur={() => handleBlur("address")}
            errors={errors.address}
            backgroundColor="#f5f5f5"
            multiline={true}
            numberOfLines={3}
          />

          <View style={styles.rowContainer}>
            <View style={styles.halfWidth}>
              <Input
                label="Nomor NIK"
                type="Text"
                Material="barcode"
                placeholder="NIK"
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
            </View>
            <View style={styles.halfWidth}>
              <Input
                label="Nomor Telpon"
                type="tel"
                Material="phone"
                placeholder="No. HP"
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
            </View>
          </View>

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
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Buttons
          label="Simpan Perubahan"
          background="#24bca9"
          txColor="#FFFFFF"
          border={10}
          vertical={8}
          onPress={handleSubmit}
          disabled={!isValid}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80, // Memberikan ruang untuk button
  },
  formContainer: {
    gap: 12,
  },
  rowContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
  },
  halfWidth: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
});
