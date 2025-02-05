<?php

namespace App\Services\Interfaces;

interface IUserService
{   
    public function createUser($request);
    public function authenticateUser($request);
    public function updateUserDetails($request);
    public function getUser();
    public function fetchUserData();
    public function submitReview($bookingId, $data);
    public function deleteBooking($bookingId);
    public function createWallet($userId);
    public function getTransactionHistory($userId);
    public function getAllTransactions();
}
