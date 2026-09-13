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
        Schema::create('api_call_limits', function (Blueprint $table) {
            $table->id();
            $table->integer('arrival')->default(10)->comment('Days');
            $table->integer('departure')->default(10)->comment('Days');
            $table->integer('expected')->default(10)->comment('Days');
            $table->integer('in_port')->default(10)->comment('Days');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('api_call_limits');
    }
};
