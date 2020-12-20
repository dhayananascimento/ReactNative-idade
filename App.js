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

  const [proxAniversarioDias, setProxAniversarioDias] = useState(0);
  const [proxAniversarioDiaSemana, setProxAniversarioDiaSemana] = useState(
    "x-feira"
  );

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
      calculaProxAniversario(valor);
      calculaResumo(valor);
      return;
    }
    setMostrarCalendario(false);
  }

  function calculaProxAniversario(valor = dataNascimento) {
    const mesAniversario = dayjs(valor).month() + 1;
    const diaAniversario = dayjs(valor).date();
    const anoAtual = dayjs().year();
    const mesAtual = dayjs().month() + 1;
    const diaAtual = dayjs().date();

    let proximo = 0;

    if (mesAniversario > mesAtual) 
      proximo = dayjs().diff(`${anoAtual}/${mesAniversario}/${diaAniversario}`, "days");
    
      else if (mesAniversario < mesAtual) 
      proximo = dayjs(`${anoAtual + 1}/${mesAniversario}/${diaAniversario}`).diff(dayjs(), "days");
    
      else {
        if (diaAniversario < diaAtual) 
        proximo = dayjs(`${anoAtual + 1}/${mesAniversario}/${diaAniversario}`).diff(dayjs(), "days");
        
        else 
        proximo = dayjs(`${anoAtual}/${mesAniversario}/${diaAniversario}`).diff(dayjs(), "days"
        );
    }
    
    let dataProxAniversario = dayjs().add((proximo +1), 'day').day();
    let proximoDiaSemana = "";

    switch(dataProxAniversario){
      case 0:
        proximoDiaSemana = "Domingo"
        break;
      case 1:
        proximoDiaSemana = "segunda-feira"
        break;
      case 2:
        proximoDiaSemana = "terça-feira"
        break;
      case 3:
        proximoDiaSemana = "quarta-feira"
        break;
      case 4:
        proximoDiaSemana = "quinta-feira"
        break;
      case 5:
        proximoDiaSemana = "sexta-feira"
        break;
      case 6:
        proximoDiaSemana = "sábado"
        break;
      default:
        proximoDiaSemana 
    }

    setProxAniversarioDias(proximo);
    setProxAniversarioDiaSemana(proximoDiaSemana);
  }

  function calculaResumo(valor = dataNascimento) {
    setAnos(dayjs().diff(valor, "year"));
    setTotalMeses(dayjs().diff(valor, "month"));
    setTotalSemanas(dayjs().diff(valor, "week"));

    setTotalDias(dayjs().diff(valor, "day"));
    setTotalHoras(dayjs().diff(valor, "hour"));
    setTotalMinutos(dayjs().diff(valor, "minute"));
  }

  useEffect(() => {
    calculaProxAniversario();
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
            textColor="orange"
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
            </View>
            <View style={styles.aniversario}>
              <Text style={styles.textoLaranja}>Próximo aniversário</Text>
              <FontAwesome name="birthday-cake" size={32} color="orange" />
              <Text style={styles.textoPadrao}>{proxAniversarioDiaSemana}</Text>
              <Text style={styles.tituloPadrao}>
                {proxAniversarioDias} dias
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
    justifyContent: "center",

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
