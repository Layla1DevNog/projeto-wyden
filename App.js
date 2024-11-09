import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';

export default function App() {
  const [medicamento, setMedicamento] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [horario, setHorario] = useState('');
  const [nomePaciente, setNomePaciente] = useState('');
  const [listaRemedios, setListaRemedios] = useState([]);

  // Função para adicionar um novo remédio à lista
  const adicionarRemedio = () => {
    if (medicamento && quantidade && horario) {
      setListaRemedios([...listaRemedios, { id: Date.now().toString(), medicamento, quantidade, horario, tomado: false }]);
      setMedicamento('');
      setQuantidade('');
      setHorario('');
    } else {
      Alert.alert('Erro', 'Preencha todos os campos para adicionar o remédio.');
    }
  };

  // Função para marcar o remédio como tomado
  const marcarTomado = (id) => {
    const novaLista = listaRemedios.map((item) => 
      item.id === id ? { ...item, tomado: !item.tomado } : item
    );
    setListaRemedios(novaLista);
  };

  // Exibir o formulário para o nome do paciente caso não tenha sido preenchido
  if (!nomePaciente) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Organize seus Remédios</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          value={nomePaciente}
          onChangeText={setNomePaciente}
        />
        <Button title="Salvar nome" onPress={() => { if (nomePaciente) return; Alert.alert('Nome necessário') }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Agenda de Medicação - Pacientes Caps Ad Eusébio</Text>

      <Text style={styles.bemVindo}>Bem-vindo, {nomePaciente}!</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o nome da medicação"
        value={medicamento}
        onChangeText={setMedicamento}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade prescrita"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Horário (ex: 08:00)"
        value={horario}
        onChangeText={setHorario}
      />
      <Button title="Deseja adicionar outra medicação? ADICIONE AQUI" onPress={adicionarRemedio} />

      <FlatList
        data={listaRemedios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.remedioItem}>
            <Text style={styles.remedioTexto}>{item.medicamento}</Text>
            <Text style={styles.remedioTexto}>Quantidade: {item.quantidade}</Text>
            <Text style={styles.remedioTexto}>Horário: {item.horario}</Text>
            <Text style={item.tomado ? styles.tomado : styles.naoTomado}>
              {item.tomado ? 'Tomado' : 'Atenção - A medicação ainda não foi tomada'}
            </Text>
            <Button title="Marcar como tomado" onPress={() => marcarTomado(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#003366', // Azul
  },
  bemVindo: {
    fontSize: 20,
    color: '#003366', // Azul
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  remedioItem: {
    backgroundColor: '#ffeb3b', // Amarelo
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  remedioTexto: {
    fontSize: 16,
    color: '#003366', // Azul
  },
  tomado: {
    fontSize: 16,
    color: 'green',
  },
  naoTomado: {
    fontSize: 16,
    color: 'red',
  },
});

