<?php

namespace App\Services;

use App\Services\Interfaces\ITicketService;
use Illuminate\Support\Facades\Auth;
use App\Models\Ticket;
use App\Models\Transaction;

class TicketService implements ITicketService
{
    public function createTicket($request)
    {
       $user = Auth::user();

       // Check if transaction belongs to user before proceeding
       if ($request->has('transaction_id')) {
           $transaction = Transaction::where('transaction_id', $request->transaction_id)->first();
           if (!$transaction) {
               return null;
           }

           $senderWallet = $transaction->senderWallet;
           if (!$senderWallet || $senderWallet->user_id !== $user->user_id) {
               return null;
           }
       }

       $ticket = Ticket::create([
        'user_id' => $user->user_id,
        'admin_id' => null, //to change later
        'type' => $request->type,
        'title' => $request->title,
        'description' => $request->description,
        'status' => 'pending',
        'response' => null,
        'created_at' => now(),
        'updated_at' => now(),
       ]);
       $ticket->save();

       if ($request->has('transaction_id')) {
           $transaction->ticket_id = $ticket->ticket_id;
           $transaction->transaction_type = 'pending';
           $transaction->save();
       }

       return $ticket;
    }

    public function updateTicket($request)
    {
        $user = Auth::user();
        $ticket = Ticket::where('ticket_id', $request->route('ticketId'))
            ->where('user_id', $user->user_id)
            ->whereIn('status', ['seen', 'done'])
            ->first();
        if (!$ticket) {
            return null;
        }
        $ticket->status = 'seen';
        $ticket->save();
        return $ticket;
    }

    public function getTickets()
    {
        $user = Auth::user();
        $tickets = [
            'pendingTickets' => Ticket::where('user_id', $user->user_id)
                            ->where('status', 'pending')
                            ->get(),
            'seenTickets' => Ticket::where('user_id', $user->user_id)
                            ->where('status', 'seen') 
                            ->get(),
            'doneTickets' => Ticket::where('user_id', $user->user_id)
                            ->where('status', 'done')
                            ->get()
        ];

        return $tickets;
    }
}
