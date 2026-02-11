<?php

namespace App\Http\Controllers;

use App\Models\OptionalType;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemController extends Controller
{
    public function detail($name, $id)
    {
        $item = Product::where('id', $id)->with(['seller:id,shop_name', 'variants.productType', 'variants.productValues'])->first();
        return Inertia::render('Item/ItemDetail', ['item' => $item]);
    }

    public function selectItem(Request $request)
    {
         $selectItem = ProductVariant::where('product_id', $request->product_id)->where('product_value_id' , $request->product_value_id)->first();
         return response()->json(['selectItem' => $selectItem]);
    }

}
