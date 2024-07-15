<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $pendingTasks = Task::query()->where("status", "pending")->count();
        $myPendingTasks = Task::query()->where("status", "pending")->where("assigned_user_id", $user->id)->count();
        $completedTasks = Task::query()->where("status", "completed")->count();
        $myCompletedTasks = Task::query()->where("status", "completed")->where("assigned_user_id", $user->id)->count();
        $inprogressTasks = Task::query()->where("status","like", "%progress%")->count();
        $myInprogressTasks = Task::query()->where("status","like", "%progress%")->where("assigned_user_id", $user->id)->count();
        
        return inertia(
            'Dashboard',
            compact(
                'pendingTasks',
                'myPendingTasks',
                'completedTasks',
                'myCompletedTasks',
                'inprogressTasks',
                'myInprogressTasks'
            )
        );
    }
}
