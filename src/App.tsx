import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from '@/context/AppContext'
import { Layout } from '@/components/layout/Layout'
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/pages/LoginPage'
import { HomePage } from '@/pages/HomePage'
import { DestinationsPage } from '@/pages/DestinationsPage'
import { DestinationHubPage } from '@/pages/DestinationHubPage'
import { TripPlannerPage } from '@/pages/TripPlannerPage'
import { ChallengesPage } from '@/pages/ChallengesPage'
import { ChallengeDetailPage } from '@/pages/ChallengeDetailPage'
import { EvidencePage } from '@/pages/EvidencePage'
import { ReportPage } from '@/pages/ReportPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { ImpactPage } from '@/pages/ImpactPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { SocialPage } from '@/pages/SocialPage'
import { CreatorsPage } from '@/pages/CreatorsPage'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/destinations/:id" element={<DestinationHubPage />} />
            <Route path="/trip-planner" element={<TripPlannerPage />} />
            <Route path="/challenges" element={<ChallengesPage />} />
            <Route path="/challenges/:id" element={<ChallengeDetailPage />} />
            <Route path="/challenges/:id/evidence" element={<EvidencePage />} />
            <Route path="/reports/new" element={<ReportPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/impact" element={<ImpactPage />} />
            <Route path="/social" element={<SocialPage />} />
            <Route path="/creators" element={<CreatorsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
