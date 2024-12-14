<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\TicketService;
use Illuminate\Validation\ValidationException;

class TicketController extends Controller
{
    protected $ticketService;

    public function __construct(TicketService $ticketService)
    {
        $this->ticketService = $ticketService;
    }

    public function createTicket(Request $request)
    {
        //validate
        try {
            $request->validate([
                'type' => 'required|string',
                'title' => 'required|string', 
                'description' => 'required|string',
                'transaction_id' => 'nullable|integer',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }
        $ticket = $this->ticketService->createTicket($request);
        if($ticket){
            return response()->json(['message' => 'Ticket created successfully'], 201);
        }
        return response()->json(['message' => 'Failed to create ticket'], 400);
    }

    public function updateTicket(Request $request, $ticketId)
    {   
        // To set the ticket status to seen
        $ticket = $this->ticketService->updateTicket($request, $ticketId);
        if($ticket){
            return response()->json(['message' => 'Ticket updated successfully'], 200);
        }
        return response()->json(['message' => 'Failed to update ticket'], 400);
    }

    public function getTickets()
    {
        $tickets = $this->ticketService->getTickets();
        return response()->json($tickets);
    }
}
