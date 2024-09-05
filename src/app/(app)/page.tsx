import Link from 'next/link'
import React from 'react'
import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

const Page = async () => {
  const payload = await getPayloadHMR({
    config,
  })

  const data = await payload.find({
    collection: 'users',
    depth: 1,
  })
  return (
    <>
      <main>
        <h1>Users</h1>
        <ul className='prose'>
          {data.docs.map((user) => (
            <li key={user.id}>
              <Link href={`/users/${user.id}`}>
                {user.email}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default Page