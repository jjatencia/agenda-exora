cd /Users/juanjoseatenciapato/agenda-exora
cat > app/__login.js <<'EOF'
import React from "react";
import { SafeAreaView, Image, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function ForcedLogin() {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />
      <Image source={require("../assets/images/logo-mark.png")} style={styles.logo} />
      <Text style={styles.title}>Inicia sesión</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#555BF6", alignItems: "center", justifyContent: "center" },
  logo: { width: 128, height: 128, resizeMode: "contain", marginBottom: 16 },
  title: { color: "#FFFFFF", fontSize: 24, lineHeight: 24, textAlign: "center", fontWeight: "700" },
});
EOF
