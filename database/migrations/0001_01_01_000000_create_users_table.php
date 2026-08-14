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
            $table->id();

            // required data
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password')->nullable();
            $table->string('phone')->unique()->nullable();
            $table->text('address')->nullable();
            $table->string('avatar')->nullable();
            $table->enum('gender', ['male', 'female'])->nullable();

            // SaaS
            $table->unsignedBigInteger('plan_id')->default(0);
            $table->timestamp('plan_started_at')->nullable();
            $table->timestamp('plan_expires_at')->nullable();

            // company info
            $table->string('company_logo')->nullable();
            $table->string('company_name')->nullable();
            $table->string('company_type')->nullable();
            $table->string('company_address')->nullable();

            // extra
            $table->decimal('balance', 12, 2)->default(0);

            // security
            $table->enum('status', ['active', 'pending', 'suspend'])->default('active');
            $table->text('status_message')->nullable();
            $table->timestamp('last_login_at')->nullable();
            $table->ipAddress('last_login_ip')->nullable();
            $table->string('login_device_id')->nullable()->index();
            $table->string('login_device_name')->nullable();
            $table->string('login_browser')->nullable();
            $table->string('login_os')->nullable();

            // OAuth(google)
            $table->text('google_id')->nullable();
            $table->longText('google_token')->nullable();
            $table->longText('google_refresh_token')->nullable();
            // facebook
            $table->text('facebook_id')->nullable();
            $table->longText('facebook_token')->nullable();
            $table->longText('facebook_refresh_token')->nullable();

            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
