import React, { createContext, useContext, useState, type ReactNode } from 'react'
import type {
  Destination,
  Challenge,
  ChallengeCompletion,
  Business,
  Report,
  AIInsight,
  User,
  TripPlan,
  Notification,
} from '@/types'
import {
  destinations as mockDestinations,
  challenges as mockChallenges,
  businesses as mockBusinesses,
  reports as mockReports,
  aiInsights as mockInsights,
  currentUser as mockUser,
} from '@/data/mock-data'
import { generateId } from '@/lib/utils'

interface AppState {
  user: User
  destinations: Destination[]
  challenges: Challenge[]
  businesses: Business[]
  reports: Report[]
  aiInsights: AIInsight[]
  completions: ChallengeCompletion[]
  tripPlan: TripPlan | null
  notifications: Notification[]
  selectedDestination: Destination | null
  // Actions
  setSelectedDestination: (d: Destination | null) => void
  startChallenge: (challengeId: string) => void
  completeChallenge: (challengeId: string, evidence?: any) => void
  submitReport: (report: Omit<Report, 'id' | 'createdAt' | 'status'>) => void
  generateTripPlan: (destinationId: string, preferences: any) => void
  addNotification: (n: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void
  markNotificationRead: (id: string) => void
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(mockUser)
  const [destinations] = useState<Destination[]>(mockDestinations)
  const [challenges] = useState<Challenge[]>(mockChallenges)
  const [businesses] = useState<Business[]>(mockBusinesses)
  const [reports, setReports] = useState<Report[]>(mockReports)
  const [aiInsights] = useState<AIInsight[]>(mockInsights)
  const [completions, setCompletions] = useState<ChallengeCompletion[]>([])
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)

  const startChallenge = (challengeId: string) => {
    const newCompletion: ChallengeCompletion = {
      id: generateId(),
      userId: user.id,
      challengeId,
      status: 'in_progress',
      startedAt: new Date().toISOString(),
      pointsAwarded: 0,
    }
    setCompletions((prev) => [...prev, newCompletion])
    addNotification({
      type: 'challenge',
      title: 'Challenge Started',
      body: 'Good luck! Complete the challenge and submit your evidence.',
    })
  }

  const completeChallenge = (challengeId: string, evidence?: any) => {
    const challenge = challenges.find((c) => c.id === challengeId)
    if (!challenge) return

    setCompletions((prev) =>
      prev.map((c) =>
        c.challengeId === challengeId && c.status === 'in_progress'
          ? {
              ...c,
              status: 'completed' as const,
              completedAt: new Date().toISOString(),
              pointsAwarded: challenge.points,
              evidence,
            }
          : c
      )
    )

    setUser((prev) => ({
      ...prev,
      impactPoints: prev.impactPoints + challenge.points,
      challengesCompleted: prev.challengesCompleted + 1,
    }))

    addNotification({
      type: 'challenge',
      title: 'Challenge Completed! 🎉',
      body: `You earned ${challenge.points} impact points for "${challenge.title}"!`,
    })
  }

  const submitReport = (reportData: Omit<Report, 'id' | 'createdAt' | 'status'>) => {
    const newReport: Report = {
      ...reportData,
      id: `rpt-${generateId()}`,
      status: 'submitted',
      createdAt: new Date().toISOString(),
    }
    setReports((prev) => [newReport, ...prev])
    addNotification({
      type: 'report',
      title: 'Report Submitted',
      body: 'Thank you for helping improve the destination. Your report is being reviewed.',
    })
  }

  const generateTripPlan = (destinationId: string, _preferences: any) => {
    const dest = destinations.find((d) => d.id === destinationId)
    const destChallenges = challenges.filter((c) => c.destinationId === destinationId)
    const destBusinesses = businesses.filter((b) => b.destinationId === destinationId)

    const plan: TripPlan = {
      id: generateId(),
      destinationId,
      totalEstimatedCost: 2500,
      totalTravelTime: '4.5 hours',
      sustainabilityScore: 85,
      days: [
        {
          day: 1,
          activities: [
            {
              time: '09:00',
              attractionId: '',
              name: `Arrive at ${dest?.name || 'Destination'}`,
              type: 'transport',
              sustainabilityImpact: 'Using public/shared transport reduces CO₂ by ~60%',
              accessibility: 'Available via main road',
              crowdLevel: 'Low',
              estimatedCost: 200,
              travelTime: '2 hours',
              whyRecommended: 'Morning arrival avoids peak crowd hours',
            },
            {
              time: '11:00',
              attractionId: destChallenges[0]?.id || '',
              name: destBusinesses[0]?.name || 'Local Breakfast Spot',
              type: 'food',
              sustainabilityImpact: 'Supporting local business keeps revenue in community',
              accessibility: destBusinesses[0]?.accessibilitySummary || 'Ground floor accessible',
              crowdLevel: 'Low',
              estimatedCost: 300,
              travelTime: '10 min walk',
              whyRecommended: 'Locally-owned with strong sustainability practices',
            },
            {
              time: '13:00',
              attractionId: '',
              name: 'Responsible Trail Walk',
              type: 'activity',
              sustainabilityImpact: 'Low-impact activity with conservation benefit',
              accessibility: 'Trail is moderately accessible',
              crowdLevel: 'Medium',
              estimatedCost: 0,
              travelTime: '15 min walk',
              whyRecommended: 'Alternative to overcrowded viewpoints — 40% less crowd pressure',
            },
            {
              time: '16:00',
              attractionId: '',
              name: 'Local Community Experience',
              type: 'experience',
              sustainabilityImpact: 'Directly supports local artisans and community',
              accessibility: 'Indoor venue, accessible',
              crowdLevel: 'Low',
              estimatedCost: 500,
              travelTime: '20 min walk',
              whyRecommended: 'Unique cultural experience away from tourist crowds',
            },
            {
              time: '18:00',
              attractionId: '',
              name: 'Return Journey',
              type: 'transport',
              sustainabilityImpact: 'Shared transport reduces per-person emissions',
              accessibility: 'Main road accessible',
              crowdLevel: 'Low',
              estimatedCost: 200,
              travelTime: '2 hours',
              whyRecommended: 'Evening return avoids traffic and reduces transport impact',
            },
          ],
        },
      ],
    }
    setTripPlan(plan)
    addNotification({
      type: 'system',
      title: 'Trip Plan Ready',
      body: `Your sustainable trip plan for ${dest?.name || 'destination'} is ready!`,
    })
  }

  const addNotification = (n: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    const notification: Notification = {
      ...n,
      id: generateId(),
      createdAt: new Date().toISOString(),
      read: false,
    }
    setNotifications((prev) => [notification, ...prev])
  }

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  return (
    <AppContext.Provider
      value={{
        user,
        destinations,
        challenges,
        businesses,
        reports,
        aiInsights,
        completions,
        tripPlan,
        notifications,
        selectedDestination,
        setSelectedDestination,
        startChallenge,
        completeChallenge,
        submitReport,
        generateTripPlan,
        addNotification,
        markNotificationRead,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
