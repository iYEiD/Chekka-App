<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $primaryKey = 'ticket_id';
    protected $table = 'tickets';

    protected $fillable = [
        'user_id',
        'admin_id', 
        'type',
        'title',
        'status',
        'description',
        'response'
    ];

    protected $attributes = [
        'status' => 'pending'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id', 'user_id');
    }

    public function transaction()
    {
        return $this->belongsTo(Transaction::class, 'ticket_id');
    }
}
