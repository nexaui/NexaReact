// React Native imports
import { Platform } from "react-native";
import Server from "../config";

// Default config menggunakan data dari config.js
const DEFAULT_CONFIG = {
  API_URL: Server.API_URL, // URL dari config.js
};

export class NexaSync {
  #config = {
    key: null,
    secret: null,
    url: DEFAULT_CONFIG.API_URL,
    contentType: "application/json", // Default content type
    path: null, // Untuk path khusus v4
  };

  constructor(config) {
    this.setConfig(config);
  }

  setConfig(config) {
    if (typeof config !== "object") {
      throw new Error("Config harus berupa object");
    }

    // Check API version from type property
    const apiType = config.type || "";

    const requiredFields = ["key"];

    // Atur requirement berdasarkan versi
    if (apiType === "v3") {
      // v3 hanya memerlukan key (token)
      config.key = config.token || config.key;
    } else if (apiType === "v4") {
      // v4 hanya memerlukan key
      config.contentType = "application/json";
    } else if (apiType === "v2") {
      // v2 memerlukan secret
      requiredFields.push("secret");
    }
    // v1 hanya memerlukan key

    for (const field of requiredFields) {
      if (!config[field]) {
        throw new Error(`${field} harus diisi dalam config`);
      }
    }

    // Use URL from config or default
    if (!config.url) {
      config.url = DEFAULT_CONFIG.API_URL;
    }

    this.#config = { ...this.#config, ...config };
  }

  getConfig() {
    return { ...this.#config }; // Return copy of config
  }

  // Method untuk mengubah content type
  setContentType(contentType) {
    const validTypes = [
      "application/json",
      "application/x-www-form-urlencoded",
      "multipart/form-data",
      "text/plain",
    ];

    if (!validTypes.includes(contentType)) {
      throw new Error("Content type tidak valid");
    }

    this.#config.contentType = contentType;
  }

  async get(endpoint, data = null) {
    return this.#request(endpoint, "GET", data);
  }

  async post(endpoint, data) {
    return this.#request(endpoint, "POST", data);
  }

  async put(endpoint, data) {
    return this.#request(endpoint, "PUT", data);
  }

  async delete(endpoint) {
    return this.#request(endpoint, "DELETE");
  }

  async #request(endpoint, method, data = null) {
    if (!this.#config.key) {
      throw new Error("key harus diisi dalam config");
    }

    try {
      // URL persis seperti Postman
      const url = "http://192.168.1.112/v4/klien/mendaftar";

      // Headers persis seperti Postman
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      // Data persis seperti Postman
      const raw = JSON.stringify({
        id: "sa121212121sas",
        title: "ssssaaaaaaaaaaaaaaaaaassqqqqqqqso",
        deskripsi: "framework v4.0.212",
      });

      // Options persis seperti Postman
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      console.log("Request URL:", url);
      console.log("Request Options:", requestOptions);

      const response = await fetch(url, requestOptions);
      const responseData = await response.text();
      console.log("Response Data:", responseData);

      try {
        return JSON.parse(responseData);
      } catch {
        return responseData;
      }
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  }
}

// Factory function for creating NexaSync instance
export const createNexaSync = (config) => {
  return new NexaSync(config);
};

// Network factory function for versioned API instances
export const Network = (config) => {
  if (!config || typeof config !== "object") {
    throw new Error("Config harus berupa object");
  }

  if (!config.type) {
    throw new Error("Tipe API (v1/v2/v3/v4) harus ditentukan");
  }

  // Gunakan URL dari config atau default
  const baseUrl = config.baseUrl || DEFAULT_CONFIG.API_URL;

  switch (config.type) {
    case "v4":
      return createNexaSync({
        key: config.credensial || "default-key",
        path: config.path,
        url: `${baseUrl}/v4`,
        type: "v4",
        contentType: "application/json",
      });

    case "v3":
      // For v3, we use the token directly in the URL
      return createNexaSync({
        key: config.credensial,
        url: baseUrl, // Base URL only
        type: "v3",
        contentType: "application/json",
      });

    case "v2":
      return createNexaSync({
        key: config.credensial,
        secret: config.secret,
        url: `${baseUrl}/v2`,
      });

    case "v1":
      return createNexaSync({
        key: config.credensial,
        url: `${baseUrl}/v1`,
      });

    default:
      throw new Error(
        'Tipe API tidak valid. Gunakan "v1", "v2", "v3", atau "v4"'
      );
  }
};
