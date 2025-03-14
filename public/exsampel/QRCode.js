import { View, Text,StyleSheet,QRCode} from "NexaUI";

const halaman = ({route}) => {
	  const params = route.params;

  return (
    <View>
      
          <QRCode  value="NexaUI" 
            size={200} 
            color="black" 
            backgroundColor="white"
          />
    </View>
  );
};
export default halaman;
