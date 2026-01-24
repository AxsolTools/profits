'use client'

import { CreateTransactionForm } from '@/components/create-transaction-form'

export default function CreateTransactionPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-gray-900 font-[family-name:var(--font-montserrat)] tracking-tight">
          New Escrow
        </h1>
        <p className="text-gray-500 mt-3 text-lg">Create a secure, non-custodial contract in seconds.</p>
      </div>

      <CreateTransactionForm />
    </div>
  )
}
