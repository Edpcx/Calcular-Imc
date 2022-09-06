import React, { useState } from 'react'
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Vibration,
  Pressable,
  Keyboard,
  FlatList
} from 'react-native'
import styles from './style'
import ResultImc from './ResultImc/'

export default function Form() {
  const [altura, setAltura] = useState(null)
  const [peso, setPeso] = useState(null)
  const [messageImc, setMessageImc] = useState(null)
  const [imc, setImc] = useState(null)
  const [textButton, setTextButton] = useState('Calcular')
  const [errorMessage, setErrorMessage] = useState(null)
  const [imcList, setImcList] = useState([])

  //verifica se o valor de altura  e peso não estão vazios
  //so vai se chamanda quando o peso e alatura forem diferentes e nulos, chama  a função e seta os valores de imc
  //depois que calcular se ta os valores de peso e altura como nulo
  function validationImc() {
    if (peso != null && altura != null) {
      imcCalculator()
      setPeso(null)
      setAltura(null)
      setMessageImc('Seu imc é igual:')
      setTextButton('Calcular novamente')
      setErrorMessage(null)
    } else {
      varificationImc()
      setImc(null)
      setTextButton('Calcular')
      setMessageImc('preecha o peso e altura')
    }
  }

  function varificationImc() {
    if (imc == null) {
      Vibration.vibrate()
      setErrorMessage('Campo obrigatorio*')
    }
  }

  //calcula o imc
  function imcCalculator() {
    let alturaFormat = altura.replace(',', '.')
    //pega o resultado calculado e seta dentro da lista de imc
    // criando um id unica para cada imc inserido, pegando a data aem ms, isso tudo setado dentro do setImcList
    const totalImc = (peso / (alturaFormat * alturaFormat)).toFixed(2)
    setImcList(array => [...array, { id: new Date().getTime(), imc: totalImc }])
    console.log(imcList)

    if (totalImc < 19.5) {
      alert('Voce está abaixo do peso')
    }
    if (totalImc >= 19.5 && totalImc < 26.4) {
      alert('Você está com o peso ideal')
    }
    if (totalImc >= 26.4 && totalImc < 31) {
      alert('Você está acima do peso')
    }
    if (totalImc >= 31) {
      alert('Você está obeso')
    }

    return setImc(totalImc)
  }

  //limpa toda lista salva na tela
  function limparListImc() {
    setImcList('')
  }
  return (
    <View style={styles.formContext}>
      {/* se for igual a nulo imprime todo formulario se não imprime o resultado e calcular novamente */}
      {imc == null ? (
        <Pressable onPress={Keyboard.dismiss} style={styles.form}>
          <Text style={styles.formLabel}>Altura</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setAltura}
            value={altura}
            placeholder="Ex. 1.72"
            keyboardType="numeric"
          />
          <Text style={styles.formLabel}>Peso</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPeso}
            value={peso}
            placeholder="Ex. 80.52"
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.buttonCalculator}
            onPress={() => validationImc()}
          >
            <Text style={styles.textbuttonCalculator}>{textButton}</Text>
          </TouchableOpacity>
        </Pressable>
      ) : (
        <View style={styles.exibitonResultImc}>
          <ResultImc messageResultImc={messageImc} resultImc={imc} />

          <TouchableOpacity
            style={styles.buttonCalculator}
            onPress={() => validationImc()}
          >
            <Text style={styles.textbuttonCalculator}>{textButton}</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.listImc}
        data={imcList.reverse?.()}
        renderItem={({ item }) => {
          return (
            <Text style={styles.resultImcItem}>
              <Text style={styles.textResultItemList}>
                Resultado IMC= {item.imc}
              </Text>
            </Text>
          )
        }}
        keyExtractor={item => {
          item.id
        }}
      ></FlatList>
      <TouchableOpacity
        style={styles.limparListImc}
        onPress={() => limparListImc()}
      >
        <Text style={styles.textbuttonLimparListImc}>Apagar</Text>
      </TouchableOpacity>
    </View>
  )
}
