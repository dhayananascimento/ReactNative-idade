import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";

dayjs.locale("pt-br");

export default function App() {
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [data, setData] = useState(dayjs().format("DD/MM/YYYY"));
  console.log("rodou. data: ", data, "mostrar calendario: ", mostrarCalendario)

  function mudaData(event, date) {
    setMostrarCalendario(false);
    if (event.type == "set") {
        const valor = dayjs(date).format("DD/MM/YYYY");
        setData(valor)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textoPadrao}>
        Selecione a data do seu nascimento:
      </Text>

      <Text style={styles.textoPadrao}>Data: {data}</Text>

      <TouchableOpacity
        style={styles.botaoClique}
        onPress={() => {
          setMostrarCalendario(true);
        }}
      >
        <Text style={[styles.textoPadrao, { marginRight: 5}]}>Clique aqui</Text>
        <FontAwesome name="hand-pointer-o" size={22} color="orange" />
      </TouchableOpacity>

      {mostrarCalendario && (
        <DateTimePicker
          mode="countdown"
          display="default"
          onChange={mudaData}
          value={new Date()}
          maximumDate={new Date()}
          minimumDate={new Date(1900, 1, 1)}
        />
      )}

      <View style={styles.containerIdade}>
        <View style={styles.containerIdadeAniversario}>
          <View style={styles.idade}>
            <Text style={[styles.textoPadrao, { fontSize: 30 }]}>Idade</Text>
            <Text style={styles.textoPadrao}>
              <Text style={[styles.textoLaranja, { fontSize: 40 }]}>20</Text>
              anos
            </Text>
            <Text style={styles.tituloPadrao}>4 meses | 0 dias</Text>
          </View>
          <View style={styles.aniversario}>
            <Text style={styles.textoLaranja}>Próximo aniversário</Text>
            <FontAwesome name="birthday-cake" size={32} color="orange" />
            <Text style={styles.textoPadrao}>segunda-feira</Text>
            <Text style={styles.tituloPadrao}>8 meses | 0 dias</Text>
          </View>
        </View>
        <View style={styles.containerResumo}>
          <Text style={styles.textoLaranja}>Resumo</Text>

          <View style={styles.resumo}>
            <View style={styles.itensResumo}>
              <Text style={styles.tituloPadrao}>Anos</Text>
              <Text style={styles.textoPadrao}>000</Text>
            </View>

            <View style={styles.itensResumo}>
              <Text style={styles.tituloPadrao}>Meses</Text>
              <Text style={styles.textoPadrao}>000</Text>
            </View>

            <View style={styles.itensResumo}>
              <Text style={styles.tituloPadrao}>Semanas</Text>
              <Text style={styles.textoPadrao}>000</Text>
            </View>

            <View style={styles.itensResumo}>
              <Text style={styles.tituloPadrao}>Dias</Text>
              <Text style={styles.textoPadrao}>000</Text>
            </View>

            <View style={styles.itensResumo}>
              <Text style={styles.tituloPadrao}>Horas</Text>
              <Text style={styles.textoPadrao}>000</Text>
            </View>

            <View style={styles.itensResumo}>
              <Text style={styles.tituloPadrao}>Minutos</Text>
              <Text style={styles.textoPadrao}>000</Text>
            </View>
          </View>
        </View>
      </View>

      <StatusBar style="light" backgroundColor="orange" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  botaoClique: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    borderColor: "orange",
    borderRadius: 10,
    borderWidth: 2,

    padding: 10,
    margin: 10,
  },

  containerIdade: {
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#ccc",

    marginTop: 20,
    width: "100%",
    maxWidth: 400,
    height: "auto",
  },

  containerIdadeAniversario: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  idade: {
    width: "50%",
    minHeight: 150,
    padding: 10,

    alignItems: "center",
    justifyContent: "space-around",

    borderRightWidth: 1,
    borderRightColor: "#ccc",
  },

  aniversario: {
    width: "50%",
    minHeight: 150,
    padding: 10,

    alignItems: "center",
    justifyContent: "space-around",
  },

  containerResumo: {
    padding: 10,
    margin: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",

    alignItems: "center",
  },

  resumo: {
    marginVertical: 10,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  itensResumo: {
    width: "30%",
    padding: 5,
    minWidth: 90,

    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  textoLaranja: {
    color: "orange",
    fontSize: 16,
  },

  tituloPadrao: {
    color: "#ccc",
    fontSize: 14,
  },

  textoPadrao: {
    color: "#666",
    fontSize: 18,
  },
});
