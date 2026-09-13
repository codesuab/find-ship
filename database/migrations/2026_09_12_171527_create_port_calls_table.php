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
        Schema::create('port_calls', function (Blueprint $table) {
            $table->id();
            $table->string('imo')->nullable();
            $table->string('mmsi')->nullable();
            $table->string('sizes')->nullable();

            $table->dateTime('formattedETA')->nullable();
            $table->dateTime('atdUtc')->nullable();

            $table->decimal('peed',10, 2)->default(0);
            $table->integer('course')->default(0);
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();

            $table->string('last_port')->nullable();
            $table->unsignedBigInteger('port_id')->nullable();

            $table->enum('target', ['arrival', 'departure', 'expected', 'in_port'])->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('port_calls');
    }
};
