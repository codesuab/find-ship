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
        Schema::create('datadocked_api_configures', function (Blueprint $table) {
            $table->id();
            $table->string('label');
            $table->integer('token')->default(0);
            $table->string('uri')->default('https://datadocked.com/api');
            $table->text('key');
            $table->enum('status', ['active', 'inactive'])->default('inactive');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('datadocked_api_configures');
    }
};
