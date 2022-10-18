import { useMutation } from '@apollo/client'
import { PUSH_RECOMMENDED } from 'gql/Recommendation'
import Image from 'next/image'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { PVColor, WColor } from '../../public/colors'
import { IconLoveFill, IconRate } from '../../public/icons'
import {
  Content,
  ItemWrapper,
  MerchantListWrapper
} from './styled'

export const ListRestaurant = ({
  data,
  catStoreId,
  like
}) => {
  const [showTiming, setShowTiming] = useState(null)
  const [pushOneRecommendation] = useMutation(PUSH_RECOMMENDED, {
    context: { clientName: 'main' }
  })
  function dateObj (d) {
    if (!d) return null
    const parts = d.split(/:|\s/)
    const date = new Date()
    if (parts.pop().toLowerCase() == 'pm') parts[0] = (+parts[0]) + 12
    date.setHours(+parts.shift())
    date.setMinutes(+parts.shift())
    return date
  }

  // eslint-disable-next-line
  const handleOpenStore = (schedule) => {
    if (schedule) {
      const currentSchedule = schedule.find((date) => { return date?.schDay && date?.schDay === showTiming })
      const { schHoSta, schHoEnd } = currentSchedule || {}
      const now2 = new Date()
      const startDate = dateObj(schHoSta)
      const endDate = dateObj(schHoEnd)
      const open = !!(now2 < endDate && now2 > startDate)
      return !!open
    }
  }
  const stores = data.map((store) => {
    const isOpen = handleOpenStore(store?.getStoreSchedules ?? [])
    return {
      isOpen,
      ...store
    }
  })
  useEffect(() => {
    const date = new Date()
    const currentDay = date.getDay()
    setShowTiming(currentDay)
  }, [])
  return (
    <Content>
      <MerchantListWrapper>
        {data && stores?.map(store => {
          let nameStore = store.storeName || store?.getOneStore?.storeName
          nameStore = nameStore?.replace(/\s/g, '-').toLocaleLowerCase()
          const city = like && store?.getOneStore?.city?.cName.toLocaleLowerCase()
          let suma = 0
          const avg = store?.getAllRatingStar?.map((store, index) => { return (suma += store.rScore) / (index + 1) })
          return (
            <div key={store.idStore || store.fIStoreId}>
              <Link
                href={catStoreId
                  ? {
                    pathname: `/delivery/${city || store?.city?.cName?.toLocaleLowerCase()}-${store?.department?.dName?.toLocaleLowerCase()}/${nameStore}/${store.idStore}`,
                    query: { categories: catStoreId }
                  }
                  : `/delivery/${encodeURIComponent(city || store?.city?.cName?.toLocaleLowerCase())}-${encodeURIComponent(store?.department?.dName || store?.getOneStore?.department?.dName?.toLocaleLowerCase())}/${encodeURIComponent(nameStore)}/${store?.idStore}`}
                passHref
                shallow
              >
                <a>
                  <ItemWrapper
                    isOpen={store.isOpen}
                    key={store.idStore}
                    onClick={() => { return pushOneRecommendation({ variables: { input: { id: '', carProId: !like ? store.catStore : store.getOneStore.catStore } } }) }}
                  >
                    <div>
                      <Image
                        alt='Picture of the author'
                        className='store_image'
                        height={100}
                        src={store?.Image || store?.getOneStore?.Image || '/images/b70f2f6c-8afc-4d75-bdeb-c515ab4b7bdd_BRITS_GER85.jpg'}
                        width={100}
                      />
                    </div>
                    <div>
                      <h2 className='Name'>{store?.getOneStore?.storeName || store.storeName}</h2>
                      {<span className='store_info'>{store?.cateStore?.cName || store.getOneStore?.cateStore?.cName}   {avg?.length > 0 && <><IconRate color={WColor} size={18} /> {avg[avg.length - 1]?.toFixed(1)}</>} </span>}
                      <div>
                        {!store.isOpen && <span className='store_info close'>Cerrado</span>}
                      </div>

                    </div>
                    {store.fState === 1 && <IconLoveFill color={PVColor} size={20} />}
                  </ItemWrapper>
                </a>
              </Link>
            </div>
          )
        })}
      </MerchantListWrapper>
    </Content>
  )
}


ListRestaurant.propTypes = {
  data: PropTypes.array,
  map: PropTypes.func,
  catStoreId: PropTypes.string,
  like: PropTypes.bool

}
