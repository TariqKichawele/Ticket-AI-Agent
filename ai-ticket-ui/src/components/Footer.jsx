import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => (
  <footer className="footer flex flex-col items-center p-8 bg-base-200 text-base-content mt-10 border-t">
    <h2 className="font-bold text-xl text-blue-700">AI Ticket Assistant</h2>
    <p className="max-w-xl mx-auto text-gray-600 text-center">
      Instantly triage, analyze, and manage your technical support tickets with the power of AI. Built for teams of all sizes.
    </p>
    <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} AI Ticket Assistant. All rights reserved.</p>
  </footer>
)

export default Footer 