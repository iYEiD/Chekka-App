<?php

namespace App\Providers;

use Laravel\Passport\Passport;
use Illuminate\Support\ServiceProvider;
use Laravel\Passport\Client as PassportClient;
use Illuminate\Support\Str;


class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {   
        $this->ensurePersonalAccessClientExists();

        // Token expiration times
        Passport::tokensExpireIn(now()->addHour(1));
        Passport::refreshTokensExpireIn(now()->addHour(2));
        Passport::personalAccessTokensExpireIn(now()->addHour(1));
    }

    protected function ensurePersonalAccessClientExists(): void
    {
        // Check if a personal access client already exists
        if (!PassportClient::where('personal_access_client', true)->exists()) {
            $client = PassportClient::create([
                'name' => 'Personal Access Client',
                'secret' => Str::random(40),
                'redirect' => env('APP_URL', 'http://localhost'),
                'personal_access_client' => true,
                'password_client' => false,
                'revoked' => false,
            ]);
        }
}
}
