import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';

export default function App() {
  const [bill, setBill] = useState('');
  const [tipPct, setTipPct] = useState(15);
  const [people, setPeople] = useState(1);
  const [result, setResult] = useState<{ total: string, perPerson: string } | null>(null);

  const calculate = () => {
    Keyboard.dismiss();
    const b = parseFloat(bill);
    if (isNaN(b)) return;

    const totalTip = b * (tipPct / 100);
    const totalBill = b + totalTip;
    const perPerson = totalBill / people;

    setResult({
      total: totalBill.toFixed(2),
      perPerson: perPerson.toFixed(2)
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tip Splitter 💸</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Bill Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="$0.00"
          keyboardType="numeric"
          value={bill}
          onChangeText={setBill}
        />

        <Text style={styles.label}>Tip Percentage: {tipPct}%</Text>
        <View style={styles.row}>
          {[10, 15, 18, 20].map(pct => (
            <TouchableOpacity key={pct} style={[styles.pctBtn, tipPct === pct && styles.pctBtnActive]} onPress={() => setTipPct(pct)}>
              <Text style={[styles.pctText, tipPct === pct && styles.pctTextActive]}>{pct}%</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Split: {people} People</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.splitBtn} onPress={() => setPeople(Math.max(1, people - 1))}><Text style={styles.splitBtnText}>-</Text></TouchableOpacity>
          <Text style={styles.peopleText}>{people}</Text>
          <TouchableOpacity style={styles.splitBtn} onPress={() => setPeople(people + 1)}><Text style={styles.splitBtnText}>+</Text></TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.calcBtn} onPress={calculate}>
          <Text style={styles.calcBtnText}>Calculate</Text>
        </TouchableOpacity>
      </View>

      {result && (
        <View style={styles.resultBox}>
          <View style={styles.resRow}>
            <Text style={styles.resLabel}>Total Bill</Text>
            <Text style={styles.resVal}>${result.total}</Text>
          </View>
          <View style={styles.resRow}>
            <Text style={styles.resLabel}>Per Person</Text>
            <Text style={styles.resVal}>${result.perPerson}</Text>
          </View>
        </View>
      )}

      <View style={styles.ad}>
        <Text>[Ad: Finance App]</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4c3', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#827717' },
  card: { backgroundColor: '#fff', width: '100%', padding: 20, borderRadius: 15, elevation: 4 },
  label: { fontSize: 16, color: '#666', marginBottom: 5 },
  input: { fontSize: 24, borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 20, color: '#333' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center' },
  pctBtn: { paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20, backgroundColor: '#eee' },
  pctBtnActive: { backgroundColor: '#cddc39' },
  pctText: { fontWeight: 'bold', color: '#555' },
  pctTextActive: { color: '#333' },
  splitBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center' },
  splitBtnText: { fontSize: 24, fontWeight: 'bold' },
  peopleText: { fontSize: 24, fontWeight: 'bold' },
  calcBtn: { backgroundColor: '#827717', padding: 15, borderRadius: 10, alignItems: 'center' },
  calcBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  resultBox: { marginTop: 30, width: '100%', padding: 20, backgroundColor: '#fff', borderRadius: 15 },
  resRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  resLabel: { fontSize: 18, color: '#666' },
  resVal: { fontSize: 24, fontWeight: 'bold', color: '#827717' },
  ad: { position: 'absolute', bottom: 10, padding: 10, width: '100%', alignItems: 'center', backgroundColor: '#e6ee9c' }
});
