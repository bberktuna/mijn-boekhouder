import CollapsibleHeader from "@/components/CollapsibleHeader"
import colors from "@/constants/colors"
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import React, { useRef, useState } from "react"
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native"
import { LineChart } from "react-native-chart-kit"

const TAB_BAR_HEIGHT = 48
const HEADER_HEIGHT = 100
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height
const PAGE_HEIGHT = screenHeight - HEADER_HEIGHT - TAB_BAR_HEIGHT

interface Quarter {
  id: string
  label: string
  months: string
  totalIncome: number
  totalExpenses: number
  totalVAT: number
  terugVAT: number
  totalKM: number
  lineData: number[]
  hoursWorked: number
}

const quarters: Quarter[] = [
  {
    id: "Q1",
    label: "Q1",
    months: "Jan - Mar",
    totalIncome: 12450,
    totalExpenses: 7890,
    totalVAT: 1560,
    terugVAT: 800,
    totalKM: 1234,
    lineData: [3000, 4500, 2800, 5000],
    hoursWorked: 36,
  },
  {
    id: "Q2",
    label: "Q2",
    months: "Apr - Jun",
    totalIncome: 15800,
    totalExpenses: 9200,
    totalVAT: 1980,
    terugVAT: 900,
    totalKM: 1100,
    lineData: [4000, 4200, 3900, 4700],
    hoursWorked: 40,
  },
  {
    id: "Q3",
    label: "Q3",
    months: "Jul - Sep",
    totalIncome: 14200,
    totalExpenses: 8500,
    totalVAT: 1750,
    terugVAT: 700,
    totalKM: 900,
    lineData: [3500, 3700, 3200, 4800],
    hoursWorked: 32,
  },
  {
    id: "Q4",
    label: "Q4",
    months: "Oct - Dec",
    totalIncome: 16800,
    totalExpenses: 9500,
    totalVAT: 2100,
    terugVAT: 1000,
    totalKM: 800,
    lineData: [4100, 4300, 4000, 5500],
    hoursWorked: 38,
  },
]

const summaryData = [
  {
    key: "inkomsten",
    title: "Inkomsten",
    value: "€1.440",
    bg: colors.lightGreen,
  },
  { key: "uitgaven", title: "Uitgaven", value: "€320", bg: colors.lightRed },
  {
    key: "km",
    title: "Kilometers",
    value: "126 km (€28.98)",
    bg: colors.lightGray,
  },
  {
    key: "hours",
    title: "Uren gewerkt",
    value: "36 uur",
    bg: colors.lightGray,
  },
  { key: "btw", title: "Te betalen BTW", value: "€198", bg: colors.lightGray },
  {
    key: "btwTerug",
    title: "Terug te vorderen BTW",
    value: "€56",
    bg: colors.lightGray,
  },
]

const ResultsScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current
  const [selectedQuarterIdx, setSelectedQuarterIdx] = useState(0)
  const flatListRef = useRef<FlatList>(null)

  // For syncing swipe and tab
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setSelectedQuarterIdx(viewableItems[0].index ?? 0)
      }
    }
  ).current

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 })

  // For tab press
  const handleQuarterTabPress = (idx: number) => {
    flatListRef.current?.scrollToIndex({ index: idx, animated: true })
    setSelectedQuarterIdx(idx)
  }

  const renderQuarterTab = (item: Quarter, idx: number) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.quarterTab,
        selectedQuarterIdx === idx && styles.activeQuarterTab,
      ]}
      onPress={() => handleQuarterTabPress(idx)}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.quarterTabText,
          selectedQuarterIdx === idx && styles.activeQuarterTabText,
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  )

  // Helper to generate cards for a quarter
  const getQuarterCards = (q: Quarter) => [
    {
      key: "inkomsten",
      title: "Inkomsten",
      value: `€${q.totalIncome.toLocaleString()}`,
      bg: colors.lightGreen,
      color: colors.darkGreen,
      icon: (
        <Feather name="arrow-down-left" size={22} color={colors.darkGreen} />
      ),
    },
    {
      key: "uitgaven",
      title: "Uitgaven",
      value: `€${q.totalExpenses.toLocaleString()}`,
      bg: colors.lightRed,
      color: colors.darkRed,
      icon: <Feather name="arrow-up-right" size={22} color={colors.darkRed} />,
    },
    {
      key: "km",
      title: "Kilometers",
      value: `${q.totalKM} km`,
      subtitle: `Aftrek: €${(q.totalKM * 0.23).toFixed(2)}`,
      bg: colors.lightGray,
      color: colors.darkGray,
      icon: <Feather name="map-pin" size={22} color={colors.darkGray} />,
    },
    {
      key: "hours",
      title: "Uren gewerkt",
      value: `${q.hoursWorked} uur`,
      bg: colors.lightGray,
      color: colors.darkGray,
      icon: <Feather name="clock" size={22} color={colors.darkGray} />,
    },
    {
      key: "btw",
      title: "Te betalen BTW",
      value: `€${q.totalVAT.toLocaleString()}`,
      bg: colors.lightGray,
      color: colors.darkGreen,
      icon: (
        <MaterialCommunityIcons
          name="file-certificate-outline"
          size={22}
          color={colors.darkGreen}
        />
      ),
    },
    {
      key: "btwTerug",
      title: "Terug te vorderen BTW",
      value: `€${q.terugVAT.toLocaleString()}`,
      bg: colors.lightGray,
      color: colors.midGreen,
      icon: <AntDesign name="reload1" size={22} color={colors.midGreen} />,
    },
  ]

  const renderQuarterPage = ({ item }: { item: Quarter }) => {
    const net = item.totalIncome - item.totalExpenses
    const cards = getQuarterCards(item)
    return (
      <View style={styles.pageContainer}>
        {/* Line Chart */}
        <View style={styles.lineChartSection}>
          <LineChart
            data={{
              labels: ["W1", "W2", "W3", "W4"],
              datasets: [
                {
                  data: item.lineData,
                  color: () => colors.darkGreen,
                  strokeWidth: 2,
                },
              ],
            }}
            width={screenWidth - 32}
            height={160}
            chartConfig={{
              backgroundColor: colors.white,
              backgroundGradientFrom: colors.white,
              backgroundGradientTo: colors.white,
              decimalPlaces: 0,
              color: (opacity = 1) => colors.darkGreen,
              labelColor: (opacity = 1) => colors.darkGray,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "5",
                strokeWidth: "2",
                stroke: colors.darkGreen,
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>
        {/* Info Cards Grid */}
        <View style={styles.cardsGrid}>
          {cards.map((card) => (
            <View
              key={card.key}
              style={[styles.card, { backgroundColor: card.bg }]}
            >
              <View style={styles.cardContentRow}>
                <View style={styles.cardTextCol}>
                  <Text style={[styles.cardTitle, { color: card.color }]}>
                    {card.title}
                  </Text>
                  <Text style={[styles.cardValue, { color: card.color }]}>
                    {card.value}
                  </Text>
                  {card.subtitle && (
                    <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
                  )}
                </View>
                <View style={styles.cardIconWrapper}>{card.icon}</View>
              </View>
            </View>
          ))}
        </View>
        {/* Tax Card */}
        <View style={styles.taxCard}>
          <Text style={styles.taxCardLabel}>
            Belasting die voor dit kwartaal moet worden betaald
          </Text>
          <Text style={styles.taxCardValue}>
            €{(item.totalIncome * 0.21 - item.terugVAT).toLocaleString()}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <CollapsibleHeader title="Results" scrollY={scrollY} />
      {/* Quarter selector as tab bar, always visible below header */}
      <View style={styles.absoluteTabBarWrapper}>
        <View style={styles.quarterTabContainer}>
          {quarters.map((q, idx) => renderQuarterTab(q, idx))}
        </View>
      </View>
      {/* Swipeable Quarter Pages */}
      <FlatList
        ref={flatListRef}
        data={quarters}
        renderItem={renderQuarterPage}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
        style={{
          marginTop: HEADER_HEIGHT + TAB_BAR_HEIGHT,
          height: PAGE_HEIGHT,
        }}
        contentContainerStyle={{ paddingBottom: 24 }}
        getItemLayout={(_, index) => ({
          length: screenWidth,
          offset: screenWidth * index,
          index,
        })}
        snapToInterval={screenWidth}
        decelerationRate="fast"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  card: {
    width: "48%",
    minWidth: 130,
    height: 66,
    borderRadius: 12,
    padding: 8,
    justifyContent: "center",
    marginBottom: 18,
    shadowColor: colors.darkGreen,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
    position: "relative",
  },
  cardContentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
  },
  cardTextCol: {
    flex: 1,
    justifyContent: "center",
  },
  cardIconWrapper: {
    position: "absolute",
    top: 6,
    right: 8,
    zIndex: 2,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 1,
  },
  cardValue: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 2,
  },
  cardSubtitle: {
    fontSize: 11,
    color: colors.darkGray,
    marginTop: 1,
  },
  absoluteTabBarWrapper: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 20,
    backgroundColor: colors.white,
    paddingTop: 0,
    paddingBottom: 0,
    shadowColor: colors.darkGreen,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  quarterTabContainer: {
    flexDirection: "row",
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 0,
    marginBottom: 0,
    overflow: "hidden",
    alignSelf: "center",
    height: TAB_BAR_HEIGHT,
  },
  quarterTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  activeQuarterTab: {
    backgroundColor: colors.darkGreen,
  },
  quarterTabText: {
    fontWeight: "600",
    color: colors.darkGray,
    fontSize: 15,
  },
  activeQuarterTabText: {
    color: colors.white,
  },
  pageContainer: {
    width: screenWidth,
    flex: 1,
    alignItems: "center",
    paddingTop: 8,
    justifyContent: "flex-start",
  },
  lineChartSection: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    width: "100%",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  cardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "92%",
    alignSelf: "center",
    marginBottom: 0,
    padding: 18,
  },
  taxCard: {
    backgroundColor: colors.lightGreen,
    borderRadius: 16,
    padding: 10,
    marginTop: 2,
    alignItems: "center",
    width: "92%",
    alignSelf: "center",
    borderWidth: 1.5,
    borderColor: colors.midGreen,
    shadowColor: colors.darkGreen,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 0,
  },
  taxCardLabel: {
    fontSize: 15,
    color: colors.darkGray,
    marginBottom: 6,
    fontWeight: "600",
    textAlign: "center",
  },
  taxCardValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.darkGreen,
    textAlign: "center",
  },
})

export default ResultsScreen
