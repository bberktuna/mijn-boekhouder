import { AntDesign, MaterialIcons } from "@expo/vector-icons"
import React, { useState } from "react"
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { Appbar, Divider, FAB, IconButton, Searchbar } from "react-native-paper"
import colors from "../../../constants/colors"

// Sample transaction data
const transactions = [
  {
    id: "141",
    description: "Fotoshoot",
    amount: "€317,15",
    date: "23-04-2025",
  },
  { id: "140", description: "Lunch", amount: "€24,50", date: "22-04-2025" },
  {
    id: "138",
    description: "Verpakking",
    amount: "€30,21",
    date: "20-04-2025",
  },
  { id: "137", description: "Macbook", amount: "€1400,95", date: "18-04-2025" },
  {
    id: "136",
    description: "Verzending",
    amount: "€30,21",
    date: "15-04-2025",
  },
  { id: "133", description: "Parkeren", amount: "€6,50", date: "12-04-2025" },
  {
    id: "132",
    description: "Kantoorartikelen",
    amount: "€10,50",
    date: "10-04-2025",
  },
  { id: "129", description: "Software", amount: "€19,95", date: "08-04-2025" },
]

const invoices = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("expenses") // 'income' or 'expenses'
  const [selectedYear, setSelectedYear] = useState("2025")

  const onChangeSearch = (query: any) => setSearchQuery(query)

  const renderTransactionItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <Text style={styles.transactionId}>{item.id}</Text>
      </View>
      <View style={styles.transactionMiddle}>
        <Text style={styles.transactionDesc}>{item.description}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <View style={styles.transactionRight}>
        <Text style={styles.transactionAmount}>{item.amount}</Text>
        <IconButton
          icon="dots-vertical"
          size={16}
          iconColor={colors.darkGray}
          onPress={() => {}}
        />
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.lightGreen} barStyle="dark-content" />

      {/* Header */}
      <Appbar.Header style={styles.header}>
        <Text style={styles.logo}>Kasboek</Text>
        <View style={styles.headerRight}>
          <IconButton
            icon="menu"
            size={28}
            iconColor={colors.darkGreen}
            onPress={() => {}}
          />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>2</Text>
          </View>
        </View>
      </Appbar.Header>

      <ScrollView style={styles.content}>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "income" && styles.activeTab]}
            onPress={() => setActiveTab("income")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "income" && styles.activeTabText,
              ]}
            >
              Inkomsten
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "expenses" && styles.activeTab]}
            onPress={() => setActiveTab("expenses")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "expenses" && styles.activeTabText,
              ]}
            >
              Uitgaven
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search and filter */}
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <AntDesign
              name="search1"
              size={20}
              color={colors.darkGray}
              style={styles.searchIcon}
            />
            <Searchbar
              placeholder="Uitgaven zoeken"
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={styles.searchbar}
              inputStyle={styles.searchInput}
              iconColor="transparent"
            />
          </View>

          <TouchableOpacity style={styles.yearSelector}>
            <Text style={styles.yearText}>{selectedYear}</Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={24}
              color={colors.darkGreen}
            />
          </TouchableOpacity>
        </View>

        {/* Column Headers */}
        <View style={styles.columnHeader}>
          <Text style={[styles.columnHeaderText, styles.idColumn]}>#Bon</Text>
          <Text style={[styles.columnHeaderText, styles.descColumn]}>
            Omschrijving
          </Text>
          <Text style={[styles.columnHeaderText, styles.amountColumn]}>
            Excl. BTW
          </Text>
          <Text style={[styles.columnHeaderText, styles.actionsColumn]}>
            Acties
          </Text>
        </View>

        {/* Transactions List */}
        <FlatList
          data={transactions}
          renderItem={renderTransactionItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        />
      </ScrollView>

      {/* FAB Button */}
      <FAB
        style={styles.fab}
        icon="plus"
        color={colors.white}
        onPress={() => {}}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGreen,
  },
  header: {
    backgroundColor: colors.lightGreen,
    elevation: 0,
    justifyContent: "space-between",
    height: 32,
    paddingVertical: 0, // Ekstra padding'i kaldırdık
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.darkGreen,
    marginLeft: 16,
  },
  notificationBadge: {
    position: "absolute",
    right: 8,
    top: 8,
    backgroundColor: colors.midGreen,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    color: colors.darkGreen,
    fontSize: 12,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 10,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.darkGreen,
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: colors.darkGreen,
  },
  tabText: {
    fontWeight: "600",
    color: colors.darkGray,
  },
  activeTabText: {
    color: colors.white,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
  },
  searchWrapper: {
    flex: 1,
    position: "relative",
  },
  searchIcon: {
    position: "absolute",
    left: 10,
    top: 12,
    zIndex: 1,
  },
  searchbar: {
    elevation: 0,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    height: 45,
  },
  searchInput: {
    paddingLeft: 30,
    fontSize: 14,
  },
  yearSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  yearText: {
    fontWeight: "600",
    color: colors.darkGreen,
    marginRight: 4,
  },
  columnHeader: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  columnHeaderText: {
    fontSize: 13,
    color: colors.darkGray,
    fontWeight: "500",
  },
  idColumn: {
    width: "15%",
  },
  descColumn: {
    width: "45%",
  },
  amountColumn: {
    width: "30%",
    textAlign: "right",
  },
  actionsColumn: {
    width: "10%",
    textAlign: "center",
  },
  transactionItem: {
    flexDirection: "row",
    paddingVertical: 16,
    alignItems: "center",
  },
  transactionLeft: {
    width: "15%",
  },
  transactionMiddle: {
    width: "45%",
  },
  transactionRight: {
    width: "40%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionId: {
    fontWeight: "500",
    color: colors.darkGray,
  },
  transactionDesc: {
    fontWeight: "500",
    fontSize: 15,
    color: colors.black,
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: colors.darkGray,
  },
  transactionAmount: {
    fontWeight: "600",
    color: colors.darkGreen,
    fontSize: 15,
  },
  divider: {
    backgroundColor: colors.lightGray,
    height: 1,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: colors.darkGreen,
  },
})

export default invoices
