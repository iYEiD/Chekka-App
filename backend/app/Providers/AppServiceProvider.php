<?php

namespace App\Providers;
use Laravel\Passport\Passport;
use Illuminate\Support\ServiceProvider;
use Laravel\Passport\Client as PassportClient;
use Illuminate\Support\Str;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {   
        $this->ensurePersonalAccessClientExists();


        //FOR AUTHENTICATION, TODO: Move to AuthServiceProvider after getting it to work

        // Passport::hashClientSecrets();

        //token expiration times
        Passport::tokensExpireIn(now()->addDays(15));
        Passport::refreshTokensExpireIn(now()->addDays(30));
        Passport::personalAccessTokensExpireIn(now()->addMonths(6));
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