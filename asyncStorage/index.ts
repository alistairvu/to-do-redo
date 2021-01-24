import AsyncStorage from "@react-native-async-storage/async-storage"

export const storeData = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem("to-dos", jsonValue)
  } catch (e) {
    // saving error
  }
}

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("to-dos")
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (e) {
    // error reading value
  }
}

export const storeId = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem("id", jsonValue)
  } catch (e) {
    // saving error
  }
}

export const getId = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("id")
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (e) {
    // error reading value
  }
}
