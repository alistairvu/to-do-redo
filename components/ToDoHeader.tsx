import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useSetRecoilState } from "recoil"
import { storeData } from "../asyncStorage"
import { toDoState } from "../recoil/atoms"
import OptionsMenu from "react-native-options-menu"

const MenuIcon = (
  <Ionicons name="ellipsis-horizontal-circle-sharp" size={30} color="white" />
)

const monthNames: Array<string> = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export const ToDoHeader = () => {
  const [dateDisplay, setDateDisplay] = useState<string>("")
  const setToDos = useSetRecoilState(toDoState)

  useEffect(() => {
    const date = new Date()
    setDateDisplay(`${date.getDate()} ${monthNames[date.getMonth()]}`)
  }, [])

  const clearDone = () => {
    setToDos((prev) => {
      storeData(prev.filter((item) => item.done === false))
      return prev.filter((item) => item.done === false)
    })
  }

  const clearAll = () => {
    storeData([])
    setToDos([])
  }

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{dateDisplay}</Text>
      <OptionsMenu
        customButton={MenuIcon}
        destructiveIndex={1}
        options={["Clear Done", "Clear All", "Cancel"]}
        actions={[clearDone, clearAll, () => {}]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 35,
    fontWeight: "600",
    color: "white",
  },
})
