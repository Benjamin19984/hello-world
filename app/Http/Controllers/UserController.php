<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Resources\TaskResource;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $query = User::query();
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");
        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('email')) {
            $query->where('email', 'like', '%' . request('email') . '%');
        }
        $users = $query->orderBy($sortField, $sortDirection)->paginate(10)->oneachside(1);
        return Inertia::render('User/Index', [
            'users' => UserResource::collection($users),
            'queryParams' => $request->query() ?? null,
            'success' => session('success'),
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("User/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {

        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        User::create($data);

        return to_route('user.index')
            ->with('success', 'User was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $query = $user->tasks();
        $sortFields = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }
        $tasks = $query->orderBy($sortFields, $sortDirection)->paginate(10);
        return Inertia::render('User/Show', [
            'user' => new UserResource($user),
            'tasks' => $tasks->count() !== 0 ? TaskResource::collection($tasks) : null,
            'queryParams' => request()->query() ?? null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        // $data =  new UserResource($user);
        // dd($data);
        return Inertia::render('User/Edit', [
            'user' => new UserResource($user)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {

        $data = $request->validated();

        // Check if password is provided and not empty
        if (!empty($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        } else {
            // Remove the password key if it's not provided to avoid overwriting
            unset($data['password']);
        }

        // Get the original attributes of the user
        $originalData = $user->getAttributes();

        // Filter out unchanged data
        $updatedData = [];
        foreach ($data as $key => $value) {
            if ($key !== 'password' && $originalData[$key] !== $value) {
                $updatedData[$key] = $value;
            } elseif ($key === 'password' && !empty($value)) {
                $updatedData[$key] = $value;
            }
        }

        // Only update if there are changes in the data
        if (!empty($updatedData)) {
            $user->update($updatedData);
            return redirect(route('user.index'))->with('success', "User \"$user->name \" is updated");
        } else {
            return redirect(route("user.index"))->with('success', "Nothing has changed.");
        }     
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $name = $user->name;
        $user->delete();
        return redirect(route('user.index'))->with('success', "User \"$name\" is deleted.");
    }
}
