<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class images extends Model
{
    use HasFactory;
    
    protected $fillable = ['name_product', 'url', 'product_id'];
    public function product()
    {
        return $this->belongsTo(product::class);
    }
}
