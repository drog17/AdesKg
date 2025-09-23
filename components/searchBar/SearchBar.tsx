import React, { useEffect, useState } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Keyboard,
} from 'react-native'
import { Href, useRouter } from 'expo-router'
import Svg, { SvgProps, Rect, Path, Circle } from 'react-native-svg'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/Data/store/store'
import { IOrderData } from '@/Data/store/slices/getStatusOrder/status.order.slice'
import { setSearchOrder } from '@/Data/store/slices/filterSearchOrder/searc.order.slice'

const validationSchema = Yup.object().shape({
  searchInput: Yup.string().required('Поле не должно быть пустым'),
})

export interface ISvgProps extends SvgProps {
  xmlns?: string
  xmlnsXlink?: string
  xmlSpace?: string
}

interface IFormValues {
  searchInput: string
}

const SearchBar: React.FC = (props: ISvgProps) => {
  const { data } = useSelector((state: RootState) => state.orders)
  const { searchData } = useSelector((state: RootState) => state.searchOrder)
  const status = useSelector((state: RootState) =>
    state.notification.notificationData.find((order) => order.isRead === true)
  )

  const [filterData, setFilterData] = useState<IOrderData[]>([])
  const [productDoesNotExist, setProductDoesNotExist] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()

  const searchFilter = (value: IFormValues, resetForm: () => void): void => {
    const filterOrders = data.filter(
      (el: IOrderData) => el.hatch === value.searchInput.trim()
    )
    if (filterOrders.length !== 0) {
      setFilterData(filterOrders)
      resetForm()
    } else if (filterOrders.length === 0) {
      setProductDoesNotExist('Не найдено!')
    }
  }

  switch (
    searchData.reduce((acc: string, el: IOrderData) => acc + el.status, '')
  ) {
    case 'on_the_way':
      router.push('/Screens/orderScreens/on_the_way/OnTheWay')
      break
    case 'delivered':
      router.push('/Screens/orderScreens/in_Kyrgyzstan/In_Kyrgyzstan')
      break
    case 'in_storage':
      router.push('/Screens/orderScreens/InStocks/In_Stocks')
      break
    default:
      break
  }

  useEffect(() => {
    dispatch(setSearchOrder(filterData))
  }, [filterData])

  return (
    <Formik
      initialValues={{ searchInput: '' }}
      validationSchema={validationSchema}
      onSubmit={(value, { resetForm }) => searchFilter(value, resetForm)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldTouched,
      }) => (
        <View style={styles.container}>
          <View
            style={[
              styles.searchContainer,
              errors.searchInput && touched.searchInput
                ? styles.inputError
                : null,
            ]}
          >
            <TextInput
              placeholder="Отследите ваш товар"
              style={styles.searchInput}
              placeholderTextColor={'#737373'}
              onChangeText={(text) => {
                handleChange('searchInput')(text), setProductDoesNotExist('')
              }}
              onBlur={() => {
                handleBlur('searchInput')
                setFieldTouched('searchInput')
              }}
              value={values.searchInput}
              onSubmitEditing={() => {
                setFieldTouched('searchInput', true),
                  handleSubmit(),
                  Keyboard.dismiss()
              }}
              onChange={() => {
                setProductDoesNotExist('')
              }}
            />
            <TouchableOpacity
              disabled={!values.searchInput ? true : false}
              onPress={() => handleSubmit()}
            >
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={26}
                height={26}
                fill="none"
                {...props}
              >
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
          {productDoesNotExist && (
            <Text style={styles.errorText}>{productDoesNotExist}</Text>
          )}
          <TouchableOpacity
            onPress={() =>
              router.push(
                '/Screens/Notifications/Notification'
              ) as unknown as Href<string | object>
            }
          >
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={37}
              height={37}
              fill="none"
              {...props}
            >
              <Rect width={37} height={37} fill="#5EB147" rx={18.5} />
              <Path
                fill="#FFFFFA"
                d="M14.873 26.064A3.968 3.968 0 0 0 18 27.571c1.274 0 2.406-.59 3.127-1.507a23.28 23.28 0 0 1-6.254 0ZM23.785 16.428v.604c0 .724.207 1.432.594 2.035l.95 1.477c.866 1.349.204 3.182-1.303 3.609a22.11 22.11 0 0 1-12.051 0c-1.508-.427-2.17-2.26-1.303-3.61l.949-1.476c.387-.603.594-1.31.594-2.035v-.604c0-3.313 2.59-6 5.785-6 3.195 0 5.785 2.687 5.785 6Z"
              />
              {!status && <Circle cx={22.5} cy={11.5} r={2.5} fill="#ff0000" />}
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
    display: 'flex',
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
    borderStyle: 'solid',
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
