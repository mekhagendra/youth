<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * Maps old roles to new user_types for backward compatibility:
     * - 'admin' → System Admin, System Manager
     * - 'member' → Member, Volunteer, Intern, Employee
     * - 'user' → Guest
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        if (!$request->user()) {
            return redirect()->route('login');
        }

        $user = $request->user();
        
        // Map old role names to new user_types for backward compatibility
        $allowedUserTypes = [];
        foreach ($roles as $role) {
            $allowedUserTypes = array_merge($allowedUserTypes, $this->mapRoleToUserTypes($role));
        }

        if (!in_array($user->user_type, $allowedUserTypes)) {
            abort(403, 'Unauthorized access.');
        }

        return $next($request);
    }

    /**
     * Map old role names to new user_types
     */
    private function mapRoleToUserTypes(string $role): array
    {
        return match($role) {
            'admin' => ['System Admin', 'System Manager'],
            'member' => ['Member', 'Volunteer', 'Intern', 'Employee'],
            'user' => ['Guest'],
            // Direct user_type names (new system)
            'Guest', 'Member', 'Volunteer', 'Intern', 'Employee', 'System Admin', 'System Manager' => [$role],
            default => [],
        };
    }
}
