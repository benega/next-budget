import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Next Budget</title>
        <meta name="description" content="Next Budget App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto p-4 flex justify-center bg-white h-screen">
        <h1 className="text-2xl font-bold">Categories</h1>
        <div></div>
      </main>
    </div>
  )
}
