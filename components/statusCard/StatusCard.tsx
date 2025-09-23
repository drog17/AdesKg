import React from 'react'
import {Text, StyleSheet, TouchableOpacity } from 'react-native'

interface StatusCardProps {
  count: number | string
  label: string
  onPress: () => void
}

const StatusCard: React.FC<StatusCardProps> = ({ count, label, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    backgroundColor: '#F1F1F1',
    borderRadius: 15,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    gap: 10,
  },
  count: {
    fontFamily: '500',
    fontSize: 24,
    color: '#5EB147',
  },
  label: {
    fontFamily: '400',
    color: '#232323',
    fontSize: 14,
    marginTop: 5,
  },
})

export default StatusCard
