<?php

namespace App\Http\Controllers;

use App\Models\orders;
use Illuminate\Http\Request;

class OrderController extends Controller
{
   
    
    
    public function createOrder(Request $request)
    {
        $order = new orders();
        $order->name = $request->name;
        $order->amount = $request->amount;
        $order->price = $request->price;
        do {
            $code = str_pad(rand(1, 999999), 6, '0', STR_PAD_LEFT);
        } while (orders::where('code', $code)->exists());
        $order->code = $code;
        $order->save();
        echo "Compra existosa";
    }


    
    
}
