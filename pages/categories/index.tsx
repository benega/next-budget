import Head from 'next/head'
import { v4 as uuidv4 } from 'uuid'
import {
  CategoriesTable,
  Category,
} from '../../client/features/category/categories-table'
import { CategoryForm } from '../../client/features/category/category-form'

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

export default function Categories() {
  return (
    <div>
      <Head>
        <title>Next Budget</title>
        <meta name="description" content="Next Budget App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto p-4 flex flex-col items-center bg-blue-50 h-screen">
        <h1 className="text-2xl font-bold mb-4">Categories</h1>
        <CategoryForm />
        <CategoriesTable categories={categories} />
      </main>
    </div>
  )
}
