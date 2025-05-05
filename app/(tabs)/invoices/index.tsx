import CollapsibleHeader from "@/components/CollapsibleHeader"
import {
  inkomstenTransactions,
  uitgevenTransactions,
} from "@/constants/transactionData"
import { AntDesign, MaterialIcons } from "@expo/vector-icons"
import React, { useRef, useState } from "react"
import {
  Animated,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { Divider, FAB, IconButton, Searchbar } from "react-native-paper"
import colors from "../../../constants/colors"

const HEADER_HEIGHT = 100

// Sample transaction data

const invoices = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("inkomsten") // 'income' or 'expenses'
  const [selectedYear, setSelectedYear] = useState("2025")
  const scrollY = useRef(new Animated.Value(0)).current

  const onChangeSearch = (query) => setSearchQuery(query)

  const renderInkomstenTransactionItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.transactionItem,
        {
          backgroundColor:
            item.id % 2 === 0
              ? colors.white
              : activeTab === "inkomsten"
              ? colors.lightGreen
              : colors.lightRed,
        },
      ]}
    >
      <View style={styles.transactionLeft}>
        <Text style={styles.transactionId}>{item.id}</Text>
      </View>
      <View style={styles.transactionMiddle}>
        <Text style={styles.transactionDesc}>{item.description}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <View style={styles.transactionRight}>
        <Text
          style={[
            styles.transactionAmount,
            {
              color:
                activeTab === "inkomsten" ? colors.midGreen : colors.midRed,
            },
          ]}
        >
          {"€"}
          {item.amount}
        </Text>
        <IconButton
          icon="dots-horizontal"
          size={20}
          iconColor={colors.darkGray}
          onPress={() => {}}
        />
      </View>
    </TouchableOpacity>
  )

  const renderUitgevenTransactionItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.transactionItem,
        {
          backgroundColor:
            item.id % 2 === 0
              ? colors.white
              : activeTab === "inkomsten"
              ? colors.lightGreen
              : colors.lightRed,
        },
      ]}
    >
      <View style={styles.transactionLeft}>
        <Text style={styles.transactionId}>{item.id}</Text>
      </View>
      <View style={styles.transactionMiddle}>
        <Text style={styles.transactionDesc}>{item.description}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <View style={styles.transactionRight}>
        <Text
          style={[
            styles.transactionAmount,
            {
              color:
                activeTab === "inkomsten" ? colors.midGreen : colors.midRed,
            },
          ]}
        >
          {"€"}
          {item.amount}
        </Text>
        <IconButton
          icon="dots-horizontal"
          size={20}
          iconColor={colors.darkGray}
          onPress={() => {}}
        />
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3FEE8" />

      {/* Header */}
      <CollapsibleHeader title="Invoices" scrollY={scrollY} />

      <Animated.ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "inkomsten" && styles.activeTab]}
            onPress={() => setActiveTab("inkomsten")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "inkomsten" && styles.activeTabText,
              ]}
            >
              Inkomsten
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "uitgeven" && styles.activeTab]}
            onPress={() => setActiveTab("uitgeven")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "uitgeven" && styles.activeTabText,
              ]}
            >
              Uitgeven
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
              placeholder={
                activeTab === "inkomsten"
                  ? "Inkomsten zoeken"
                  : "Uitgeven zoeken"
              }
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
            Prijs{"    "}
          </Text>
          <Text style={[styles.columnHeaderText, styles.actionsColumn]}>
            Acties
          </Text>
        </View>

        {/* Transactions List */}
        {activeTab === "inkomsten" ? (
          <FlatList
            data={inkomstenTransactions}
            renderItem={renderInkomstenTransactionItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <Divider style={styles.divider} />}
          />
        ) : (
          <FlatList
            data={uitgevenTransactions}
            renderItem={renderUitgevenTransactionItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <Divider style={styles.divider} />}
          />
        )}
      </Animated.ScrollView>

      {/* FAB Button */}
      <FAB
        style={styles.fab}
        icon="plus"
        color={colors.white}
        onPress={() => {}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.lightGreen,
    zIndex: 10,
    overflow: "hidden",
  },
  header: {
    backgroundColor: colors.lightGreen,
    elevation: 0,
    justifyContent: "space-between",
    height: 48, // Yüksekliği 60'dan 48'e düşürdük
    paddingVertical: 0, // Ekstra padding'i kaldırdık
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.darkGreen,
    marginLeft: 16,
  },
  headerIcon: {
    margin: 0,
    padding: 0,
  },
  notificationBadge: {
    position: "absolute",
    right: 5,
    top: 5,
    backgroundColor: colors.midGreen,
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    color: colors.darkGreen,
    fontSize: 10,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 80, // FAB butonunun altında boşluk bırak
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
    color: colors.darkGreen,
  },
  searchbar: {
    elevation: 0,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    height: 45,
  },
  searchInput: {
    fontSize: 14,
    color: colors.darkGreen,
    alignSelf: "center",
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
    fontWeight: "bold",
  },
  idColumn: {
    width: "15%",
  },
  descColumn: {
    width: "40%",
  },
  amountColumn: {
    width: "25%",
    textAlign: "left",
  },
  actionsColumn: {
    width: "20%",
    textAlign: "center",
  },
  transactionItem: {
    flexDirection: "row",
    padding: 8,
    alignItems: "center",
  },
  transactionLeft: {
    width: "15%",
  },
  transactionMiddle: {
    width: "40%",
  },
  transactionRight: {
    width: "45%",
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
    fontSize: 15,
    width: "60%",
    textAlign: "left",
    fontWeight: "bold",
  },
  actionButtons: {
    width: "40%",
    alignItems: "center",
  },
  actionButton: {
    margin: 0,
    padding: 0,
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
    borderRadius: 999,
  },
})

export default invoices
