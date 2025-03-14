import masuk from "./masuk";
import mendaftar from "./mendaftar";
import setting from "./setting";

export const PageOauth = [
  {
    name: "mendaftar",
    component: mendaftar,
    options: {
      title: "Mendaftar",
      headerShown: true,
      headerStyle: {
        backgroundColor: "#24BCA9", // Warna Teal
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontSize: 18,
      },
      headerTitleAlign: "center",
      headerShadowVisible: false,
      statusBar: {
        style: "light",
        backgroundColor: "#24BCA9",
      },
    },
  },
  {
    name: "masuk",
    component: masuk,
    options: {
      title: "Masuk",
      headerShown: false,
      statusBar: {
        style: "light",
        backgroundColor: "#24BCA9",
      },
    },
  },
  {
    name: "setting",
    component: setting,
    options: {
      title: "Setting Akun",
      headerShown: true,
      headerStyle: {
        backgroundColor: "#009688", // Warna Teal
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontSize: 18,
      },
      headerTitleAlign: "center",
      headerShadowVisible: false,
    },
  },
];
