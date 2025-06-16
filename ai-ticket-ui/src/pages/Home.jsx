import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-700 to-blue-400 text-white text-center px-4">
        <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">AI Ticket Assistant</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Instantly triage, analyze, and manage your technical support tickets with the power of AI. Save time, reduce manual work, and get smart insights for every ticket.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/create')}>Create Ticket</button>
          <button className="btn btn-outline btn-lg" onClick={() => navigate('/tickets')}>View Tickets</button>
        </div>
      </section>

      {/* About Section */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-center px-4 pt-10 sm:pt-0">
        <h2 className="text-4xl font-bold mb-6 text-blue-700">About AI Ticket Assistant</h2>
        <div className="max-w-3xl mx-auto text-lg text-gray-700 space-y-4">
          <p>
            <strong>AI Ticket Assistant</strong> is a modern platform designed to streamline your technical support workflow. Powered by advanced AI, it automatically analyzes incoming tickets, suggests priorities, provides helpful notes, and identifies the skills needed to resolve each issue.
          </p>
          <p>
            Whether you're a support agent, a developer, or an admin, our tool helps you:
          </p>
          <ul className="list-disc list-inside text-left mx-auto max-w-xl">
            <li>Quickly create and submit new support tickets</li>
            <li>Get instant AI-powered triage and recommendations</li>
            <li>Assign tickets to the right team members based on skills</li>
            <li>Track ticket status and history in a user-friendly dashboard</li>
            <li>Save time and reduce manual effort with smart automation</li>
          </ul>
          <p>
            Built for teams of all sizes, AI Ticket Assistant brings efficiency, intelligence, and clarity to your support process.
          </p>
        </div>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/create')}>Get Started</button>
          <button className="btn btn-outline btn-lg" onClick={() => navigate('/tickets')}>See Tickets</button>
        </div>
      </section>
    </>
  )
}

export default Home 