import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const token = localStorage.getItem("token");

  const fetchTickets = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setTickets(data || []);
      } else {
        console.error("Failed to fetch tickets:", data.error);
      }
    } catch (err) {
      console.error("Error in fetchTickets: ", err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleTicketClick = (ticketId) => {
    navigate(`/tickets/${ticketId}`);
  };

  const handleDelete = async (ticketId) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets/${ticketId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        fetchTickets();
      } else {
        alert(data.error || "Failed to delete ticket");
      }
    } catch (err) {
      alert("Error deleting ticket");
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">All Tickets</h2>
      <div className="space-y-3">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            className="card shadow-md p-4 bg-gray-800 cursor-pointer hover:bg-gray-700 transition-colors"
            onClick={() => handleTicketClick(ticket._id)}
          >
            <h3 className="font-bold text-lg text-white">{ticket.title}</h3>
            <p className="text-gray-200">{ticket.description}</p>
            <p className="text-sm text-blue-300">
              Created At: <span className="text-gray-300">{new Date(ticket.createdAt).toLocaleString()}</span>
            </p>
            {(user && (user.role === "admin" || user._id === ticket.createdBy)) && (
              <button
                className="btn btn-error btn-xs mt-2"
                onClick={e => { e.stopPropagation(); handleDelete(ticket._id); }}
              >
                Delete
              </button>
            )}
          </div>
        ))}
        {tickets.length === 0 && <p>No tickets submitted yet.</p>}
      </div>
    </div>
  )
}

export default Tickets