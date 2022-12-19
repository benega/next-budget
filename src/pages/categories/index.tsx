import { CategoriesTable, CategoryFormModal } from 'src/features'

export default function Categories() {
  return (
    <main className="container flex flex-col items-center h-screen p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Categories</h1>
      <CategoryFormModal />
      <CategoriesTable />
    </main>
  )
}
