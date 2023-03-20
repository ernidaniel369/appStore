<?php

namespace App\Http\Controllers;

use App\Models\images;
use App\Models\Product;

use Illuminate\Http\Request;



class ProductController extends Controller
{
    
    public function getAllProduct()
    {
        $products = Product::all();
        return $products;
    }

    
    public function createProduct(Request $request)
    {
        $product = new Product();
        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->stock = $request->stock;
        $product->img = $request->img;

        $product->save();
    }

    
    public function getProduct($id)
    {
        $product = Product::with('images')->find($id);
        return $product;
    }

    
    public function updateProduct(Request $request, $id)
    {
        try {
            $product = Product::findOrFail($id);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Product not registered'], 404);
        }
    
        $product->stock = $request->stock;
    
        $product->save();
        return $product;
    }
    

    public function destroyProduct($id)
    {
        $product = Product::destroy($id);
       return $product;
    }
}
