import PropTypes from 'prop-types'
import Head from 'next/head'
import { CategoryStores } from 'container/categoryStores'
import { cookie } from 'utils'
import { withIronSessionSsr } from 'iron-session/next'
import { useGetCategorieStore } from 'hooks/useGetCategorieStore'

export default function HomeView ({ catStoreId }) {
  const [data] = useGetCategorieStore({ catStoreId })
  return (
    <div >
      <Head>
        <title>Delibery {data?.cName || ''} categorías  {data?.csDescription} </title>
        <meta content={data?.csDescription || ''} name='description' />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      <CategoryStores
        data={data || []}
      />
    </div>
  )
}

HomeView.propTypes = {
  catStoreId: PropTypes.any
}

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps ({ req, query: queryRouter }) {
  try {
    const { name } = queryRouter || {}
    return {
      props: {
        catStoreId: name[1] || ''
      }
    }
  } catch (error) {
    return {}
  }
},
cookie
)
