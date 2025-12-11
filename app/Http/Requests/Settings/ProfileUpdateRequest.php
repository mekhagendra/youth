<?php

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $user = $this->user();
        $isAdmin = $user && in_array($user->user_type, ['System Admin', 'System Manager']);

        return [
            'name' => $isAdmin ? ['required', 'string', 'max:255'] : ['sometimes', 'in:' . $user->name],

            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($user->id),
            ],

            'profile_picture' => ['nullable', 'image', 'mimes:jpeg,jpg,png,gif', 'max:2048'],
            
            'designation' => $isAdmin ? ['nullable', 'string', 'max:255'] : ['sometimes', 'in:' . ($user->designation ?? '')],
        ];
    }
}
