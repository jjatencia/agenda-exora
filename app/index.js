cat > app/index.js <<'EOF'
import React, { useMemo, useState } from "react";
import { SafeAreaView, View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [remember, setRemember] = useState(false);

  const isEmailValid = useMemo(() => /.+@.+\..+/.test(email.trim()), [email]);
  const isPwdValid = useMemo(() => pwd.trim().length >= 4, [pwd]);
  const canSubmit = isEmailValid && isPwdValid;

  function onSubmit() {
    if (!canSubmit) return;
    // TODO: integrar API real; si remember==true, persistir después de autenticar
    router.push("/agenda");
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />
      {/* HEADER MORADO CON GRADIENTE */}
      <LinearGradient
        colors={["#555BF6", "#6A67F7"]}
        start={{ x: 0, y: 0.2 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        {/* Marca minimal sin imágenes */}
        <View style={styles.brandWrap}>
          <View style={styles.quarter} />
          <View style={styles.dot} />
        </View>
        <Text style={styles.title}>Inicia sesión</Text>
      </LinearGradient>

      {/* FORMULARIO */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.formWrap}>
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="tu@correo.com"
            placeholderTextColor="rgba(17,24,39,0.35)"
            keyboardType="email-address"
            autoCapitalize="none"
            style={[styles.input, !isEmailValid && email.length > 0 && styles.inputError]}
          />
          {!isEmailValid && email.length > 0 && <Text style={styles.errTxt}>Introduce un email válido</Text>}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            value={pwd}
            onChangeText={setPwd}
            placeholder="••••••••"
            placeholderTextColor="rgba(17,24,39,0.35)"
            secureTextEntry
            style={[styles.input, !isPwdValid && pwd.length > 0 && styles.inputError]}
          />
          {!isPwdValid && pwd.length > 0 && <Text style={styles.errTxt}>Mínimo 4 caracteres</Text>}
        </View>

        {/* RECORDARME */}
        <Pressable style={styles.rememberRow} onPress={() => setRemember((v) => !v)} accessibilityRole="checkbox" accessibilityState={{ checked: remember }}>
          <View style={[styles.checkbox, remember && styles.checkboxOn]} />
          <Text style={styles.rememberTxt}>Recordarme</Text>
        </Pressable>

        {/* ENTRAR */}
        <Pressable
          onPress={onSubmit}
          disabled={!canSubmit}
          style={[styles.btn, !canSubmit && { opacity: 0.5 }]}
        >
          <Text style={styles.btnTxt}>Entrar</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f5f7fb" },
  header: { height: "44%", paddingHorizontal: 24, paddingTop: 24, justifyContent: "flex-start" },
  brandWrap: { alignSelf: "center", marginTop: 8, width: 64, height: 64, alignItems: "center", justifyContent: "center" },
  quarter: { width: 60, height: 60, backgroundColor: "#FFFFFF", borderTopLeftRadius: 60, transform: [{ rotate: "180deg" }] },
  dot: { position: "absolute", right: -6, top: -6, width: 14, height: 14, borderRadius: 7, backgroundColor: "#FD778B" },
  title: { marginTop: 16, textAlign: "center", color: "#FFFFFF", fontSize: 30, fontWeight: "800" },

  formWrap: { flex: 1, paddingHorizontal: 20, marginTop: -28, gap: 14 },
  field: { marginBottom: 8 },
  label: { color: "#475569", fontSize: 16, marginBottom: 8, marginLeft: 8 },
  input: {
    height: 56,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    color: "#111827",
    fontSize: 17,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  inputError: { borderColor: "#F87171" },
  errTxt: { color: "#DC2626", fontSize: 13, marginTop: 6, marginLeft: 8 },

  rememberRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 6, paddingHorizontal: 6 },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 1, borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" },
  checkboxOn: { backgroundColor: "#555BF6", borderColor: "#555BF6" },
  rememberTxt: { color: "#334155", fontSize: 16, fontWeight: "600" },

  btn: {
    marginTop: 10,
    height: 54,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
  },
  btnTxt: { fontSize: 18, fontWeight: "700", color: "#555BF6" },
});
EOF
