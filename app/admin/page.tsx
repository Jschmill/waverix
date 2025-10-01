'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, User, Building, Target, MessageSquare, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Contact {
  id: string
  firstName: string
  lastName: string
  businessEmail: string
  phoneNumber?: string
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
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const router = useRouter()

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const authToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('admin-auth='))
        ?.split('=')[1]
      
      if (authToken === 'waverix-admin-authenticated-token-2024') {
        setIsAuthenticated(true)
      } else {
        router.push('/admin/login')
        return
      }
      setAuthChecked(true)
    }
    
    checkAuth()
  }, [router])

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

  const handleLogout = () => {
    document.cookie = 'admin-auth=; path=/; max-age=0'
    router.push('/admin/login')
  }

  const toggleRowExpansion = (contactId: string) => {
    const newExpandedRows = new Set(expandedRows)
    if (newExpandedRows.has(contactId)) {
      newExpandedRows.delete(contactId)
    } else {
      newExpandedRows.add(contactId)
    }
    setExpandedRows(newExpandedRows)
  }

  useEffect(() => {
    fetchData()
  }, [selectedStatus, selectedSource, fetchData])

  if (!authChecked || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">
          {!authChecked ? 'Checking authentication...' : 'Redirecting to login...'}
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-8 px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-slate-400">Manage your leads and subscriptions</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
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
                    <th className="text-left p-4 text-slate-300">Details</th>
                    <th className="text-left p-4 text-slate-300">Contact</th>
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
                    <React.Fragment key={contact.id}>
                      <motion.tr
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-t border-slate-700 hover:bg-slate-750"
                      >
                        <td className="p-4">
                          <button
                            onClick={() => toggleRowExpansion(contact.id)}
                            className="flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors"
                          >
                            {expandedRows.has(contact.id) ? 
                              <ChevronUp className="h-4 w-4" /> : 
                              <ChevronDown className="h-4 w-4" />
                            }
                            Details
                          </button>
                        </td>
                        <td className="p-4">
                          <div className="text-white">{contact.firstName} {contact.lastName}</div>
                          <div className="text-sm text-slate-400">{contact.businessEmail}</div>
                        </td>
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
                      
                      {/* Expanded Details Row */}
                      {expandedRows.has(contact.id) && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-slate-750 border-t border-slate-600"
                        >
                          <td colSpan={9} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {/* Personal Information */}
                              <div className="bg-slate-800 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-3">
                                  <User className="h-5 w-5 text-purple-400" />
                                  <h4 className="font-semibold text-white">Personal Information</h4>
                                </div>
                                <div className="space-y-2">
                                  <div>
                                    <span className="text-slate-400 text-sm">Full Name:</span>
                                    <p className="text-white">{contact.firstName} {contact.lastName}</p>
                                  </div>
                                  <div>
                                    <span className="text-slate-400 text-sm">Email:</span>
                                    <p className="text-white">{contact.businessEmail}</p>
                                  </div>
                                  <div>
                                    <span className="text-slate-400 text-sm">Phone:</span>
                                    <p className="text-white">{contact.phoneNumber || 'Not provided'}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Company Information */}
                              <div className="bg-slate-800 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-3">
                                  <Building className="h-5 w-5 text-blue-400" />
                                  <h4 className="font-semibold text-white">Company Details</h4>
                                </div>
                                <div className="space-y-2">
                                  <div>
                                    <span className="text-slate-400 text-sm">Company:</span>
                                    <p className="text-white">{contact.companyName}</p>
                                  </div>
                                  <div>
                                    <span className="text-slate-400 text-sm">Industry:</span>
                                    <p className="text-white">{contact.industry}</p>
                                  </div>
                                  <div>
                                    <span className="text-slate-400 text-sm">Company Size:</span>
                                    <p className="text-white">{contact.companySize}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Project Information */}
                              <div className="bg-slate-800 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-3">
                                  <Target className="h-5 w-5 text-green-400" />
                                  <h4 className="font-semibold text-white">Project Details</h4>
                                </div>
                                <div className="space-y-2">
                                  <div>
                                    <span className="text-slate-400 text-sm">Services:</span>
                                    <p className="text-white">{contact.interestedServices}</p>
                                  </div>
                                  <div>
                                    <span className="text-slate-400 text-sm">Budget:</span>
                                    <p className="text-white">{contact.budget}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Challenges & Additional Info */}
                              <div className="bg-slate-800 rounded-lg p-4 md:col-span-2 lg:col-span-3">
                                <div className="flex items-center gap-2 mb-3">
                                  <MessageSquare className="h-5 w-5 text-orange-400" />
                                  <h4 className="font-semibold text-white">Additional Information</h4>
                                </div>
                                <div className="space-y-3">
                                  <div>
                                    <span className="text-slate-400 text-sm">Current Challenges:</span>
                                    <p className="text-white mt-1">{contact.currentChallenges}</p>
                                  </div>
                                  {contact.additionalInfo && (
                                    <div>
                                      <span className="text-slate-400 text-sm">Additional Notes:</span>
                                      <p className="text-white mt-1">{contact.additionalInfo}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </React.Fragment>
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