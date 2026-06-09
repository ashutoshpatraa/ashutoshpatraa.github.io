import { useMemo } from 'react'

export type PerformanceTier = 'high' | 'medium' | 'low'

export function usePerformanceTier(): {
  tier: PerformanceTier
  isMobile: boolean
  canUse3D: boolean
  particleCount: number
} {
  return useMemo(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const hasLowMemory = 'deviceMemory' in navigator && (navigator as Navigator & { deviceMemory?: number }).deviceMemory !== undefined && ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4) < 4
    const hasLowCPU = 'hardwareConcurrency' in navigator && navigator.hardwareConcurrency < 4
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let tier: PerformanceTier = 'high'
    if (isMobile || isTouch || prefersReduced) {
      tier = 'low'
    } else if (hasLowMemory || hasLowCPU) {
      tier = 'medium'
    }

    const particleCount = tier === 'high' ? 500 : tier === 'medium' ? 250 : 0
    const canUse3D = tier !== 'low'

    return { tier, isMobile, canUse3D, particleCount }
  }, [])
}
