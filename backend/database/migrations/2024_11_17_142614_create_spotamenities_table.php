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
        Schema::create('spot_amenities', function (Blueprint $table) {
            $table->id('amenity_id');
            $table->foreignId('spot_id')->constrained('parking_spots', 'spot_id');
            $table->boolean('is_covered');
            $table->boolean('has_security');
            $table->boolean('has_ev_charging');
            $table->boolean('is_handicap_accessible');
            $table->boolean('has_lighting');
            $table->boolean('has_cctv');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('spot_amenities');
    }
};