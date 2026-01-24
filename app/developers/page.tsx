'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function DevelopersPage() {
  const [keys, setKeys] = useState([
    { id: 'pk_live_...', name: 'Production Key', created: '2 days ago', status: 'active' }
  ])

  const logs = [
    { id: 'req_992', method: 'POST', path: '/v1/escrow', status: 200, time: '200ms' },
    { id: 'req_991', method: 'GET', path: '/v1/escrow/esc_821', status: 200, time: '150ms' },
    { id: 'req_990', method: 'POST', path: '/v1/webhook/test', status: 400, time: '80ms' },
  ]

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-8 relative">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-black text-gray-900 font-mono tracking-tight">
              Developer Console
            </h1>
            <span className="bg-yellow-100 text-yellow-700 border border-yellow-200 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">Coming Soon</span>
          </div>
          <p className="text-gray-600 text-lg">Manage your API integration and webhooks.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="h-12 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-900 transition-all font-bold">
            View Documentation
          </Button>
          <Button className="h-12 px-6 bg-[var(--proof-primary)] text-white font-bold hover:bg-[var(--proof-primary-hover)] shadow-lg shadow-blue-500/20">
            Create New Key
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 opacity-60 pointer-events-none select-none relative">
        {/* Coming Soon Overlay */}
        <div className="absolute inset-0 z-50 flex items-center justify-center">
           <div className="bg-white/80 border border-white/50 p-8 rounded-2xl text-center shadow-2xl backdrop-blur-md ring-1 ring-gray-200/50">
             <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[var(--proof-primary)]">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
             </div>
             <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise API Access</h3>
             <p className="text-gray-600 max-w-sm mb-6">We are currently onboarding select partners. Join the waitlist to get early access to our developer tools.</p>
             <Button className="bg-[var(--proof-primary)] hover:bg-[var(--proof-primary-hover)] text-white font-bold px-8 pointer-events-auto cursor-pointer shadow-lg shadow-blue-500/20">
               Join Waitlist
             </Button>
           </div>
        </div>

        {/* API Keys */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">API Keys</h2>
            </div>
            <div className="p-6">
              {keys.map((key) => (
                <div key={key.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 group hover:border-gray-300 transition-colors shadow-sm">
                  <div className="space-y-1">
                    <p className="font-bold text-gray-900">{key.name}</p>
                    <p className="font-mono text-sm text-gray-500">{key.id}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-green-600 uppercase tracking-wider bg-green-50 border border-green-100 px-2 py-1 rounded">
                      {key.status}
                    </span>
                    <Button variant="ghost" className="text-gray-400 hover:text-red-600 hover:bg-red-50">
                      Revoke
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Webhooks</h2>
              <Button size="sm" variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50 font-bold">Add Endpoint</Button>
            </div>
            <div className="p-6 text-center text-gray-500 py-12">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <p className="font-medium">No webhook endpoints configured.</p>
            </div>
          </section>
        </div>

        {/* Live Logs - Clean Light Terminal */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[600px]">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
            <h3 className="font-mono text-sm font-bold text-gray-900">Request Logs</h3>
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Live</span>
            </div>
          </div>
          <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-2 bg-gray-50/30">
            {logs.map((log) => (
              <div key={log.id} className="flex gap-3 text-gray-600 hover:bg-white p-3 rounded border border-transparent hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer">
                <span className={`font-bold ${log.status === 200 ? 'text-green-600' : 'text-red-600'}`}>
                  {log.status}
                </span>
                <span className="text-blue-600 font-bold w-12">{log.method}</span>
                <span className="flex-1 truncate text-gray-900 font-medium">{log.path}</span>
                <span className="text-gray-400">{log.time}</span>
              </div>
            ))}
            <div className="text-gray-400 italic opacity-70 p-4 text-center">Waiting for requests...</div>
          </div>
        </div>
      </div>
    </div>
  )
}
