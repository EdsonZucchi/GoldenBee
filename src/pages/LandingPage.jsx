import { useState } from 'react'
import { Box } from '@mui/material'
import PublicNavbar from '../layout/PublicNavbar'
import Footer from '../layout/Footer'
import BrandDivider from '../components/common/BrandDivider'
import AuthDialog from '../components/AuthDialog'
import HeroSection from '../components/sections/HeroSection'
import NextTourSection from '../components/sections/NextTourSection'
import FeaturesSection from '../components/sections/FeaturesSection'
import HistorySection from '../components/sections/HistorySection'
import ReviewsSection from '../components/sections/ReviewsSection'
import CtaSection from '../components/sections/CtaSection'

/** Landing page pública (apresentação do GoldenBee). */
export default function LandingPage() {
  const [authOpen, setAuthOpen] = useState(false)
  const openAuth = () => setAuthOpen(true)
  const closeAuth = () => setAuthOpen(false)

  return (
    <Box sx={{ bgcolor: 'background.default', overflowX: 'hidden' }}>
      <PublicNavbar onLogin={openAuth} />
      <HeroSection />
      <BrandDivider />
      <NextTourSection />
      <BrandDivider />
      <FeaturesSection />
      <BrandDivider />
      <HistorySection />
      <BrandDivider />
      <ReviewsSection />
      <BrandDivider />
      <CtaSection onAccess={openAuth} />
      <Footer />

      <AuthDialog open={authOpen} onClose={closeAuth} />
    </Box>
  )
}
