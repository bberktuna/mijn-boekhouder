import CollapsibleHeader from "@/components/CollapsibleHeader"
import PrimaryButton from "@/components/PrimaryButton"
import colors from "@/constants/colors"
import { Entypo, Feather } from "@expo/vector-icons"
import { useRef } from "react"
import { Animated, StatusBar, StyleSheet, Text, View } from "react-native"

const HEADER_HEIGHT = 100

const dashboard = () => {
  const scrollY = useRef(new Animated.Value(0)).current

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <CollapsibleHeader title="Dashboard" scrollY={scrollY} />
      <StatusBar barStyle="dark-content" />

      <Animated.ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <View style={styles.balanceCard}>
          <View style={styles.balanceLeft}>
            <View>
              <Text style={styles.label}>Your Balance</Text>
              <Text style={styles.amount}>$12,435.00</Text>
            </View>
            <View>
              <Text style={styles.account}>BTW Nummer: 34243242</Text>
            </View>
          </View>
          <View style={styles.balanceRight}>
            <Entypo
              name="dots-three-horizontal"
              size={24}
              color={colors.darkGreen}
            />
            <View>
              <Text style={styles.label}>Expired Date</Text>
              <Text style={styles.expired}>25/12/2029</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <PrimaryButton
            title={"Inkomsten Toevoegen"}
            onPress={() => {}}
            style={styles.inkomstenButton}
            textStyle={styles.inkomstenButtonText}
            icon="addfolder"
            iconPosition="right"
            iconColor={colors.midGreen}
          />

          <PrimaryButton
            title="Uitgaven Toevoegen"
            onPress={() => {}}
            style={styles.uitgavenButton}
            textStyle={styles.uitgavenButtonText}
            icon="addfolder"
            iconPosition="right"
            iconColor={colors.darkGreen}
          />
        </View>

        {/* Overview */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.sectionTitle}>Monthly</Text>
        </View>

        <View style={styles.overviewRow}>
          <View style={styles.overviewCard}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Feather
                name="arrow-down-left"
                size={24}
                color={colors.midGreen}
                style={styles.radiusIcon}
              />
              <Text style={styles.overviewLabel}>Inkomsten</Text>
            </View>
            <Text style={styles.overviewValue}>+$4,092.00</Text>
          </View>
          <View style={styles.overviewCard}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Feather
                name="arrow-up-right"
                size={24}
                color={colors.midGreen}
                style={styles.radiusIcon}
              />
              <Text style={styles.overviewLabel}> Uitgeven</Text>
            </View>
            <Text style={styles.overviewValue}>-$1,254.00</Text>
          </View>
        </View>

        {/* Graph Placeholder */}
        <View style={styles.graphCard}>
          <Text style={styles.graphTitle}>Overview Spending</Text>
          <Text style={styles.graphSubtitle}>More Details</Text>
          {/* Placeholder for pie chart / SVG graphic */}
          <View style={styles.graphPlaceholder} />
        </View>
      </Animated.ScrollView>
    </View>
  )
}

export default dashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
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

  balanceCard: {
    backgroundColor: colors.lightGreen,
    height: 150,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  balanceLeft: {
    flex: 2,
    justifyContent: "space-between",
  },
  balanceRight: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  label: {
    color: colors.darkGreen,
    fontSize: 12,
  },
  amount: {
    color: colors.darkGreen,
    fontSize: 36,
    fontWeight: "bold",
    marginVertical: 4,
  },
  account: {
    color: colors.darkGreen,
    fontSize: 12,
  },
  expired: {
    color: colors.darkGreen,
    fontSize: 14,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  inkomstenButton: {
    backgroundColor: colors.darkGreen,
    flex: 1,
    marginRight: 8,
    padding: 8,
  },
  inkomstenButtonText: {
    color: colors.midGreen,
  },
  uitgavenButton: {
    backgroundColor: colors.midGreen,
    flex: 1,
    marginLeft: 8,
  },
  uitgavenButtonText: {
    color: colors.darkGreen,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.darkGreen,
    marginBottom: 12,
  },
  overviewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  overviewCard: {
    backgroundColor: colors.lightGreen,
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.lightGray,
    width: "48%",
    justifyContent: "flex-start",
  },
  overviewLabel: {
    color: colors.darkGreen,
    marginTop: 8,
    fontSize: 16,
    paddingLeft: 8,
    fontWeight: "bold",
  },
  overviewValue: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 4,
  },
  graphCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
  },
  graphTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.darkGreen,
    marginBottom: 4,
  },
  graphSubtitle: {
    color: colors.gray,
    fontSize: 12,
    marginBottom: 16,
  },
  graphPlaceholder: {
    height: 150,
    backgroundColor: colors.lightGreen,
    borderRadius: 12,
  },
  radiusIcon: {
    padding: 12,
    backgroundColor: colors.darkGreen,
    borderRadius: 25,
  },
})
