import Head from 'next/head'
import React from 'react'
import { CategoriesTable } from '../../client/features/category/categories-table'
import { CategoryForm } from '../../client/features/category/category-form'

export default function Categories() {
  return (
    <React.Suspense fallback={<div>test</div>}>
      <div>
        <Head>
          <title>Next Budget</title>
          <meta name="description" content="Next Budget App" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="container mx-auto p-4 flex flex-col items-center bg-blue-50 h-screen">
          <h1 className="text-2xl font-bold mb-4">Categories</h1>
          <CategoryForm />
          <CategoriesTable />
        </main>
      </div>
    </React.Suspense>
  )
}
