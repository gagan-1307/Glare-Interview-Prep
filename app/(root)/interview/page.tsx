import React from 'react'
import Agent from '@/components/Agent'

const Page = () => {
  return (
    <div>
      <h3>Interview Generation</h3>
      <Agent username='you' userId='user1' type='generate' />
    </div>
  )
}

export default Page