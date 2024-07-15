<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $pendingTasks = Task::query()
            ->where("status", "pending")
            ->count();
        $myPendingTasks = Task::query()
            ->where("status", "pending")->where("assigned_user_id", $user->id)
            ->count();
        $completedTasks = Task::query()
            ->where("status", "completed")->count();
        $myCompletedTasks = Task::query()
            ->where("status", "completed")->where("assigned_user_id", $user->id)
            ->count();
        $inprogressTasks = Task::query()
            ->where("status", "like", "%progress%")
            ->count();
        $myInprogressTasks = Task::query()
            ->where("status", "like", "%progress%")->where("assigned_user_id", $user->id)
            ->count();
        $activeTasks = Task::query()
            ->where(function ($query) {
                $query->where('status', 'like', 'pending')
                    ->orWhere('status', 'like', '%progress%');
            })

            ->where("assigned_user_id", $user->id)
            ->limit(10)
            ->get();
        $activeTasks = TaskResource::collection($activeTasks);
        return inertia(
            'Dashboard',
            compact(
                'pendingTasks',
                'myPendingTasks',
                'completedTasks',
                'myCompletedTasks',
                'inprogressTasks',
                'myInprogressTasks',
                'activeTasks'
            )
        );
    }
}
