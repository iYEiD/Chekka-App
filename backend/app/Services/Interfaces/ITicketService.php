<?php

namespace App\Services\Interfaces;

interface ITicketService{
    public function createTicket($request);
    public function updateTicket($request);
    public function getTickets();
}
