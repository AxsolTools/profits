'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import proofsLogo from '../Proofslogotransparent.png'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface VerificationModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  tokenHoldings: string
  telegramUsername: string
  service: string
  description: string
}

export function VerificationModal({ isOpen, onClose }: VerificationModalProps) {
  const [formData, setFormData] = useState<FormData>({
    tokenHoldings: '',
    telegramUsername: '',
    service: '',
    description: '',
  })
  const [currentSlide, setCurrentSlide] = useState(0)
  const [api, setApi] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentSlide(0)
      setFormData({
        tokenHoldings: '',
        telegramUsername: '',
        service: '',
        description: '',
      })
      setIsSubmitting(false)
    } else {
      // Reset to first slide when opening
      setTimeout(() => {
        if (api) {
          api.scrollTo(0)
        }
      }, 100)
    }
  }, [isOpen, api])

  // Update current slide when carousel changes
  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap())
    }

    api.on('select', onSelect)
    onSelect()

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  const handleNext = () => {
    if (api) {
      const next = currentSlide + 1
      api.scrollTo(next)
    }
  }

  const handlePrev = () => {
    if (api) {
      const prev = currentSlide - 1
      api.scrollTo(prev)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Prepare payload for backend
    const payload = {
      tokenHoldings: formData.tokenHoldings,
      telegramUsername: formData.telegramUsername,
      service: formData.service,
      description: formData.description,
      submittedAt: new Date().toISOString(),
    }

    // TODO: Replace with actual API endpoint
    console.log('[v0] Submission payload ready for backend:', payload)

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false)
      if (api) {
        api.scrollTo(4) // Go to thank you screen
      }
    }, 1000)
  }

  const handleClose = () => {
    // Always allow closing - user can close at any time
    onClose()
  }

  const canProceed = () => {
    switch (currentSlide) {
      case 0:
        return formData.tokenHoldings !== ''
      case 1:
        return formData.telegramUsername.trim() !== ''
      case 2:
        return formData.service !== ''
      case 3:
        return formData.description.trim() !== ''
      default:
        return false
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        handleClose()
      }
    }}>
      <DialogContent
        className="max-w-2xl p-0 overflow-hidden border-transparent bg-background shadow-none"
        overlayClassName="bg-black/30 backdrop-blur-sm"
        showCloseButton={currentSlide !== 4}
        onClose={handleClose}
      >
        {/* Outer gradient border container with website background */}
        <div className="overflow-hidden rounded-3xl border border-transparent bg-gradient-to-br from-[#1DA1F2]/10 via-background to-[#4ECDC4]/10 p-1 shadow-xl">
          {/* Inner container with website background */}
          <div className="rounded-[22px] bg-background">
            {/* Background glow effect */}
            <div 
              className="pointer-events-none absolute inset-0 z-0 rounded-[22px]"
              style={{
                background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(29, 161, 242, 0.12) 0%, transparent 60%)',
              }}
              aria-hidden="true"
            />
            
            {/* Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-gray-200/50 px-8 pt-8 pb-6">
              <div className="flex items-center gap-4">
                <div style={{ perspective: '500px' }}>
                  <Image
                    src={proofsLogo}
                    alt="Payment Proofs"
                    width={48}
                    height={48}
                    className="h-12 w-12 animate-spin-y drop-shadow-[0_0_20px_rgba(29,161,242,0.4)]"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Start Verifying
                  </h2>
                  <p className="text-sm text-gray-600">
                    Complete the form to get started
                  </p>
                </div>
              </div>
            </div>

            <Carousel
              setApi={setApi}
              opts={{
                align: 'start',
                loop: false,
                dragFree: false,
              }}
              className="w-full"
            >
          <CarouselContent className="ml-0">
            {/* Slide 1: Token Holdings */}
            <CarouselItem className="pl-8 pr-8 pb-8">
              <div className="space-y-8 pt-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    How many tokens do you hold?
                  </h3>
                  <div className="space-y-3">
                    {['Over 1m', 'Over 5m', 'Over 10m'].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, tokenHoldings: option })
                          setTimeout(() => handleNext(), 300)
                        }}
                        className={`group w-full text-left px-6 py-4 rounded-2xl border border-transparent transition-all ${
                          formData.tokenHoldings === option
                            ? 'border-[#1DA1F2] bg-white shadow-lg shadow-[#1DA1F2]/25'
                            : 'border-gray-200 bg-white hover:border-[#1DA1F2]/50 hover:shadow-md shadow-none text-gray-900'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-base font-semibold ${
                            formData.tokenHoldings === option ? 'text-[#1DA1F2]' : 'text-gray-900'
                          }`}>
                            {option}
                          </span>
                          {formData.tokenHoldings === option && (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1DA1F2]">
                              <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Slide 2: Telegram Username */}
            <CarouselItem className="pl-8 pr-8 pb-8">
              <div className="space-y-8 pt-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    What is your telegram username?
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Input
                        type="text"
                        placeholder="(Insert here)"
                        value={formData.telegramUsername}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            telegramUsername: e.target.value,
                          })
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && canProceed()) {
                            e.preventDefault()
                            handleNext()
                          }
                        }}
                        className="w-full h-14 text-base rounded-xl border-gray-200 bg-white focus:border-[#1DA1F2] focus:ring-[#1DA1F2]/30 shadow-sm"
                      />
                    </div>
                    <Button
                      onClick={handleNext}
                      disabled={!formData.telegramUsername.trim()}
                      className="w-full h-14 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-semibold text-lg rounded-full transition-all hover:shadow-xl hover:shadow-[#1DA1F2]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                      <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Slide 3: Service Selection */}
            <CarouselItem className="pl-8 pr-8 pb-8">
              <div className="space-y-8 pt-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    What service are you looking for?
                  </h3>
                  <div>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => {
                        setFormData({ ...formData, service: value })
                        setTimeout(() => handleNext(), 300)
                      }}
                    >
                      <SelectTrigger className="w-full h-14 text-base rounded-xl border-gray-300/50 bg-white/80 backdrop-blur-sm focus:border-[#1DA1F2] focus:ring-[#1DA1F2]/30 focus:bg-white">
                        <SelectValue placeholder="(Payroll / Tokenization / Spending)" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="Payroll" className="rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1DA1F2]/10">
                              <svg className="h-4 w-4 text-[#1DA1F2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                              </svg>
                            </div>
                            <span className="font-medium">Payroll</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="Tokenization" className="rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4ECDC4]/10">
                              <svg className="h-4 w-4 text-[#4ECDC4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                              </svg>
                            </div>
                            <span className="font-medium">Tokenization</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="Spending" className="rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#22c55e]/10">
                              <svg className="h-4 w-4 text-[#22c55e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                                <path d="M12 11h4M12 16h4M8 11h.01M8 16h.01"/>
                              </svg>
                            </div>
                            <span className="font-medium">Spending</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Slide 4: Description */}
            <CarouselItem className="pl-8 pr-8 pb-8">
              <div className="space-y-8 pt-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Provide Brief Discription
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Textarea
                        placeholder="(Type discription here)"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        className="w-full min-h-40 text-base resize-none rounded-xl border-gray-200 bg-white focus:border-[#1DA1F2] focus:ring-[#1DA1F2]/30 shadow-sm"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={!canProceed() || isSubmitting}
                      className="w-full h-14 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-semibold text-lg rounded-full transition-all hover:shadow-xl hover:shadow-[#1DA1F2]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="h-5 w-5 animate-spin mr-2"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          (SUBMIT YOUR ENTRY)
                          <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </CarouselItem>

            {/* Slide 5: Thank You Screen */}
            <CarouselItem className="pl-8 pr-8 pb-8">
              <div className="space-y-8 pt-12 pb-8 text-center">
                <div className="space-y-6">
                  {/* Success icon with glow */}
                  <div className="relative mx-auto">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#1DA1F2] to-[#0d8ecf] shadow-lg shadow-[#1DA1F2]/30">
                      <svg
                        className="h-12 w-12 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    {/* Pulse ring */}
                    <div className="absolute inset-0 animate-ping rounded-full bg-[#1DA1F2]/20" style={{ animationDuration: '2s' }} />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-3xl font-bold text-gray-900">Thank you</h3>
                    <p className="mx-auto max-w-md text-lg text-gray-600 leading-relaxed">
                      Please contact{' '}
                      <Link
                        href="https://t.me/Proof_Telegram"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#1DA1F2] hover:text-[#1a8cd8] underline underline-offset-2 transition-colors"
                      >
                        @ProofTelegram
                      </Link>
                      {' '}for fast reply with the tg account
                      you provided above
                    </p>
                  </div>
                  
                  <Button
                    onClick={handleClose}
                    className="mt-6 h-14 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-semibold px-10 rounded-full transition-all hover:shadow-xl hover:shadow-[#1DA1F2]/30"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>

          {/* Navigation Buttons - Only show on form slides (0-3) */}
          {currentSlide < 4 && currentSlide > 0 && (
            <CarouselPrevious
              className="left-4"
              onClick={handlePrev}
              variant="outline"
              size="icon"
            />
          )}

          {/* Progress Indicators */}
          {currentSlide < 4 && (
            <div className="relative z-10 flex justify-center gap-2 px-8 pb-6 pt-4">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? 'w-8 bg-[#1DA1F2]'
                      : index < currentSlide
                        ? 'w-2 bg-[#1DA1F2]/50'
                        : 'w-2 bg-gray-200'
                  }`}
                />
              ))}
            </div>
          )}
        </Carousel>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
