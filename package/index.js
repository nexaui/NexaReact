// Basic React and React Native exports
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  Platform,
  ActivityIndicator,
  Modal,
  Alert,
  SafeAreaView,
  StatusBar,
  Animated,
  KeyboardAvoidingView,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
// Component imports
import Input from "./Form/input";
import Switch from "./Form/Switch";
import { FontFamily, useMontserratFonts } from "./Fonts/Montserrat";
import Colors from "./utils/Color";
import Icon from "./Icon";
import Buttons from "./Buttons/Buttons";
import Grid from "./utils/Grid";
import { fs } from "./utils/typography";
import Avatar from "./Avatar/user";
import useModal from "./Modal";
import Images from "./Avatar/Images";
import Storage from "./Storage/asyncstorage";
import { NexaSync, createNexaSync, Network } from "./Storage/NexaSync";
import Server from "./config";
import QRCodeGenerator from "./utils/QRCode";
import SelectList from "./Form/SelectList";
import assetsImage from "./utils/localImage";
import Header from "./header/header";
import ExpoSpeech from "./utils/speech";
import ImgPicker from "./Avatar/pickImage";
import Carousel from "./Salid/carousel";

// HTML-like components import
import {
  Div,
  P,
  Span,
  Button as HtmlButton,
  H1,
  H2,
  H3,
  Section,
  Article,
  createHTMLElement,
  getNativeComponent,
} from "./utils/htmlToNative";

// Form validation imports
import {
  validateInput,
  useFormValidation,
  pickImage,
  pickCamera,
  pickVideo,
  recordVideo,
  pickMultipleImages,
  pickDocument,
  pickMultipleDocuments,
  validateVideo,
  convertToBase64,
  parseFileSize,
  formatFileSize,
} from "./Form/Validasi";

// Export all components and utilities
export {
  // React basics
  React,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useNavigation,
  FeatherIcon,
  FontAwesome,
  // React Native basics
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  Platform,
  ActivityIndicator,
  Modal,
  Alert,
  SafeAreaView,
  StatusBar,
  Animated,
  KeyboardAvoidingView,

  // Components
  Input,
  Switch,
  Header,
  SelectList,
  QRCodeGenerator,
  Storage,
  NexaSync,
  createNexaSync,
  Network,
  Server,
  FontFamily,
  useMontserratFonts,
  Colors,
  Icon,
  Buttons,
  Grid,
  fs,
  Images,
  Avatar,
  useModal,
  assetsImage,
  ExpoSpeech,
  ImgPicker,
  Carousel,

  // HTML-like components
  Div,
  P,
  Span,
  HtmlButton,
  H1,
  H2,
  H3,
  Section,
  Article,
  createHTMLElement,
  getNativeComponent,

  // Form validation exports
  validateInput,
  useFormValidation,
  pickImage,
  pickCamera,
  pickVideo,
  recordVideo,
  pickMultipleImages,
  pickDocument,
  pickMultipleDocuments,
  validateVideo,
  convertToBase64,
  parseFileSize,
  formatFileSize,
};
