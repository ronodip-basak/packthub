<?php

namespace App\Http\Controllers;

use App\Http\Resources\AdminResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request){
        $validatedData = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if(Auth::guard('admins')->attempt($validatedData)){
            return [
                'success' => true,
                'admin' => new AdminResource(Auth::guard('admins')->user()) 
            ];
        }

        throw ValidationException::withMessages([
            'email' => 'email or password invalid'
        ]);
    }
    public function logout(){
        Auth::guard('admins')->logout();
    }
}
