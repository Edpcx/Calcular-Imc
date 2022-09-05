import React, { useState } from 'react'
import { TextInput, View, Text, TouchableOpacity } from 'react-native'
import styles from './style'
import ResultImc from './ResultImc/'

export default function Form() {
  const [altura, setAltura] = useState(null)
  const [peso, setPeso] = useState(null)
  const [messageImc, setMessageImc] = useState('preencha o peso e altura')
  const [imc, setImc] = useState(null)
  const [textButton, setTextButton] = useState('Calcular')

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
      return
    }
    setImc(null)
    setTextButton('Calcular')
    setMessageImc('preecha o peso e altura')
  }

  //calcula o imc
  function imcCalculator() {
    const currentImc = (peso / (altura * altura)).toFixed(2)

    if (currentImc < 19.5) {
      alert('Voce está abaixo do peso')
    }
    if (currentImc >= 19.5 && currentImc < 26.4) {
      alert('Você está com o peso ideal')
    }
    if (currentImc >= 26.4 && currentImc < 31) {
      alert('Você está acima do peso')
    }
    if (currentImc >= 31) {
      alert('Você está obeso')
    }

    return setImc(currentImc)
  }
  return (
    <View style={styles.formContext}>
      <View style={styles.form}>
        <Text style={styles.formLabel}>Altura</Text>
        <TextInput
          style={styles.input}
          onChangeText={setAltura}
          value={altura}
          placeholder="Ex. 1.72"
          keyboardType="numeric"
        />
        <Text style={styles.formLabel}>Peso</Text>
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
      </View>
      <ResultImc messageResultImc={messageImc} resultImc={imc} />
    </View>
  )
}
