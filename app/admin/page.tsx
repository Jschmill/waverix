'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

interface Contact {
  id: string
  firstName: string
  lastName: string
  businessEmail: string
  companyName: string
  industry: string
  companySize: string
  currentChallenges: string
  interestedServices: string
  projectTimeline: string
  budget: string
  additionalInfo?: string
  source: string
  status: string
  createdAt: string
  emailSent: boolean
}

interface AdminData {
  contacts: Contact[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
  stats: {
    total: number
    new: number
    contactForm: number
    getStarted: number
  }
}

export default function AdminPage() {
  const [data, setData] = useState<AdminData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const [selectedSource, setSelectedSource] = useState<string>('')

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedStatus) params.append('status', selectedStatus)
      if (selectedSource) params.append('source', selectedSource)
      
      const response = await fetch(`/api/admin/contacts?${params}`)
      const result = await response.json()
      
      if (result.success) {
        setData(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch admin data:', error)
    } finally {
      setLoading(false)
    }
  }, [selectedStatus, selectedSource])

  const updateContactStatus = async (id: string, status: string) => {
    try {
      const response = await fetch('/api/admin/contacts', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      })

      if (response.ok) {
        fetchData() // Refresh data
      }
    } catch (error) {
      console.error('Failed to update contact status:', error)
    }
  }

  const markEmailSent = async (id: string) => {
    try {
      const response = await fetch('/api/admin/contacts', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, emailSent: true }),
      })

      if (response.ok) {
        fetchData() // Refresh data
      }
    } catch (error) {
      console.error('Failed to mark email as sent:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [selectedStatus, selectedSource, fetchData])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-slate-400">Manage your leads and subscriptions</p>
        </motion.div>

        {/* Stats */}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Total Contacts</h3>
              <p className="text-3xl font-bold text-purple-400">{data.stats.total}</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">New Leads</h3>
              <p className="text-3xl font-bold text-green-400">{data.stats.new}</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Contact Form</h3>
              <p className="text-3xl font-bold text-blue-400">{data.stats.contactForm}</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Get Started</h3>
              <p className="text-3xl font-bold text-orange-400">{data.stats.getStarted}</p>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-slate-800 rounded-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-slate-700 text-white rounded-lg px-3 py-2 border border-slate-600"
              >
                <option value="">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Source</label>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="bg-slate-700 text-white rounded-lg px-3 py-2 border border-slate-600"
              >
                <option value="">All Sources</option>
                <option value="contact_form">Contact Form</option>
                <option value="get_started">Get Started Modal</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contacts Table */}
        {data && data.contacts.length > 0 ? (
          <div className="bg-slate-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="text-left p-4 text-slate-300">Name</th>
                    <th className="text-left p-4 text-slate-300">Email</th>
                    <th className="text-left p-4 text-slate-300">Company</th>
                    <th className="text-left p-4 text-slate-300">Services</th>
                    <th className="text-left p-4 text-slate-300">Budget</th>
                    <th className="text-left p-4 text-slate-300">Source</th>
                    <th className="text-left p-4 text-slate-300">Status</th>
                    <th className="text-left p-4 text-slate-300">Date</th>
                    <th className="text-left p-4 text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.contacts.map((contact, index) => (
                    <motion.tr
                      key={contact.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-t border-slate-700 hover:bg-slate-750"
                    >
                      <td className="p-4 text-white">
                        {contact.firstName} {contact.lastName}
                      </td>
                      <td className="p-4 text-slate-300">{contact.businessEmail}</td>
                      <td className="p-4 text-slate-300">
                        <div>
                          <div>{contact.companyName}</div>
                          <div className="text-sm text-slate-400">{contact.industry}</div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-300">{contact.interestedServices}</td>
                      <td className="p-4 text-slate-300">{contact.budget}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          contact.source === 'contact_form' 
                            ? 'bg-blue-500/20 text-blue-300' 
                            : 'bg-orange-500/20 text-orange-300'
                        }`}>
                          {contact.source === 'contact_form' ? 'Contact' : 'Get Started'}
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          value={contact.status}
                          onChange={(e) => updateContactStatus(contact.id, e.target.value)}
                          className={`px-2 py-1 rounded-full text-xs border-none ${
                            contact.status === 'new' ? 'bg-green-500/20 text-green-300' :
                            contact.status === 'contacted' ? 'bg-yellow-500/20 text-yellow-300' :
                            contact.status === 'qualified' ? 'bg-blue-500/20 text-blue-300' :
                            'bg-gray-500/20 text-gray-300'
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="qualified">Qualified</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="p-4 text-slate-300">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => markEmailSent(contact.id)}
                          disabled={contact.emailSent}
                          className={`px-3 py-1 rounded text-xs ${
                            contact.emailSent
                              ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                              : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30'
                          }`}
                        >
                          {contact.emailSent ? 'Email Sent' : 'Mark Email Sent'}
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800 rounded-lg p-8 text-center">
            <p className="text-slate-400">No contacts found</p>
          </div>
        )}
      </div>
    </div>
  )
}