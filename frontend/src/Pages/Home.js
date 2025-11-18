import React from 'react'

import Header from '../component/Header'
import Collection from '../component/Collection'

import Icons from '../component/Icons'
import Subscribe from '../component/Subscribe'

function Home() {
  return (
    <div>
      
      <Header />
      <Collection title1="LATEST" title2="COLLECTION" limit={10}/>
      <Collection title1="BEST" title2="SELLER" limit={5} />
      
      <Icons />
      <Subscribe />
      
    </div>
  )
}

export default Home
