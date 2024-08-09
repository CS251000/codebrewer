"use client"

import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Instant Problem Access',
    description:
      'Get immediate access to a vast library of coding problems across various difficulties. Start solving right away with a single click.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Secure Code Submissions',
    description:
      'Your solutions are safe with us. We use advanced encryption to protect your code and ensure that your submissions are securely stored.',
    icon: LockClosedIcon,
  },
  {
    name: 'Efficient Problem Queues',
    description:
      'Queue up multiple problems to solve in one go, or tackle them one by one. Our platform efficiently manages your problem-solving workflow.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Advanced Problem Analysis',
    description:
      'Analyze your performance with detailed problem breakdowns, including time complexity, space complexity, and optimal solutions.',
    icon: FingerPrintIcon,
  },
]

export default function FeaturesSection() {
  return (
    <div className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Enhance Your Coding Skills</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:text-center">
            Everything You Need to Ace Your Coding Interviews
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 text-left lg:text-center">
            From instant problem access to detailed performance analysis, our platform provides all the tools you need to prepare for coding interviews and competitions.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <div className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                  </div>
                  {feature.name}
                </div>
                <div className="mt-2 text-base leading-7 text-gray-600">{feature.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
