import Ticket from "../models/ticketModel.js";
import { inngest } from "../inngest/client.js";

export const createTicket = async (req, res) => {
    try {
        const { title, description, priority, deadline, helpfulNotes, relatedSkills } = req.body;
        
        if(!title || !description) {
            return res.status(400).json({ error: "Title and description are required" });
        }

        const newTicket = await Ticket.create({
            title,
            description,
            priority,
            deadline,
            helpfulNotes,
            relatedSkills,
            createdBy: req.user._id.toString(),
        });

        // Try to send Inngest event, but don't let it block ticket creation
        try {
            await inngest.send({
                name: "ticket/create",
                data: {
                    ticketId: newTicket._id.toString(),
                    title,
                    description,
                    createdBy: req.user._id.toString(),
                }
            });
        } catch (inngestError) {
            console.error("Failed to send Inngest event:", inngestError);
            // Continue with ticket creation even if Inngest fails
        }

        return res.status(201).json({
            message: "Ticket created successfully",
            ticket: newTicket,
        });
    } catch (error) {
        console.error("Error in createTicket controller: ", error);
        return res.status(500).json({ 
            error: "Failed to create ticket", 
            details: error.message 
        });
    }
}

export const getTickets = async (req, res) => {
    try {
        const user = req.user;
        let tickets = [];

        if(user.role !== "user") {
            tickets = Ticket.find({}).populate("assignedTo", ["email", "_id"]).sort({ createdAt: -1 });
        } else {
            tickets = await Ticket.find({ createdBy: user._id }).sort({ createdAt: -1 });
        }

        return res.status(200).json(tickets);
    } catch (error) {
        console.error("Error in getTickets controller: ", error);
        return res.status(500).json({ error: "Failed to get tickets" });
    }
}

export const getTicket = async (req, res) => {
    try {
        const user = req.user;
        let ticket;

        if(user.role !== "user") {
            ticket = await Ticket.findById(req.params.id).populate("assignedTo", ["email", "_id"]);
        } else {
            ticket = await Ticket.findOne({
                _id: req.params.id,
                createdBy: user._id
            })
        }

        if(!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }

        return res.status(200).json(ticket);
    } catch (error) {
        console.error("Error in getTicket controller: ", error);
        return res.status(500).json({ 
            error: "Failed to get ticket",
            details: error.message 
        });
    }
}

export const deleteTicket = async (req, res) => {
    try {
        const user = req.user;
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }
        // Only creator or admin can delete
        if (ticket.createdBy.toString() !== user._id && user.role !== "admin") {
            return res.status(403).json({ error: "Unauthorized: Only the creator or an admin can delete this ticket." });
        }
        await Ticket.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Ticket deleted successfully" });
    } catch (error) {
        console.error("Error in deleteTicket controller: ", error);
        return res.status(500).json({ error: "Failed to delete ticket" });
    }
}

