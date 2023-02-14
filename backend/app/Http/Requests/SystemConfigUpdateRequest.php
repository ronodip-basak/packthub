<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class SystemConfigUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if(Auth::guard('admins')->check()){
            return true;
        }
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'featured_books' => 'required|array',
            'featured_genre' => 'required|array',
            'featured_books.*' => 'exists:App\Models\Book,id',
            'featured_genre.*' => 'exists:App\Models\Genre,id'
        ];
    }
}
