<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ItemController extends Controller
{
    public function detail($name, $id)
    {
        $item = Product::where('id', $id)->with(['seller:id,shop_name', 'variants.productType', 'variants.productValues', 'productimages'])->first();
        if($item){
           $item->productimages->transform(function ($image) {
            $image->image_url = Storage::url($image->image_url);
            return $image;
        });
        }

        return Inertia::render('Item/ItemDetail', ['item' => $item]);
    }

    public function selectItem(Request $request)
    {
        foreach ($request->product_value_id as $product_value_id) {
            $selectItem = ProductVariant::where('product_id', $request->product_id)->where('product_value_id', $product_value_id)->first();
            if (!is_null($selectItem)) {
                return response()->json(['selectItem' => $selectItem]);
            }
        }
        return response()->json(['selectItem' => null]);
    }

}
