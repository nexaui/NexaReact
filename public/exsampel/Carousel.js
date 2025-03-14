
import { View, Text, StyleSheet,Carousel } from "NexaUI";

const carouselData = [
  {
    image: {
      uri: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&auto=format&fit=crop",
    },
    title: "Pelayanan Emergency 24 Jam",
  },
  {
    image: {
      uri: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&auto=format&fit=crop",
    },
    title: "Dokter Spesialis Terpercaya",
  },
  {
    image: {
      uri: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop",
    },
    title: "Fasilitas Medis Modern",
  },
];

const Profile = ({ route }) => {
  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Carousel
          height={210}
          style={styles.carousel}
          auto={false}
          data={carouselData}
          indicatorColor="#24bca9"
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Selamat Datang</Text>
        {route?.params && (
          <Text style={styles.params}>
            {JSON.stringify(route.params, null, 2)}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  carousel: {
    marginTop:20,
  },
  carouselContainer: {
    borderRadius:30
  },
  contentContainer: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  params: {
    fontSize: 14,
    color: "#666",
  },
});

export default Profile;
