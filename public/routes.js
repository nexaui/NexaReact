// Import screens
import HomeScreen from "./Home";
import UID from "./Uid";
import halaman from "./halaman";
import { MenuComponents } from "./exsampel/menu";
import { PageOauth } from "./oauth/page";
import { PagePoliklinik } from "./poliklinik/page";
import { PageAsuransi } from "./asuransi/page";

/**
 * Konfigurasi Routes dan Navigation
 * --------------------------------
 *
 * Setiap route memiliki struktur berikut:
 * {
 *   name: string,           // Nama unik untuk route
 *   component: Component,   // Komponen React yang akan di-render
 *   options: {             // Opsi konfigurasi untuk route
 *     title: string,       // Judul yang ditampilkan di header
 *     headerShown: boolean,// Menampilkan/menyembunyikan header
 *     statusBar: {         // Konfigurasi StatusBar
 *       style: "light" | "dark",    // Warna teks StatusBar
 *       backgroundColor: string,     // Warna latar StatusBar
 *     }
 *   }
 * }
 *
 * Panduan Penggunaan StatusBar:
 * 1. Background Terang (mis: putih, abu-abu muda)
 *    - Gunakan style: "dark" untuk teks hitam
 *    Contoh:
 *    statusBar: {
 *      style: "dark",
 *      backgroundColor: "#FFFFFF"
 *    }
 *
 * 2. Background Gelap/Berwarna
 *    - Gunakan style: "light" untuk teks putih
 *    Contoh:
 *    statusBar: {
 *      style: "light",
 *      backgroundColor: "#24bca9"
 *    }
 *
 * Catatan Penting:
 * - headerShown: false akan menyembunyikan header navigasi
 * - Setiap route harus memiliki name yang unik
 * - Konfigurasi StatusBar akan berubah otomatis saat navigasi
 */

// Define routes configuration
export const routes = [
  {
    name: "Home",
    component: HomeScreen,
    options: {
      title: "NexaUI",
      headerShown: false,
      statusBar: {
        style: "dark",
        backgroundColor: "#FFFFFF",
      },
    },
  },
  {
    name: "User",
    component: UID,
    options: {
      title: "User",
      headerShown: false,
      statusBar: {
        style: "light",
        backgroundColor: "#24bca9",
      },
    },
  },
  {
    name: "page",
    component: halaman,
    options: {
      title: "Exsampel",
      headerShown: false,
      statusBar: {
        style: "light",
        backgroundColor: "#4CAF50",
      },
    },
  },
  ...PageOauth,
];

/**
 * Helper function untuk mendapatkan semua routes
 * @returns {Array} Array berisi semua konfigurasi route
 */
export const getRoutes = () => routes;

/**
 * Default Style untuk Header dan StatusBar
 * Digunakan sebagai fallback ketika route tidak memiliki konfigurasi khusus
 *
 * Properti yang tersedia:
 * - headerStyle: Gaya untuk container header
 * - headerTintColor: Warna untuk teks dan icon di header
 * - headerTitleStyle: Gaya untuk teks judul header
 * - headerShown: Menampilkan/menyembunyikan header
 */
const defaultHeaderStyle = {
  headerStyle: {
    backgroundColor: "#FFFFFF",
  },
  headerTintColor: "#000000",
  headerTitleStyle: {
    fontSize: 18,
    fontWeight: "600",
  },
  headerShown: true,
};

/**
 * Mengekspor default header style
 * @returns {Object} Object berisi konfigurasi default untuk header
 */
export const getDefaultHeaderStyle = () => defaultHeaderStyle;
