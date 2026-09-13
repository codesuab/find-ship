<?php

use Illuminate\Support\Facades\Schedule;

Schedule::command('app:update-arrival')
    ->daily();
