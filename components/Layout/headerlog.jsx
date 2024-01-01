import PropTypes from 'prop-types'
import React, { useContext, useEffect } from 'react'
import {
  useScrollY,
  useFormTools,
  useGetAllLocationUser,
  useGetOneCountry,
  useGetOneDepartment,
  useCountries,
  useDepartments,
  useSaveLocation,
  useRoads,
  useCities,
  useGetOneCity,
  usePosition
} from 'npm-pkg-hook'
import { InputSearch } from 'container/InputSearch'
import styled from 'styled-components'
import { IconLocationMap, IconLogo } from '../../public/icons'
import { PColor } from '../../public/colors'
import { Options } from './options'
import { Context } from '../../context'
import { ActiveLink, Map } from 'pkg-components'
import { filterKeyObject } from 'utils'
import { useRouter } from 'next/router'

export const HeaderMain = ({
  watch,
  settings,
  menu,
  handleMenu = () => { }
}) => {
  const {
    modalLocation,
    setModalLocation,
    setLocationString,
    setAlertBox,
    locationStr
  } = useContext(Context)
  const dataLocation = usePosition(watch, settings)
  const router = useRouter()
  const { latitude, longitude } = dataLocation || {}

  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
  const { data: dataCountries } = useCountries()
  const [getDepartments, { data: departments }] = useDepartments()
  const { data: dataRoad } = useRoads()
  const [getCities, { data: dataCities }] = useCities()
  const [updateUserLocations] = useSaveLocation()

  const [data] = useGetAllLocationUser()
  const { getOneCountry, dataCountry } = useGetOneCountry()
  const { getOneDepartment, dataDepartment } = useGetOneDepartment()
  const { getOneCities, dataGetOneCity } = useGetOneCity()
  const { offsetY } = useScrollY()

  useEffect(() => {
    const location = localStorage.getItem('location.data')
    setLocationString(JSON.parse(location))
  }, [setLocationString])

  const { department, pais, uLocationKnow, city } = locationStr || {}
  const handleLogout = () => {
    localStorage.removeItem('session')
    localStorage.removeItem('location.data')
    router.push('/entrar')
  }
  return (
    <div>
      <ContentHeader>
        <HeaderMainC>
          <ItemHeader style={{ transform: `translateX(${offsetY * 0.8}px)` }} >
            <ActiveLink href='/restaurantes'>
              <a>
                <IconLogo color={PColor} size='80px' />
              </a>
            </ActiveLink>
          </ItemHeader>
          <ItemHeader width='70%'>
            <InputSearch />
          </ItemHeader>
          <ItemHeader>
            <div className='delivery-location' onClick={() => { return setModalLocation(!modalLocation) }}>
              <div className='delivery-location__content'>
                <IconLocationMap color={PColor} size={20} />
                <div className='delivery__address'>
                  {uLocationKnow || (pais ? `${pais?.cName} ${department?.dName} ${city?.cName}` : null)}
                </div>
              </div>
              <span className='sub-location'>{pais && `${pais?.cName} ${department?.dName} ${city?.cName}`}</span>
            </div>
          </ItemHeader>
          <Options handleMenu={handleMenu} menu={menu} />
        </HeaderMainC>
      </ContentHeader>
      {Boolean(modalLocation) &&
      <Map
        cities={dataCities}
        countries={dataCountries}
        dataCountry={dataCountry}
        dataDepartment={dataDepartment}
        dataForm={dataForm}
        dataGetOneCity={dataGetOneCity}
        dataLocation={data}
        departments={departments}
        errorForm={errorForm}
        filterKeyObject={filterKeyObject}
        getCities={getCities}
        getDepartments={getDepartments}
        getOneCities={getOneCities}
        getOneCountry={getOneCountry}
        getOneDepartment={getOneDepartment}
        handleChange={handleChange}
        handleLogout={handleLogout}
        handleSubmit={handleSubmit}
        latitude={latitude}
        longitude={longitude}
        road={dataRoad?.road || []}
        setAlertBox={setAlertBox}
        setDataValue={setDataValue}
        setLocationString={setLocationString}
        setShowModal={setModalLocation}
        showModal={modalLocation}
        updateUserLocations={updateUserLocations}
        useFormTools={useFormTools}
      />
      }
    </div>
  )
}

HeaderMain.propTypes = {
  handleMenu: PropTypes.any,
  menu: PropTypes.any,
  settings: PropTypes.any,
  watch: PropTypes.any
}
export const ContentHeader = styled.div`
  width: 100%;
  box-shadow: inset 0 -1px 0 #dcdcdc;
  grid-area: head;
  justify-content: center;
  display: flex;
  height: fit-content;
  align-items: center;
  align-self: center;
  background-color: ${({ scrollNav }) => { return (scrollNav ? 'none' : 'transparent') }};
`
export const ContentInputSearch = styled.div`
  display: flex;
  padding: 15px;
  border: 1px solid #dcdcdc;
  && > input {
    color: ${PColor};
    margin-left: 10px;
    outline: none;
    border: none;
  }
 `
export const ItemHeader = styled.div`
  justify-content: center;
  display: flex;
  height: fit-content;
  align-items: center;
  align-self: center;
   @media only screen and (max-width: 960px){
    width: ${({ width }) => { return width || '30%' }};
    display: ${({ display }) => { return display }};
    }
    
`
export const HeaderMainC = styled.header`
    width: 100%;
    display: flex;
    height: 80px;
    font-family: SulSans,Helvetica,sans-serif;
    font-size: 16px;
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    width: 100%;
    max-width: 1366px;
    .delivery-location {
    font-family: PFont-Light;
    font-size: 100%;
    line-height: 1.15;
    width: 80%;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    display: flex;
    align-items: center;
    align-self: center;
    .delivery-location__content {
      display: flex;
      flex-direction: row;
    }
    @media(max-width: 768px){
      display: none;
    }
      & button {
        background-color: transparent;
      }
      .sub-location {
        font-family: PFont-Light;
        font-size: 10px;
      }
      .delivery__address {
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        -webkit-line-clamp: 1;
      }
    }
    `
