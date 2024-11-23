<?php

namespace App\Services\Interfaces;

interface IUserService
{   
    public function createUser($request);
    public function authenticateUser($request);
    public function updateUserDetails($request);
}
