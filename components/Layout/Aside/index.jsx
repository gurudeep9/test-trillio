/* eslint-disable no-unused-expressions */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ActiveLink } from 'pkg-components'
import { Anchor, ButtonGlobalCreate, Card, ContainerAside, Info, LeftNav } from './styled'

const Aside = () => {
  const [show, setShow] = useState(false)

  return (
    <>
      <ContainerAside>
        <Card>
          <Info>
            <ButtonGlobalCreate onClick={() => { return setShow(!show) }}>
              Add new
            </ButtonGlobalCreate>
            <LeftNav show={false}>
              <Info>
                <h2>Customers</h2>
                <ActiveLink activeClassName='active' href='/sales-invoices'>
                  <Anchor>Invoices</Anchor>
                </ActiveLink>
                <ActiveLink activeClassName='active' href='/sales-invoices'>
                  <Anchor>Sales Invoice</Anchor>
                </ActiveLink>
              </Info>
              <Info>
                <h2>Supplier</h2>
                <ActiveLink activeClassName='active' href='/bills'>
                  <Anchor>Bills</Anchor>
                </ActiveLink>
                <ActiveLink activeClassName='active' href='/pay-bills'>
                  <Anchor>Pay Bills</Anchor>
                </ActiveLink>
                <ActiveLink activeClassName='active' href='/'>
                  <Anchor>Purchase Orders</Anchor>
                </ActiveLink>
                <ActiveLink activeClassName='active' href='/'>
                  <Anchor>Expenses</Anchor>
                </ActiveLink>
              </Info>
              <Info>
                <h2>Employees</h2>
                <ActiveLink activeClassName='active' href='/companies/dashboard'>
                  <Anchor>Admin</Anchor>
                </ActiveLink>
                <ActiveLink activeClassName='active' href='/'>
                  <Anchor>Home</Anchor>
                </ActiveLink>
              </Info>
            </LeftNav>
          </Info>
        </Card>
      </ContainerAside>
    </>
  )
}
export default React.memo(Aside, (prevProps, props) => {
  props.active !== prevProps.active
})

Aside.propTypes = {
  handleClickMenu: PropTypes.func,
  filter: PropTypes.func,
  dataForm: PropTypes.object,
  currentUser: PropTypes.object,
  onChange: PropTypes.func,
  allCompany: PropTypes.array,
  dataCompany: PropTypes.object,
  active: PropTypes.bool,
  handleMenu: PropTypes.func
}
