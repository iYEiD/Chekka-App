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
        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id');
            $table->string('last_name'); // Add lastname column
            $table->string('first_name'); // Add firstname column
            $table->string('phone_number'); // Add phonenumber column
            $table->string('email')->unique(); // Add email column
            $table->string('password'); // Add password column
            $table->string('status'); // Add status column

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};