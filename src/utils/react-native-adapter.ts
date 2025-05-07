
// This file ensures that React Native components are imported from react-native-web
// when building for web platforms

// Export the components we need from react-native-web
export {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Switch
} from 'react-native-web';

// Re-export any additional components as needed
