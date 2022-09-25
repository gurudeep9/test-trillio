/* eslint-disable no-undef */
import React, {
  useCallback,
  useState,
  useContext,
  useEffect,
  useRef
} from 'react'
import PropTypes from 'prop-types'
import {
  Circle,
  GoogleMap,
  Marker,
  useJsApiLoader
} from '@react-google-maps/api'
import mapStyle from './mapStyles'
import {
  Google,
  IconArrowLeft,
  IconDelete,
  IconDost,
  IconGoogleFullColor,
  IconLocationMap2,
  IconSearch
} from '../../public/icons'
import { PColor, SECBGColor } from '../../public/colors'
import {
  Address, AwesomeModal,
  BtnAddressContainer,
  Button,
  Container,
  ContainerMap,
  ContainerTask,
  ContentAlert,
  ContentButton,
  ListTask,
  MapHeader,
  OptionsFunction,
  Span,
  Text
} from './styled'
import {
  useMutation,
  useQuery,
  useLazyQuery
} from '@apollo/client'
import {
  DELETE_ONE_LOCATIONS,
  GET_ALL_LOCATIONS,
  SAVE_LOCATION_USER
} from './queries'
import { RippleButton } from '../Ripple'
import { useFormTools } from '../BaseForm'
import {
  GET_ALL_CITIES,
  GET_ALL_COUNTRIES,
  GET_ALL_DEPARTMENTS,
  GET_ALL_ROAD,
  GET_ONE_CITY,
  GET_ONE_COUNTRY,
  GET_ONE_DEPARTMENT
} from '../../gql/Location'
import { filterKeyObject, updateCache } from '../../utils'
import { Context } from '../../context'
import { usePosition } from '../hooks/usePosition'
import { API_GOOGLE_MAPS } from '../../apollo/urls'
import { Form } from './Form'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { Input } from '@/container/InputSearch/styled'
import { ContainerModal } from '../ModalProducts/styled'
import Row from '../common/Atoms/Row'
import Column from '../common/Atoms/Column'

export const MapStore = ({ showModal, setShowModal }) => {
  const [modal, setModal] = useState(0)
  const { latitude, longitude } = usePosition()
  const mapContainerStyle = {
    height: '70vh',
    width: '100%',
    position: 'absolute'
  }
  // eslint-disable-next-line
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
  const [show, setShow] = useState(false)
  const { setAlertBox, setLocationString } = useContext(Context)
  const [getOneCountry, { data: dataCountry }] = useLazyQuery(GET_ONE_COUNTRY)
  const [getOneDepartment, { data: dataDepartment }] = useLazyQuery(GET_ONE_DEPARTMENT)
  const [getOneCities, { data: dataGetOneCity }] = useLazyQuery(GET_ONE_CITY)
  const center = {
    lat: -3.745,
    lng: -38.523
  }
  const [{ lat, lng }, setMarkers] = useState(center)
  const [{ newLat, newLng }, setNewMarkers] = useState(center)
  const onMapDrag = useCallback(e => {
    setMarkers(() => {
      return {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
    })
  }, [])

  const fetchData = useCallback(async () => {
    const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${dataCountry && dataCountry?.getOneCountry?.cName} ${dataDepartment && dataDepartment?.getOneDepartment?.dName} ${dataGetOneCity && dataGetOneCity?.getOneCities?.cName} ${dataForm.uLocationKnow} ${latitude} ${longitude}&key=${API_GOOGLE_MAPS}`
    fetch(API)
      .then(response => { return response.json() })
      .then(response => {
        if (response?.results) {
          const geometry = response?.results[0]?.geometry
          const { location } = geometry || {}
          const { lat, lng } = location || {}
          setMarkers(() => {
            return {
              lat,
              lng
            }
          })
          setNewMarkers(() => {
            return {
              newLat: lat,
              newLng: lng
            }
          })
        }
      })
      .catch(() => {
        return {}
      })
  }, [dataCountry, dataDepartment, dataForm.uLocationKnow, dataGetOneCity, latitude, longitude])

  const { suggestions: { data }, setValue, value } = usePlacesAutocomplete({
    requestOptions: {
      // types: ['restaurant'],
      componentRestrictions: { country: 'CO' }
    }
  })
  const hableSearchLocation = () => {
    setModal(2)
    fetchData()
  }
  const circleRef = useRef()
  const [showCircle, setShowCircle] = useState(false)
  useEffect(() => {
    if (circleRef?.current?.props) {
      const { lat: currentLatApi, lng: currentLngApi } = circleRef?.current?.props?.center || {}
      if (currentLatApi !== lat) {
        setShowCircle(true)
      }
      if (currentLngApi !== lng) {
        setShowCircle(true)
      }
    }
  }, [lat, lng, newLat, newLng])

  const { data: dataLocation, loading: LoadL } = useQuery(GET_ALL_LOCATIONS)
  const [updateUserLocations] = useMutation(SAVE_LOCATION_USER)
  const [deleteUserLocations] = useMutation(DELETE_ONE_LOCATIONS)
  const handleSave = async () => {
    setModal(0)
    return updateUserLocations({
      variables: {
        input: {
          cId: values.countryId,
          ctId: values.ctId,
          dId: values.dId,
          uLatitud: lat,
          uLongitude: lng,
          uLocationKnow: dataForm.uLocationKnow,
          uPiso: 1
        }
      },
      update: (cache, { data: { getUserLocations } }) => {
        return updateCache({
          cache,
          query: GET_ALL_LOCATIONS,
          nameFun: 'getUserLocations',
          dataNew: getUserLocations
        })
      }
    })
      .then(() => { return setAlertBox({ message: 'ubicación guardada exitosamente' }) })
      .catch(() => { })
  }

  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})

  const [getDepartments, { data: dataDepartments }] = useLazyQuery(GET_ALL_DEPARTMENTS)
  const [getCities, { data: dataCities }] = useLazyQuery(GET_ALL_CITIES)
  const { data: dataRoad } = useQuery(GET_ALL_ROAD)
  const { data: dataCountries } = useQuery(GET_ALL_COUNTRIES)
  const handleChangeLocation = (e, error) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: error })
  }
  const handleChangeSearch = e => {
    if (e.target.name === 'countryId') {
      getDepartments({ variables: { cId: e.target.value } })
      getOneCountry({ variables: { cId: e.target.value } })
    } else if (e.target.name === 'dId') {
      getCities({ variables: { dId: e.target.value } })
      getOneDepartment({ variables: { dId: e.target.value } })
    } else if (e.target.name === 'ctId') {
      getOneCities({ variables: { ctId: e.target.value } })
    }
    handleChangeLocation(e)
  }

  const departments = dataDepartments?.departments || []
  const countries = dataCountries?.countries || []
  const road = dataRoad?.road || []
  const cities = dataCities?.cities || []
  const closeAllState = () => {
    setShowModal(!showModal)
    setModal(0)
    setValues({})
    setShow(false)
  }
  const [check, setCheck] = useState(false)
  const [selected, setSelected] = useState(false)
  const handleCheckChange = e => {
    const { checked } = e.target
    setCheck(!!checked)
  }
  const HandleDeleteUserLocations = elem => {
    const { locationId } = elem
    deleteUserLocations({
      variables: { locationId, uLocationState: 1 },
      update: (cache, { data: { getUserLocations } }) => {
        return updateCache({
          cache,
          query: GET_ALL_LOCATIONS,
          nameFun: 'getUserLocations',
          dataNew: getUserLocations
        })
      }
    })
  }
  const handleSelectLocation = elem => {
    let data = elem
    data = filterKeyObject(elem, ['__typename', 'DatMod', 'DatCre'])
    localStorage.setItem('location.data', JSON.stringify(data))
    const location = localStorage.getItem('location.data')
    setSelected(JSON.parse(location))
    setLocationString(data)
  }
  useEffect(() => {
    const location = localStorage.getItem('location.data')
    setSelected(JSON.parse(location))
    if (!LoadL && !dataLocation?.getUserLocations?.length > 0) {
      localStorage.removeItem('location.data')
    }
  }, [LoadL, dataLocation])

  const handleMyLocation = async () => {
    localStorage.removeItem('location.data')
    const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude} ${longitude} &key=${API_GOOGLE_MAPS}`
    fetch(API)
      .then(response => { return response.json() })
      .then(response => {
        setLocationString({ uLocationKnow: response?.results[0].formatted_address })
        const data = {
          uLocationKnow: response?.results[0].formatted_address
        }
        localStorage.setItem('location.data', JSON.stringify(data))
      })
      .catch(() => {
        return {}
      })
  }
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_GOOGLE_MAPS
  })
  if (!isLoaded) {
    return (
      <div></div>
    )
  }

  const handleSelect = async ({ description }) => {
    const results = await getGeocode({ address: description })
    const { lat, lng } = await getLatLng(results[0])
    setMarkers(() => {
      return {
        lat,
        lng
      }
    })
    setModal(2)
  }
  const showAddressLis = value.length < 4
  return (
    <ContainerModal onClick={() => { return closeAllState() }} showModal={showModal}>
      <AwesomeModal onClick={e => { return e.stopPropagation() }} showModal={showModal}>
        {<Container modal={modal === 0}>
          <div className='content-location'>
            <Text as='h2'>¿Donde quieres recibir tu pedido?</Text>
            <Row
              alignItems='center'
              backgroundColor={SECBGColor}
              borderRadius='8px'
              margin='auto'
              padding='5px'
              width='95%'
            >
              <Column padding='10px' width='min-content'>
                <IconSearch color={PColor} size={20} />
              </Column>
              <Input
                name='uLocationKnow'
                onChange={(e) => { return setValue(e.target.value) }}
                placeholder='Ingresa tu dirección como la conoces'
                required
                style={{ padding: '10px', width: '95%', margin: 'auto' }}
              />
            </Row>
            {showAddressLis && <ContainerTask onClick={() => { return handleMyLocation() }}>
              <IconGoogleFullColor color={PColor} size={30} />
              &nbsp;
              &nbsp;
              Usar mi ubicación
            </ContainerTask>}
            <BtnAddressContainer>
              <Google size={60} />
            </BtnAddressContainer>
            {data.length > 0 && value.length >= 4 && data.map((address, i) => {
              return (
                <BtnAddressContainer key={i} onClick={() => { return handleSelect(address) }}>
                  <IconLocationMap2 size={30} />
                  <Address>
                    <Text as='span' className='main_text--location'>{address?.structured_formatting?.main_text || null}</Text>
                    <span>{address?.structured_formatting?.secondary_text}</span>
                  </Address>
                </BtnAddressContainer>
              )
            })}
            {showAddressLis && dataLocation?.getUserLocations?.length > 0
              ? dataLocation?.getUserLocations.map(index => {
                const { cName } = index.city
                const { dName } = index.department
                const { cName: countryName } = index.pais
                return (
                  <ContainerTask
                    key={index.locationId}
                    onClick={() => { return handleSelectLocation(index) }}
                    selected={selected?.locationId === index.locationId}
                    show={show === index}
                  >
                    <OptionsFunction show={show === index}>
                      <Button onClick={() => { return HandleDeleteUserLocations(index) }}><IconDelete color={PColor} size={30} /></Button>
                    </OptionsFunction>
                    <ListTask show={show === index}>
                      <div>
                        <Text> {countryName}</Text>
                        <Text> {dName}</Text>
                        <Text> {cName}</Text>
                      </div>
                      <Text> {index.uLocationKnow}</Text>
                    </ListTask>
                    <div style={{ display: 'contents' }}><Button onClick={() => { return setShow(index === show ? false : index) }}><IconDost color={show === index ? PColor : '#CCC'} size={30} /></Button></div>
                  </ContainerTask>
                )
              })
              : null}

            <ContentButton>
              <RippleButton
                margin='auto'
                onClick={() => { return setModal(1) }}
                widthButton='100%'
              > Registra nueva ubicación</RippleButton>
            </ContentButton>
            <Text> ¿Ya tienes una dirección guardada?</Text>
            <Text> Entra en tu cuenta para seleccionar tus direcciones.</Text>
            <Text> Iniciar sesión o registrarse</Text>
          </div>
        </Container>}

        {modal === 1 &&
          <Form
            check={check}
            cities={cities}
            countries={countries}
            dataForm={dataForm}
            departments={departments}
            errorForm={errorForm}
            hableSearchLocation={hableSearchLocation}
            handleChange={handleChange}
            handleChangeSearch={handleChangeSearch}
            handleCheckChange={handleCheckChange}
            modal={modal}
            road={road}
            setModal={setModal}
            values={values}
          />
        }
        <ContainerMap modal={modal === 2}>
          <MapHeader>
            <button onClick={() => { return setModal(1) }} style={{ backgroundColor: 'transparent' }} >
              <IconArrowLeft color={PColor} size={20} />
            </button>
            <Span>{dataCountry && dataCountry?.getOneCountry?.cName} {dataDepartment && dataDepartment?.getOneDepartment?.dName} {dataGetOneCity && dataGetOneCity?.getOneCities?.cName}</Span><div></div>
          </MapHeader>
          {showCircle && <ContentAlert>Has seleccionado una ubicación lejos de la dirección que ingresaste.</ContentAlert>}
          <GoogleMap
            center={{
              lat,
              lng
            }}
            mapContainerStyle={mapContainerStyle}
            options={{
              fullscreenControl: false,
              mapTypeControl: false,
              rotateControl: false,
              scaleControl: false,
              streetViewControl: false,
              zoomControl: false,
              styles: mapStyle
            }}
            zoom={15}
          >
            <Circle
              center={{
                lat: newLat,
                lng: newLng
              }}
              draggable={false}
              options={{ fillColor: showCircle ? '#EE80AE33' : 'transparent', strokeColor: showCircle ? '#EE80AE66' : 'transparent' }}
              radius={1000}
              ref={circleRef}
            />
            <Marker
              draggable={true}
              icon={{
                url: './images/icon.png',
                anchor: new google.maps.Point(17, 46),
                scaledSize: new google.maps.Size(26, 42)
              }}
              onDragEnd={onMapDrag}
              position={{
                lat,
                lng
              }}
            >
            </Marker>
          </GoogleMap>
          {modal === 2 && <ContentButton>
            <RippleButton onClick={handleSave} style={{ width: '40%' }}>Confirmar</RippleButton>
          </ContentButton>}
        </ContainerMap>
      </AwesomeModal>
    </ContainerModal>
  )
}

MapStore.propTypes = {
  setShowModal: PropTypes.func,
  showModal: PropTypes.any
}

export const Map = React.memo(MapStore)

Map.propTypes = {
  setShowModal: PropTypes.func,
  hableSearchLocation: PropTypes.func,
  showModal: PropTypes.bool,
  modal: PropTypes.number

}
