/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState
} from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useUpdateCart } from 'npm-pkg-hook'

export const Context = createContext()

const Provider = ({ children }) => {
  // STATE
  const router = useRouter()
  const [error, setError] = useState({})
  // State to Session
  const [isCompany, setCompany] = useState({})
  // Effects para el Toast
  useEffect(() => {
    !!error?.message &&
      setTimeout(() => { return setError('') }, error.duration || 7000)
  }, [error])
  const [collapsed, setCollapsed] = useState(false)
  // Context to setCompanyLink
  const DataCompany = useMemo(
    () => {
      return {
        isCompany
      }
    },
    [isCompany]
  )
  const setCompanyLink = useCallback(
    sessionValue => { return setCompany(sessionValue) },
    []
  )
  // Verify state
  const [menu, setMenu] = useState(0)
  const [itemProducts, setCountItemProduct] = useState(0)
  const handleMenu = index => { return setMenu(index === menu ? false : index) }
  const initialCompanyState = {
    idStore: undefined
  }

  // Context LastCompany
  const [company, setCompanyId] = useState(initialCompanyState)
  const useCompany = idStore => {
    setCompanyId({
      ...company,
      idStore
    })
    if (typeof idStore !== 'undefined') {
      localStorage.setItem('idStore', idStore)
    }
  }
  useEffect(() => {
    if (localStorage.getItem('idStore') !== company.idStore) {
      setCompanyId({
        ...company,
        idStore: localStorage.getItem('idStore')
      })
    }
  }, [company])

  // Context to session
  const [isSession, setIsSession] = useState()
  const setSessionActive = useCallback(
    sessionValue => { return setIsSession(sessionValue) },
    []
  )
  useEffect(() => {
    if (!isSession) {
      setIsSession(null)
    } else {
      setIsSession(isSession)
    }
  }, [isSession])

  const authData = useMemo(
    () => {
      return {
        isSession
      }
    },
    [isSession]
  )
  const [alert] = useState(false)
  const initialState = {
    PRODUCT: []
  }
  const product = (state, action) => {
    //   ADD TO CARD
    const shoppingCart = JSON.parse(localStorage.getItem('shoppingCard'))
    switch (action.type) {
      case 'ADD_PRODUCT':
        localStorage.setItem('shoppingCard', JSON.stringify({ ...shoppingCart, ...state?.PRODUCT }))
        return {
          ...state,
          // eslint-disable-next-line no-unsafe-optional-chaining
          PRODUCT: [...state?.PRODUCT, action?.payload]

        }
      case 'REMOVE_PRODUCT':
        return {
          PRODUCT: state?.PRODUCT?.filter((t, idx) => { return idx !== action?.idx })
        }
      case 'REMOVE_ALL':
        return {
          PRODUCT: []
        }
      case 'TOGGLE_INVOICE':
        return {
          PRODUCT: state?.PRODUCT.map((t, idx) => { return idx === action.idx ? { ...t, isPaid: !t.isPaid } : t })
        }
      default:
        return state
    }
  }
  const [state_product_card, dispatch] = useReducer(product, initialState)
  const [modalLocation, setModalLocation] = useState(false)
  const [locationStr, setLocationString] = useState('')
  const setLocationActive = useCallback(
    location => { return setModalLocation(location) },
    [locationStr, modalLocation]
  )
  const stateLocation = useMemo(
    () => {
      return {
        modalLocation
      }
    },
    [modalLocation]
  )
  useEffect(() => {
    const location = localStorage.getItem('location.data')
    if (!location) {
      setLocationActive(true)
    }
  }, [locationStr, modalLocation, setModalLocation, setLocationString])

  const [menuMobile, setOpenMenuMobile] = useState(false)
  const [status, setStatus] = useState('close')

  useEffect(() => {
    handleMenu(false)
    setOpenMenuMobile(false)
    setStatus('close')
  }, [router])

  // MODAL PRODUCT
  const [openProductModal, setOpenProductModal] = useState(false)
  const handleProductModal = index => { return setOpenProductModal(index === openProductModal ? false : index) }
  useEffect(() => {
    const body = document.body
    body.addEventListener('keyup', e => {
      return e.code === 'Escape' &&
        router.push(
          {
            href: window.location.href,
            query: {}
          },
          undefined,
          {
            shallow: true
          }
        )
    })
    return () => { return body.removeEventListener('keyup', () => { }) }
  }, [])

  const [hidden, setHidden] = useState(false)
  const [selectedStore, setSelectedStore] = useState(null)
  const setStoreChatActive = useCallback(sessionValue => {
    setSelectedStore(sessionValue)
  },
  [selectedStore, hidden]
  )
  const { saveDataState, handleAdd } = useUpdateCart()

  // UPDATE TEMP CART

  const value = {
    alert,
    authData,
    collapsed,
    company,
    DataCompany,
    error,
    handleAdd,
    hidden,
    isCompany,
    isSession,
    itemProducts,
    locationStr,
    menu,
    menuMobile,
    modalLocation,
    openProductModal,
    saveDataState,
    selectedStore,
    state_product_card,
    stateLocation,
    status,
    dispatch,
    handleMenu,
    handleProductModal,
    setAlertBox: err => { return setError(err) },
    setCollapsed,
    setCompanyLink,
    setCountItemProduct,
    setHidden,
    setIsSession,
    setLocationString,
    setModalLocation,
    setOpenMenuMobile,
    setOpenProductModal,
    setSessionActive,
    setStatus,
    setStoreChatActive,
    useCompany
  }
  return <Context.Provider value={value}>
    {children}
  </Context.Provider>
}

Provider.propTypes = {
  children: PropTypes.array || PropTypes.object
}
const useAuth = () => { return useContext(Context) }

export { Provider as default, useAuth }
