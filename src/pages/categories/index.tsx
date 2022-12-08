import { CategoriesTable, CategoryForm } from '../../client/features/category'

export default function Categories() {
  return (
    <main className="container mx-auto p-4 flex flex-col items-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <CategoryForm />
      <CategoriesTable />
    </main>
  )
}
