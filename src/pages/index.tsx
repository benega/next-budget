import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Next Budget</title>
        <meta name="description" content="Next Budget App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="mb-4 text-2xl font-bold">Home</h1>
    </div>
  )
}
