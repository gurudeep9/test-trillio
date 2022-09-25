import PropTypes from 'prop-types'
import React from 'react'
import InputHooks from '../InputHooks/InputHooks'
import { Container, Text } from './styled'
import NewSelect from '../NewSelectHooks/NewSelect'
import { RippleButton } from '../Ripple'

export const Form = ({
  errors,
  check,
  modal,
  values,
  handleChangeSearch,
  hableSearchLocation,
  departments,
  road,
  dataForm,
  setModal,
  countries,
  handleChange,
  handleCheckChange,
  cities,
  errorForm
}) => {
  return (
    <div>
      {<Container modal={modal === 1}>
        <div style={{ width: '90%', margin: '30px auto' }}>
          <NewSelect
            error={errors?.countryId}
            id='cId'
            name='countryId'
            onChange={handleChangeSearch}
            optionName='cName'
            options={countries}
            title='País'
            value={values?.countryId}
          />
          <NewSelect
            error={errors?.dId}
            id='dId'
            name='dId'
            onChange={handleChangeSearch}
            optionName='dName'
            options={departments}
            title='Departamento'
            value={values?.dId}
          />
          <NewSelect
            error={errors?.ctId}
            id='ctId'
            name='ctId'
            onChange={handleChangeSearch}
            optionName='cName'
            options={cities}
            title='Ciudad'
            value={values?.ctId}
          />
          <NewSelect
            error={errors?.rId}
            id='rId'
            name='rId'
            onChange={handleChangeSearch}
            optionName='rName'
            options={road}
            title='Tipo de via'
            value={values?.rId}
          />
          <div className='flex-center'>
            <InputHooks
              disabled={check}
              errors={errorForm?.piso}
              name='piso'
              numeric
              onChange={handleChange}
              range={{ min: 0, max: 4 }}
              required
              title='Numero interior de piso'
              value={dataForm?.piso}
            />
            <div>
              <input onChange={e => { return handleCheckChange(e) }} type='checkbox' />
            </div>
          </div>
          <InputHooks
            errors={errorForm?.uLocationKnow}
            name='uLocationKnow'
            onChange={handleChange}
            required
            title='Ingresa tu dirección como la conoces'
            value={dataForm?.uLocationKnow}
          />
          <div className='flex-center'>
            <RippleButton onClick={() => { return setModal(0) }} widthButton={'100%'}><Text>Volver</Text></RippleButton>
            <RippleButton
              disabled={!dataForm?.uLocationKnow}
              onClick={() => { return hableSearchLocation(2) }}
              widthButton={'100%'}
            ><Text>Search Address</Text></RippleButton>
          </div>
        </div>
      </Container>}
    </div>
  )
}

Form.propTypes = {
  check: PropTypes.any,
  cities: PropTypes.any,
  countries: PropTypes.any,
  dataForm: PropTypes.shape({
    piso: PropTypes.any,
    uLocationKnow: PropTypes.any
  }),
  departments: PropTypes.any,
  errorForm: PropTypes.shape({
    piso: PropTypes.any,
    uLocationKnow: PropTypes.any
  }),
  errors: PropTypes.shape({
    countryId: PropTypes.any,
    ctId: PropTypes.any,
    dId: PropTypes.any,
    rId: PropTypes.any
  }),
  hableSearchLocation: PropTypes.func,
  handleChange: PropTypes.any,
  handleChangeSearch: PropTypes.any,
  handleCheckChange: PropTypes.func,
  modal: PropTypes.number,
  road: PropTypes.any,
  setModal: PropTypes.func,
  values: PropTypes.shape({
    countryId: PropTypes.any,
    ctId: PropTypes.any,
    dId: PropTypes.any,
    rId: PropTypes.any
  })
}
