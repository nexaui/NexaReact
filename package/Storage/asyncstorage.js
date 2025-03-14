import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage {
  static async setItem(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (error) {
      console.error("Error saving data:", error);
      return false;
    }
  }

  static async getItem(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error("Error reading data:", error);
      return null;
    }
  }

  static async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("Error removing data:", error);
      return false;
    }
  }

  static async clear() {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing storage:", error);
      return false;
    }
  }

  static async getAllKeys() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys;
    } catch (error) {
      console.error("Error getting all keys:", error);
      return [];
    }
  }

  static async multiGet(keys) {
    try {
      const result = await AsyncStorage.multiGet(keys);
      return result.map(([key, value]) => [key, JSON.parse(value)]);
    } catch (error) {
      console.error("Error getting multiple items:", error);
      return [];
    }
  }
}

export default Storage;
