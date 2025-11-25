import { View, Text } from "react-native";

export default function Locked() {
  return (
    <View style={{ padding: 40 }}>
      <Text style={{ fontSize: 24, color: "red" }}>
        Analysis in progress...
      </Text>
      <Text style={{ marginTop: 20 }}>
        Waiting for Mentor to review your performance.
      </Text>
    </View>
  );
}
