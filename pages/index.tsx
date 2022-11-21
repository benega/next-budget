import Head from 'next/head'
import { v4 as uuidv4 } from 'uuid'

type Category = {
  id: string
  name: string
}

const categories: Category[] = [
  { id: uuidv4(), name: 'Home' },
  { id: uuidv4(), name: 'Car' },
  { id: uuidv4(), name: 'Food' },
  { id: uuidv4(), name: 'Personal' },
  { id: uuidv4(), name: 'Subscriptions' },
  { id: uuidv4(), name: 'Charity' },
  { id: uuidv4(), name: 'Gifts' },
  { id: uuidv4(), name: 'Others' },
]
export default function Home() {
  return (
    <div>
      <Head>
        <title>Next Budget</title>
        <meta name="description" content="Next Budget App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto p-4 flex flex-col items-center bg-blue-50 h-screen">
        <h1 className="text-2xl font-bold mb-4">Categories</h1>

        <div className="overflow-x-auto self-start bg-slate-100 w-full text-left">
          <table className="w-full">
            <thead className="text-sm uppercase bg-gray-50">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2 w-[200px]">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {categories.map(c => (
                <tr key={c.id} className="border-b border-gray-200">
                  <td className="p-2">{c.name}</td>
                  <td className="p-2"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
