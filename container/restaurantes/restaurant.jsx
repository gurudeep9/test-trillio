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

  // eslint-disable-next-line
  const handleOpenStore = (schedule) => {
    if (schedule) {
      const currentSchedule = schedule.find((date) => { return date?.schDay && date?.schDay === showTiming })
      const { schHoSta, schHoEnd } = currentSchedule || {}
      // https://codereview.stackexchange.com/questions/268899/find-when-the-shop-will-next-open-or-close
      const openings = {
        openingMon: `${schHoSta} - ${schHoEnd}`,
        openingTue: `${schHoSta} - ${schHoEnd}`,
        openingWed: `${schHoSta} - ${schHoEnd}`,
        openingThu: `${schHoSta} - ${schHoEnd}`,
        openingFri: `${schHoSta} - ${schHoEnd}`,
        openingSat: `${schHoSta} - ${schHoEnd}`,
        openingSun: `${schHoSta} - ${schHoEnd}`
      }
      const timeToInt = function (text) {
        const hour = parseInt(text.substring(0, 2))
        const minute = parseInt(text.substring(3))
        return hour * 60 + minute
      }
      const date = new Date()
      const currentTime = date.getHours() * 60 + date.getMinutes()
      const startDay = date.getDay()
      let dayOfWeek = startDay
      const weekDayLookup = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      let nextTime = false
      for (; ;) {
        const dayName = weekDayLookup[dayOfWeek % 7]
        const opening = openings && openings['opening' + dayName.substring(0, 3)]
        const timeSpans = opening?.split(';').map(item => { return item.trim() })
        for (const span of timeSpans) {
          const hours = span.split('-').map(item => { return item.trim() })
          if (!nextTime) {
            const openTime = timeToInt(hours[0])
            const closeTime = timeToInt(hours[1])
            if (currentTime >= openTime && currentTime <= closeTime) { return true }
            nextTime = true
          } else {
            return false
          }
        }
        dayOfWeek++
        if (dayOfWeek > 14 || !schHoSta || !schHoEnd) { return false }
      }
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
          // eslint-disable-next-line
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
