import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";

dayjs.locale("pt-br");

export default function App() {
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [dataNascimento, setDataNascimento] = useState(dayjs());

  const [anos, setAnos] = useState(0);
  const [meses, setMeses] = useState(0);
  const [dias, setDias] = useState(0);

  const [proxMeses, setProxMeses] = useState(0);
  const [proxDias, setProxDias] = useState(0);
  const [proxDiaSemana, setProxDiaSemana] = useState("x-feira");

  const [totalMeses, setTotalMeses] = useState(0);
  const [totalSemanas, setTotalSemanas] = useState(0);
  const [totalDias, setTotalDias] = useState(0);
  const [totalHoras, setTotalHoras] = useState(0);
  const [totalMinutos, setTotalMinutos] = useState(0);

  function mudaData(event, date) {
    if (event.type == "set") {
      const valor = dayjs(date);
      setMostrarCalendario(false);
      setDataNascimento(valor);
      calculaResumo(valor);
      return;
    }
    setMostrarCalendario(false);
  }

  function calculaIdade() {
    const ano = dayjs(dataNascimento).year();
    const mes = dayjs(dataNascimento).month() + 1;
    const dia = dayjs(dataNascimento).date();

    const anoAtual = dayjs().year();
    const mesAtual = dayjs().month() + 1;
    const diaAtual = dayjs().date();
  }

  function calculaProxAniversario() {}

  function calculaResumo(valor = dataNascimento) {
    setAnos(dayjs().diff(valor, "year"));
    setTotalMeses(dayjs().diff(valor, "month"));
    setTotalSemanas(dayjs().diff(valor, "week"));

    setTotalDias(dayjs().diff(valor, "day"));
    setTotalHoras(dayjs().diff(valor, "hour"));
    setTotalMinutos(dayjs().diff(valor, "minute"));
  }

  useEffect(() => {
    calculaResumo();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.textoPadrao}>
          Selecione a data do seu nascimento:
        </Text>

        <Text style={styles.textoPadrao}>
          Data: {dayjs(dataNascimento).format("DD/MM/YYYY")}
        </Text>

        <TouchableOpacity
          style={styles.botaoClique}
          onPress={() => {
            setMostrarCalendario(true);
          }}
        >
          <Text style={[styles.textoPadrao, { marginRight: 5 }]}>
            Clique aqui
          </Text>
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
                <Text style={[styles.textoLaranja, { fontSize: 40 }]}>
                  {anos}
                </Text>
                anos
              </Text>
              <Text style={styles.tituloPadrao}>
                {meses} meses | {dias} dias
              </Text>
            </View>
            <View style={styles.aniversario}>
              <Text style={styles.textoLaranja}>Próximo aniversário</Text>
              <FontAwesome name="birthday-cake" size={32} color="orange" />
              <Text style={styles.textoPadrao}>{proxDiaSemana}</Text>
              <Text style={styles.tituloPadrao}>
                {proxMeses} meses | {proxDias} dias
              </Text>
            </View>
          </View>
          <View style={styles.containerResumo}>
            <Text style={styles.textoLaranja}>Resumo</Text>

            <View style={styles.resumo}>
              <View style={styles.itensResumo}>
                <Text style={styles.tituloPadrao}>Anos</Text>
                <Text style={styles.textoPadrao}>{anos}</Text>
              </View>

              <View style={styles.itensResumo}>
                <Text style={styles.tituloPadrao}>Meses</Text>
                <Text style={styles.textoPadrao}>{totalMeses}</Text>
              </View>

              <View style={styles.itensResumo}>
                <Text style={styles.tituloPadrao}>Semanas</Text>
                <Text style={styles.textoPadrao}>{totalSemanas}</Text>
              </View>

              <View style={styles.itensResumo}>
                <Text style={styles.tituloPadrao}>Dias</Text>
                <Text style={styles.textoPadrao}>{totalDias}</Text>
              </View>

              <View style={styles.itensResumo}>
                <Text style={styles.tituloPadrao}>Horas</Text>
                <Text style={styles.textoPadrao}>{totalHoras}</Text>
              </View>

              <View style={styles.itensResumo}>
                <Text style={styles.tituloPadrao}>Minutos</Text>
                <Text style={styles.textoPadrao}>{totalMinutos} </Text>
              </View>
            </View>
          </View>
        </View>

        <StatusBar style="light" backgroundColor="orange" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
