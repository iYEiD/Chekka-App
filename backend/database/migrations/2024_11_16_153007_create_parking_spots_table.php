<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('parking_spots', function (Blueprint $table) {
            $table->id('spot_id');
            $table->foreignId('host_id')->constrained('users', 'user_id');
            $table->decimal('longitude', 13, 10);
            $table->decimal('latitude', 13, 10);
            $table->decimal('price_per_hour', 8, 2);
            $table->string('car_type');
            $table->string('title');
            $table->text('main_description');
            $table->string('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parking_spots');
    }
};