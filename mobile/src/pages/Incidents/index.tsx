import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import * as R from 'ramda'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import logoImg from '../../assets/logo.png'
import { IIncidentQueryData } from '../../interfaces'
import { getIncidents } from '../../services/api'
import styles from './styles'

export default function Incidents() {
  const [incidents, setIncidents] = useState<IIncidentQueryData[]>([])
  const [totalIncidents, setTotalIncidents] = useState<number>(0)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()

  function navigationToDetail(incident: IIncidentQueryData) {
    navigation.navigate('Detail', { incident })
  }

  async function loadIncidents() {
    if (loading) {
      return
    }
    setLoading(true)
    if (totalIncidents > 0 && incidents.length === totalIncidents) {
      return
    }

    const { count, result } = await getIncidents(page)
    setPage(page + 1)
    setTotalIncidents(count)

    setIncidents(R.unionWith(R.eqBy(R.prop('id')), incidents, result))

    setLoading(false)
  }

  useEffect(() => {
    // tslint:disable-next-line: no-floating-promises
    loadIncidents()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de{' '}
          <Text style={styles.headerTextBold}>{totalIncidents} casos</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia.
      </Text>

      {/* CASOS */}
      <FlatList
        style={styles.incidentsList}
        data={incidents}
        keyExtractor={(incident: IIncidentQueryData) => `${incident.id}`}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }: { item: IIncidentQueryData }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG</Text>
            <Text style={styles.incidentValue}>{incident.ong.name}</Text>

            <Text style={styles.incidentProperty}>CASO</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigationToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name='arrow-right' size={16} color='#e02041' />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}
