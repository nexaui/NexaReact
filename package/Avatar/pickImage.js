import React, { useState, useEffect, useCallback, useMemo } from "react";
import * as ImagePicker from "expo-image-picker";
import Storage from "../Storage/asyncstorage";
import { Network } from "../Storage/NexaSync";
import { Platform } from "react-native";
import { Alert } from "react-native";
import assetsImage from "../utils/localImage";

const AVATAR_STORAGE_KEY = "@user_avatar";
const TOKEN_KEY = "@user_token";

const useImageID = () => {
  const [imgID, setImgID] = useState("L");

  useEffect(() => {
    const loadUserGender = async () => {
      try {
        const storedUserData = await Storage.getItem("userSession");
        if (storedUserData?.jenis_kelamin) {
          setImgID(storedUserData.jenis_kelamin);
        }
      } catch (error) {
        console.error("Error loading user gender:", error);
      }
    };
    loadUserGender();
  }, []);

  return { imgID, setImgID };
};

const getDefaultImage = (imageId) => assetsImage.get(imageId);

const ImgPicker = {
  useImageID,

  requestPermission: async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === "granted";
  },

  loadSavedImage: async () => {
    try {
      const storedUserData = await Storage.getItem("userSession");
      console.log(storedUserData);
      const savedImage = await Storage.getItem(AVATAR_STORAGE_KEY);
      const defaultImageId = storedUserData?.jenis_kelamin || "L";
      return savedImage || getDefaultImage(defaultImageId);
    } catch (error) {
      console.error("Error loading saved image:", error);
      return getDefaultImage("L");
    }
  },

  pickImage: async () => {
    try {
      const hasPermission = await ImgPicker.requestPermission();

      if (!hasPermission) {
        throw new Error("Gallery permission not granted");
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (result.canceled) {
        const currentImage = await ImgPicker.loadSavedImage();
        return currentImage;
      }

      const imageUri = result.assets[0].uri;
      await Storage.setItem(AVATAR_STORAGE_KEY, imageUri);
      return imageUri;
    } catch (error) {
      console.error("Error in pickImage:", error);
      throw error;
    }
  },

  uploadAvatar: async (imageUri, customToken = null) => {
    try {
      const storedUserData = await Storage.getItem("userSession");
      const userId = storedUserData?.id;

      const api = Network({
        type: "v4",
        path: "oauth/avatar",
      });
      api.setContentType("multipart/form-data");
      const formData = new FormData();

      let extension = imageUri.split(".").pop()?.toLowerCase() || "jpg";
      if (!["jpg", "jpeg", "png"].includes(extension)) {
        extension = "jpg";
      }

      const fileObject = {
        uri: Platform.OS === "ios" ? imageUri.replace("file://", "") : imageUri,
        type: `image/${extension === "jpg" ? "jpeg" : extension}`,
        name: `avatar_${userId}.${extension}`,
      };

      formData.append("id", userId);
      formData.append("avatar", fileObject);

      const response = await api.post("", formData);
      console.log("Upload response:", response);

      // Langsung gunakan response jika bukan string
      let parsedResponse = response;

      // Parse jika response adalah string
      if (typeof response === "string") {
        try {
          parsedResponse = JSON.parse(response);
        } catch (e) {
          console.log("Using raw response");
        }
      }

      // Jika upload berhasil
      if (parsedResponse?.data?.fileUrl) {
        await Storage.setItem(AVATAR_STORAGE_KEY, parsedResponse.data.fileUrl);
        return {
          status: "success",
          data: {
            fileUrl: parsedResponse.data.fileUrl,
            fileName: parsedResponse.data.fileName,
            isLocal: false,
          },
        };
      }

      // Fallback ke local storage
      return {
        status: "success",
        data: {
          fileUrl: imageUri,
          isLocal: true,
        },
      };
    } catch (error) {
      console.log("Upload process:", error.message);
      return {
        status: "success",
        data: {
          fileUrl: imageUri,
          isLocal: true,
        },
      };
    }
  },

  handleImageSelection: async (onSuccess, onError, customToken = null) => {
    try {
      const imageUri = await ImgPicker.pickImage();
      if (imageUri && imageUri !== getDefaultImage("L")) {
        const uploadResponse = await ImgPicker.uploadAvatar(
          imageUri,
          customToken
        );

        const finalImageUrl = uploadResponse.data.fileUrl;
        const isLocal = uploadResponse.data.isLocal;

        // Simpan URL ke storage
        await Storage.setItem(AVATAR_STORAGE_KEY, finalImageUrl);
        // Update UI
        onSuccess(finalImageUrl);
      } else {
        console.log("Using default or existing image");
        onSuccess(imageUri);
      }
    } catch (error) {
      console.error("Image selection process failed:", error);
      if (imageUri && imageUri !== getDefaultImage("L")) {
        await Storage.setItem(AVATAR_STORAGE_KEY, imageUri);
        onSuccess(imageUri);
        // Alert.alert("Info", "Foto profil tersimpan secara lokal", [
        //   { text: "OK" },
        // ]);
      } else {
        onError(error);
        Alert.alert("Error", "Gagal memproses foto profil", [{ text: "OK" }]);
      }
    }
  },

  // Tambah method untuk set token
  setToken: async (token) => {
    try {
      await Storage.setItem(TOKEN_KEY, token);
      console.log("Token saved successfully");
    } catch (error) {
      console.error("Error saving token:", error);
      throw error;
    }
  },

  // Tambah method untuk get token
  getToken: async () => {
    try {
      return await Storage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  },
};

export default ImgPicker;
