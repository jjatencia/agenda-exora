# 1) Para el bundler si está corriendo
#    (en la terminal donde corre Expo) Ctrl + C

cd /Users/juanjoseatenciapato/agenda-exora

# 2) Sobrescribe app/index.js con un componente mínimo de prueba
cat > app/index.js <<'EOF'
import { SafeAreaView, Text } from "react-native";
export default function TestLogin() {
  return (
    <SafeAreaView style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"#ffe6e6"}}>
      <Text style={{fontSize:26,fontWeight:"800",color:"#b91c1c"}}>PRUEBA LOGIN NUEVO</Text>
    </SafeAreaView>
  );
}
EOF

# 3) Arranca el bundler para development build con caché limpia
npx expo start --dev-client --tunnel -c
