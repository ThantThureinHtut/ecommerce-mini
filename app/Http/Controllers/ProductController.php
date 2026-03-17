<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductType;
use App\Models\ProductValue;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render("Seller/AddProductPage");
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'details' => ['required', 'string'],
            'base_price' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],

            'types' => ['nullable', 'array'],
            'types.*' => ['nullable', 'string'],
            'images' => ['nullable', 'array'],
            'images.*' => ['nullable', 'image', 'max:2048'],

            // Section 1 (one type with specific price/stock)
            'overrideType' => ['nullable', 'string'],
            'overrideValues' => ['nullable', 'array'],
            'overrideValues.*.value' => ['nullable', 'string'],
            'overrideValues.*.price' => ['nullable', 'numeric', 'min:0'],
            'overrideValues.*.stock' => ['nullable', 'integer', 'min:0'],

            // Section 2 (selection only)
            'additionalTypeValues' => ['nullable', 'array'],
        ]);


        $sellerId = $request->user()?->seller?->id;
        $overrideType = $validated['overrideType'] ?? null;
        $overrideRows = array_values(array_filter(
            $validated['overrideValues'] ?? [],
            fn($row) => !empty($row['value'])
        ));

        if (!$sellerId) {
            return redirect()->back()->withErrors([
                'seller' => 'Seller account not found for this user.',
            ]);
        }

        $product = Product::create([
            'name' => $validated['name'],
            'details' => $validated['details'],
            'base_price' => $validated['base_price'],
            'stock' => $validated['stock'],
            'seller_id' => $sellerId,
        ]);

        // Image Store
        if ($request->hasFile('images')) {
            $files = $request->file('images');
            foreach ($files as $file) {
                $file_name = uniqid() . '-' . $file->getClientOriginalName();
                $file_path = Storage::disk('public')->putFileAs('images', $file, $file_name);
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_url' => $file_path
                ]);
            }

        }


        foreach ($validated['types'] ?? [] as $typeName) {
            $type_id = ProductType::where('name', $typeName)->value('id');
            // check if the TypeName doesn't exist in the database, skip the loop.
            // don't do the rest of the codes.
            if (!$type_id) {
                continue;
            }

            // Check overide type is exit and not null , we will create the productValue and ProductVariant.
            // This is for section 1
            // This is user for product which have different price for each overideType -> Value(Red, Green , Blue)
            if ($overrideType === $typeName) {
                // This check overriderRows.
                // If user don't input any value in the overrideRows , we will skip the process.
                if (empty($overrideRows)) {
                    continue;
                }

                // Create Variant
                $variant = $product->variants()->create([
                    'product_type_id' => $type_id,
                ]);

                // Create ProductValue and ProductVariant for each row
                foreach ($overrideRows as $row) {
                    $productValue = ProductValue::create([
                        'product_type_id' => $type_id,
                        'product_id' => $product->id,
                        'name' => $row['value'],
                    ]);
                    $variant->productValues()->attach($productValue->id);

                    ProductVariant::create([
                        'product_id' => $product->id,
                        'product_type_id' => $type_id,
                        'product_value_id' => $productValue->id,
                        'price' => $row['price'] ?? 0,
                        'stock' => $row['stock'] ?? 0,
                    ]);
                }

                // This continuse is does for
                // In types = ['Weight' , 'Size' , 'Color']
                // overrideType = 'Size'
                // After do the Size , we will skip the rest of process because rest of process is for section 2.
                // Which is not in the overrideType
                continue;
            }



            // Section 2: values only
            $raw = $validated['additionalTypeValues'][$typeName] ?? '';
            // filter and trim the values from comma separated string
            $values = array_values(array_filter(array_map('trim', explode(',', (string) $raw))));
            if (empty($values)) {
                continue;
            }

            // Create Variant
            // It is the another variant for product which have same price for each value(Red, Green , Blue) or user just want to create the variant without price and stock.
            $variant = $product->variants()->create([
                'product_type_id' => $type_id,
            ]);

            // Create ProductValue and ProductVariant for each value
            foreach ($values as $value) {
                $productValue = ProductValue::create([
                    'product_type_id' => $type_id,
                    'product_id' => $product->id,
                    'name' => $value,
                ]);

                $variant->productValues()->attach($productValue->id);
            }
        }
        // Handle product creation logic here
        return redirect()->route('seller.dashboard');
    }
}
