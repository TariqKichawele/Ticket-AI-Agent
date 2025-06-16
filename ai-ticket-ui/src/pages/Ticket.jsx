import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

const TicketDetailsPage = () => {
  const {id} = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets/${id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if(res.ok) {
          setTicket(data);
        } else {
          alert(data.error || "Failed to fetch ticket");
        }
      } catch (error) {
        console.error("Error in fetchTicket: ", error);
        alert("Failed to fetch ticket");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id, token]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/");
      } else {
        alert(data.error || "Failed to delete ticket");
      }
    } catch (err) {
      alert("Error deleting ticket");
      console.error(err);
    }
  };

  console.log(ticket);
  if (loading)
    return <div className="text-center mt-10">Loading ticket details...</div>;
  if (!ticket) return <div className="text-center mt-10">Ticket not found</div>;
  
  return (
    <div className="max-w-3xl mx-auto p-4">
      <button
        className="mb-4 btn btn-outline btn-primary"
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </button>
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Ticket Details</h2>

      <div className="card bg-gray-800 shadow p-4 space-y-4">
        <h3 className="text-xl font-semibold text-white">{ticket.title}</h3>
        <p className="text-gray-200">{ticket.description}</p>

        {/* Conditionally render extended details */}
        {ticket.status && (
          <>
            <div className="divider text-gray-400">Metadata</div>
            <p>
              <strong className="text-blue-300">Status:</strong> <span className="text-gray-100">{ticket.status}</span>
            </p>
            {ticket.priority && (
              <p>
                <strong className="text-blue-300">Priority:</strong> <span className="text-gray-100">{ticket.priority}</span>
              </p>
            )}

            {ticket.relatedSkills?.length > 0 && (
              <p>
                <strong className="text-blue-300">Related Skills:</strong>{" "}
                <span className="text-gray-100">{ticket.relatedSkills.join(", ")}</span>
              </p>
            )}

            {ticket.helpfulNotes && (
              <div>
                <strong className="text-blue-300">Helpful Notes:</strong>
                <div className="prose max-w-none rounded mt-2 text-gray-100">
                  <ReactMarkdown>{ticket.helpfulNotes}</ReactMarkdown>
                </div>
              </div>
            )}

            {ticket.assignedTo && (
              <p>
                <strong className="text-blue-300">Assigned To:</strong> <span className="text-gray-100">{ticket.assignedTo}</span>
              </p>
            )}

            {ticket.createdAt && (
              <p className="text-sm text-gray-400 mt-2">
                Created At: {new Date(ticket.createdAt).toLocaleString()}
              </p>
            )}
          </>
        )}
        {(user && (user.role === "admin" || user._id === ticket.createdBy)) && (
          <button
            className="btn btn-error btn-sm mt-4"
            onClick={handleDelete}
          >
            Delete Ticket
          </button>
        )}
      </div>
    </div>
  )
}

export default TicketDetailsPage