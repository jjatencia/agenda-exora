cat > app/index.js <<'EOF'
import React, { useMemo, useState } from "react";
import { SafeAreaView, View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

const BRAND = { primary: "#555BF6", primary2: "#6A67F7", bg: "#f5f7fb", text: "#111827", label: "#475569", border: "#E5E7EB" };

export default function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [remember, setRemember] = useState(false);

  const isEmailValid = useMemo(() => /.+@.+\..+/.test(email.trim()), [email]);
  const isPwdValid = useMemo(() => pwd.trim().length >= 4, [pwd]);
  const canSubmit = isEmailValid && isPwdValid;

  function onSubmit() {
    if (!canSubmit) return;
    // TODO: integrar API real; si remember, persistir tras login
    router.push("/agenda");
  }

  return (
    <SafeAreaView style={styles.screen}>
      {/* Header morado con StatusBar claro */}
      <StatusBar style="light" translucent />
      <LinearGradient
        colors={[BRAND.primary, BRAND.primary2]}
        start={{ x: 0, y: 0.2 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        {/* Marca geométrica, sin binarios */}
        <View style={styles.brandWrap}>
          <View style={styles.quarter} />
          <View style={styles.dot} />
        </View>
        <Text style={styles.title}>Inicia sesión</Text>
      </LinearGradient>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.formScroll} keyboardShouldPersistTaps="handled">
          <View style={styles.formCard}>
            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="tu@correo.com"
                placeholderTextColor="rgba(17,24,39,0.35)"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
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
                returnKeyType="done"
                onSubmitEditing={onSubmit}
                style={[styles.input, !isPwdValid && pwd.length > 0 && styles.inputError]}
              />
              {!isPwdValid && pwd.length > 0 && <Text style={styles.errTxt}>Mínimo 4 caracteres</Text>}
            </View>

            <Pressable
              style={styles.rememberRow}
              onPress={() => setRemember(v => !v)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: remember }}
            >
              <View style={[styles.checkbox, remember && styles.checkboxOn]} />
              <Text style={styles.rememberTxt}>Recordarme</Text>
            </Pressable>

            <Pressable onPress={onSubmit} disabled={!canSubmit} style={[styles.btn, !canSubmit && { opacity: 0.5 }]}>
              <Text style={styles.btnTxt}>Entrar</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BRAND.bg },
  header: { height: "46%", paddingHorizontal: 24, paddingTop: 24, justifyContent: "flex-start" },
  brandWrap: { alignSelf: "center", marginTop: 4, width: 66, height: 66, alignItems: "center", justifyContent: "center" },
  quarter: { width: 62, height: 62, backgroundColor: "#FFFFFF", borderTopLeftRadius: 62, transform: [{ rotate: "180deg" }] },
  dot: { position: "absolute", right: -6, top: -6, width: 14, height: 14, borderRadius: 7, backgroundColor: "#FD778B" },
  title: { marginTop: 14, textAlign: "center", color: "#FFFFFF", fontSize: 30, fontWeight: "800" },

  formScroll: { paddingHorizontal: 20, paddingBottom: 28 },
  formCard: {
    marginTop: -36,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: BRAND.border,
    shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 2,
  },

  field: { marginBottom: 12 },
  label: { color: BRAND.label, fontSize: 16, marginBottom: 8, marginLeft: 8 },
  input: {
    height: 56,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: BRAND.border,
    color: BRAND.text,
    fontSize: 17,
  },
  inputError: { borderColor: "#F87171" },
  errTxt: { color: "#DC2626", fontSize: 13, marginTop: 6, marginLeft: 8 },

  rememberRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 4, paddingHorizontal: 6, paddingVertical: 6 },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 1, borderColor: BRAND.border, backgroundColor: "#FFFFFF" },
  checkboxOn: { backgroundColor: BRAND.primary, borderColor: BRAND.primary },
  rememberTxt: { color: "#334155", fontSize: 16, fontWeight: "600" },

  btn: {
    marginTop: 12,
    height: 54,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BRAND.primary,
  },
  btnTxt: { fontSize: 18, fontWeight: "700", color: "#FFFFFF" },
});
EOF
