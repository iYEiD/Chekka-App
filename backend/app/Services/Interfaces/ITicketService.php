<?php

namespace App\Services\Interfaces;

interface ITicketService{
    public function createTicket($request);
    public function updateTicket($request, $ticketId);
    public function getTickets();
}
