import React from 'react';
import { Image, Text, TouchableOpacity, View, Linking } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import logoImg from '../../assets/logo.png';

import { styles } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

export function Details() {

  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;
  const msg = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).
    format(incident.value)}`;

  function handleNavigateToIncidents() {
    navigation.goBack();
  }

  function handleSendToWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=55${incident.whatsapp}&text=${msg}`);
  }

  function handleSendToEmail() {
    MailComposer.composeAsync({
      subject: `Herói do Caso: ${incident.title}`,
      recipients: [`${incident.email}`],
      body: msg,
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={handleNavigateToIncidents}>
          <Feather name='arrow-left' size={28} color="#e82041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <View style={styles.incidentHeader}>
          <View>
            <Text style={[styles.incidentProperty, { marginTop: 0 }]}>CASO: </Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>
          </View>

          <View>
            <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG: </Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>
          </View>
        </View>

        <Text style={styles.incidentProperty}>DESCRIÇÃO: </Text>
        <Text style={styles.incidentValue}>{incident.description}</Text>

        <Text style={styles.incidentProperty}>Valor: </Text>
        <Text style={styles.incidentValue}>{
          Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).
            format(incident.value)}</Text>

        <View style={styles.incidentLocation}>
          <Feather name='map-pin' size={20} />
          <Text> {incident.city}/{incident.uf}</Text>
        </View>
      </View>
      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
        <Text style={styles.heroDescription}>Entre em contato.</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={handleSendToWhatsApp}>
            <FontAwesome name='whatsapp' size={20} color={'#FFF'} />
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={handleSendToEmail}>
            <FontAwesome name='envelope' size={20} color={'#FFF'} />
            <Text style={styles.actionText}>E-Mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}