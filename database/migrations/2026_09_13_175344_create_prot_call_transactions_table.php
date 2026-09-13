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
        Schema::create('prot_call_transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('port_id')->nullable();
            $table->dateTime('date')->nullable();
            $table->integer('token')->nullable();
            $table->integer('total')->default(0);
            $table->enum('type', ['arrival', 'departure', 'expected', 'in_port']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prot_call_transactions');
    }
};
