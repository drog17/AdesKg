// import React, { useEffect, useState } from 'react'
// import {
//   View,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   Keyboard,
// } from 'react-native'
// import { useRouter } from 'expo-router'
// import Svg, { Path, Rect, Circle } from 'react-native-svg'
// import { Formik } from 'formik'
// import * as Yup from 'yup'
// import { useDispatch, useSelector } from 'react-redux'
// import { RootState } from '@/Data/store/store'
// import { IOrderData, selectAllOrders } from '@/features/orders/orders.slice'
// import { setQuery, setResults } from '@/features/search/search.slice'

// const validationSchema = Yup.object().shape({
//   searchInput: Yup.string().required('Поле не должно быть пустым'),
// })

// interface IFormValues {
//   searchInput: string
// }

// const SearchBar: React.FC = () => {
//   const orders: IOrderData[] = useSelector((state: RootState) => selectAllOrders(state))
//   const { results } = useSelector((state: RootState) => state.search)
//   const notifications = useSelector((state: RootState) => state.notifications.items)
//   const hasUnread = notifications.some(n => !n.isRead)

//   const dispatch = useDispatch()
//   const router = useRouter()

//   const [productDoesNotExist, setProductDoesNotExist] = useState('')

//   const searchFilter = (value: IFormValues, resetForm: () => void) => {
//     const trimmedValue = value.searchInput.trim()
//     const filteredOrders = orders
//       .filter((order: IOrderData) => order.hatch === trimmedValue)
//       .map(order => order.status)

//     if (filteredOrders.length > 0) {
//       dispatch(setResults(filteredOrders))
//       dispatch(setQuery(trimmedValue))
//       resetForm()
//       setProductDoesNotExist('')
//     } else {
//       setProductDoesNotExist('Не найдено!')
//     }
//   }

//   useEffect(() => {
//     if (results.length === 0) return

//     switch (results[0]) {
//       case 'on_the_way':
//         router.push('/Screens/orderScreens/on_the_way/OnTheWay')
//         break
//       case 'delivered':
//         router.push('/Screens/orderScreens/in_Kyrgyzstan/In_Kyrgyzstan')
//         break
//       case 'in_storage':
//         router.push('/Screens/orderScreens/InStocks/In_Stocks')
//         break
//       default:
//         break
//     }
//   }, [results])

//   return (
//     <Formik
//       initialValues={{ searchInput: '' }}
//       validationSchema={validationSchema}
//       onSubmit={(value, { resetForm }) => searchFilter(value, resetForm)}
//     >
//       {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldTouched }) => (
//         <View style={styles.container}>
//           {/* Поиск */}
//           <View
//             style={[
//               styles.searchContainer,
//               errors.searchInput && touched.searchInput ? styles.inputError : null,
//             ]}
//           >
//             <TextInput
//               placeholder="Отследите ваш товар"
//               style={styles.searchInput}
//               placeholderTextColor={'#737373'}
//               onChangeText={text => {
//                 handleChange('searchInput')(text)
//                 setProductDoesNotExist('')
//               }}
//               onBlur={() => {
//                 handleBlur('searchInput')
//                 setFieldTouched('searchInput')
//               }}
//               value={values.searchInput}
//               onSubmitEditing={() => {
//                 setFieldTouched('searchInput', true)
//                 handleSubmit()
//                 Keyboard.dismiss()
//               }}
//             />
//             <TouchableOpacity
//               disabled={!values.searchInput}
//               onPress={() => handleSubmit()}
//             >
//               <Svg width={26} height={26} fill="none">
//                 <Path
//                   fill="#5EB147"
//                   fillRule="evenodd"
//                   d="M11.535 4.395a8.14 8.14 0 1 0 0 16.28 8.14 8.14 0 0 0 0-16.28ZM2 12.535a9.535 9.535 0 1 1 19.07 0c0 2.382-.874 4.56-2.318 6.23l3.044 3.044a.698.698 0 0 1-.987.987l-3.043-3.044a9.498 9.498 0 0 1-6.231 2.318A9.535 9.535 0 0 1 2 12.535Z"
//                   clipRule="evenodd"
//                 />
//               </Svg>
//             </TouchableOpacity>
//           </View>

//           {errors.searchInput && touched.searchInput && (
//             <Text style={styles.errorText}>{errors.searchInput}</Text>
//           )}
//           {productDoesNotExist && (
//             <Text style={styles.errorText}>{productDoesNotExist}</Text>
//           )}

//           {/* Уведомления */}
//           <TouchableOpacity
//             onPress={() => router.push('/Screens/Notifications/Notification')}
//           >
//             <Svg width={37} height={37} fill="none">
//               <Rect width={37} height={37} fill="#5EB147" rx={18.5} />
//               <Path
//                 fill="#FFFFFA"
//                 d="M14.873 26.064A3.968 3.968 0 0 0 18 27.571c1.274 0 2.406-.59 3.127-1.507a23.28 23.28 0 0 1-6.254 0ZM23.785 16.428v.604c0 .724.207 1.432.594 2.035l.95 1.477c.866 1.349.204 3.182-1.303 3.609a22.11 22.11 0 0 1-12.051 0c-1.508-.427-2.17-2.26-1.303-3.61l.949-1.476c.387-.603.594-1.31.594-2.035v-.604c0-3.313 2.59-6 5.785-6 3.195 0 5.785 2.687 5.785 6Z"
//               />
//               {hasUnread && <Circle cx={22.5} cy={11.5} r={2.5} fill="#ff0000" />}
//             </Svg>
//           </TouchableOpacity>
//         </View>
//       )}
//     </Formik>
//   )
// }

// export default SearchBar

// const styles = StyleSheet.create({
//   container: {
//     fontFamily: '400',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     position: 'relative',
//   },
//   searchContainer: {
//     width: '83%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     paddingRight: 10,
//     paddingTop: 6,
//     paddingBottom: 5,
//     borderWidth: 1,
//     borderColor: 'rgb(200, 200, 200)',
//   },
//   inputError: {
//     borderColor: 'red',
//   },
//   searchInput: {
//     fontFamily: '400',
//     width: '90%',
//     fontSize: 14,
//     lineHeight: 17,
//     paddingLeft: 15,
//     paddingRight: 10,
//   },
//   errorText: {
//     position: 'absolute',
//     color: 'red',
//     fontFamily: '500',
//     fontSize: 12,
//     top: '100%',
//     left: '4.5%',
//   },
// })
// src/components/SearchBar.tsx\

import React, { useEffect, useState, useCallback } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Keyboard,
} from 'react-native'
import { useRouter } from 'expo-router'
import Svg, { Path, Rect, Circle } from 'react-native-svg'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@/Data/store/store' // поправь путь
import { IOrderData, selectAllOrders } from '@/features/orders/orders.slice'
import { setQuery, setResults } from '@/features/search/search.slice'

const validationSchema = Yup.object().shape({
  searchInput: Yup.string().required('Поле не должно быть пустым'),
})

interface IFormValues {
  searchInput: string
}

const SearchBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  // Получаем все заказы через селектор (массив)
  const orders = useSelector((state: RootState) => selectAllOrders(state)) as IOrderData[]
  // notifications slice: ожидаем, что slice называется notifications и в нём поле notificationData (массив)
  const notifications = useSelector((state: RootState) => state.notifications.items)
  const hasUnread = Array.isArray(notifications) && notifications.some((n: any) => !n.isRead)

  const [productDoesNotExist, setProductDoesNotExist] = useState('')

  const searchFilter = useCallback((value: IFormValues, resetForm: () => void) => {
    const trimmed = value.searchInput.trim()
    if (!trimmed) {
      setProductDoesNotExist('')
      return
    }
    // Фильтрация по hatch (равно), затем берём статусы
    const filtered = (orders || []).filter(o => o.hatch === trimmed)
    if (filtered.length > 0) {
      const statuses = filtered.map(o => o.status)
      dispatch(setResults(statuses))
      dispatch(setQuery(trimmed))
      resetForm()
      setProductDoesNotExist('')
    } else {
      setProductDoesNotExist('Не найдено!')
    }
  }, [orders, dispatch])

  useEffect(() => {
    // если results обновляется — перенаправление; здесь используем селектор для results
    // либо можно подписаться на store.search.results
  }, [])

  return (
    <Formik
      initialValues={{ searchInput: '' }}
      validationSchema={validationSchema}
      onSubmit={(value, { resetForm }) => searchFilter(value, resetForm)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldTouched }) => (
        <View style={styles.container}>
          <View style={[
            styles.searchContainer,
            errors.searchInput && touched.searchInput ? styles.inputError : undefined
          ]}>
            <TextInput
              placeholder="Отследите ваш товар"
              style={styles.searchInput}
              placeholderTextColor={'#737373'}
              onChangeText={(text) => {
                handleChange('searchInput')(text)
                setProductDoesNotExist('')
              }}
              onBlur={() => {
                handleBlur('searchInput')
                setFieldTouched('searchInput')
              }}
              value={values.searchInput}
              onSubmitEditing={() => {
                setFieldTouched('searchInput', true)
                handleSubmit()
                Keyboard.dismiss()
              }}
            />
            <TouchableOpacity
              disabled={!values.searchInput}
              onPress={() => handleSubmit()}
            >
              <Svg width={26} height={26} fill="none">
                <Path
                  fill="#5EB147"
                  fillRule="evenodd"
                  d="M11.535 4.395a8.14 8.14 0 1 0 0 16.28 8.14 8.14 0 0 0 0-16.28ZM2 12.535a9.535 9.535 0 1 1 19.07 0c0 2.382-.874 4.56-2.318 6.23l3.044 3.044a.698.698 0 0 1-.987.987l-3.043-3.044a9.498 9.498 0 0 1-6.231 2.318A9.535 9.535 0 0 1 2 12.535Z"
                  clipRule="evenodd"
                />
              </Svg>
            </TouchableOpacity>
          </View>

          {errors.searchInput && touched.searchInput && (
            <Text style={styles.errorText}>{errors.searchInput}</Text>
          )}
          {productDoesNotExist ? (
            <Text style={styles.errorText}>{productDoesNotExist}</Text>
          ) : null}

          <TouchableOpacity
            onPress={() => router.push('/Screens/Notifications/Notification')}
          >
            <Svg width={37} height={37} fill="none">
              <Rect width={37} height={37} fill="#5EB147" rx={18.5} />
              <Path
                fill="#FFFFFA"
                d="M14.873 26.064A3.968 3.968 0 0 0 18 27.571c1.274 0 2.406-.59 3.127-1.507a23.28 23.28 0 0 1-6.254 0ZM23.785 16.428v.604c0 .724.207 1.432.594 2.035l.95 1.477c.866 1.349.204 3.182-1.303 3.609a22.11 22.11 0 0 1-12.051 0c-1.508-.427-2.17-2.26-1.303-3.61l.949-1.476c.387-.603.594-1.31.594-2.035v-.604c0-3.313 2.59-6 5.785-6 3.195 0 5.785 2.687 5.785 6Z"
              />
              {hasUnread && <Circle cx={22.5} cy={11.5} r={2.5} fill="#ff0000" />}
            </Svg>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    fontFamily: '400',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  searchContainer: {
    width: '83%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 5,
    borderWidth: 1,
    borderColor: 'rgb(200, 200, 200)',
  },
  inputError: {
    borderColor: 'red',
  },
  searchInput: {
    fontFamily: '400',
    width: '90%',
    fontSize: 14,
    lineHeight: 17,
    paddingLeft: 15,
    paddingRight: 10,
  },
  errorText: {
    position: 'absolute',
    color: 'red',
    fontFamily: '500',
    fontSize: 12,
    top: '100%',
    left: '4.5%',
  },
})
