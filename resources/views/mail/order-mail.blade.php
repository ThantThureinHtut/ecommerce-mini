<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
</head>

<body style="margin: 0; padding: 0; background-color: #f5f3ff; font-family: Arial, Helvetica, sans-serif; color: #18181b;">
    @php
        $orders = collect($orders ?? []);
        $primaryOrder = $orders->first();
        $customerName = $primaryOrder?->user?->name ?? 'Customer';
        $orderNumber = $primaryOrder?->order_number ?? 'Pending confirmation';
        $resolvedTimezone =
            isset($timezone) && in_array($timezone, timezone_identifiers_list(), true)
                ? $timezone
                : config('app.timezone');
        $placedAt =
            $primaryOrder?->created_at?->copy()?->timezone($resolvedTimezone)?->format('F j, Y g:i A T') ??
            now()->timezone($resolvedTimezone)->format('F j, Y g:i A T');
        $totalItems = $orders->sum(fn($order) => max((int) ($order?->qty ?? 0), 0));
        $grandTotalValue = $orders->sum(fn($order) => ((float) ($order?->price ?? 0)) * max((int) ($order?->qty ?? 1), 1));
        $grandTotal = number_format($grandTotalValue, 2);
        $statusLabel = $primaryOrder?->order_status ? ucfirst($primaryOrder->order_status) : 'Confirmed';
        $trackingUrl = $primaryOrder ? route('order.tracking', ['id' => $primaryOrder->id]) : route('order.dashboard');
        $ordersUrl = route('order.dashboard');
        $shopUrl = url('/');
    @endphp

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
        style="background-color: #f5f3ff; margin: 0; padding: 28px 14px;">
        <tr>
            <td align="center">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                    style="max-width: 680px; background-color: #ffffff; border: 1px solid #e7e5f4;">
                    <tr>
                        <td style="background: linear-gradient(135deg, #1d1b31 0%, #5b21b6 55%, #7c3aed 100%); padding: 34px 34px 28px;">
                            <div
                                style="display: inline-block; padding: 7px 12px; background-color: rgba(255, 255, 255, 0.14); color: #f5f3ff; font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase;">
                                Order Receipt
                            </div>
                            <div style="margin-top: 18px; font-size: 30px; line-height: 1.2; color: #ffffff; font-weight: 700;">
                                Thanks, {{ $customerName }}.
                            </div>
                            <div style="margin-top: 10px; max-width: 520px; font-size: 15px; line-height: 1.7; color: rgba(245, 243, 255, 0.88);">
                                Your order has been placed successfully. Here is a clear summary of the items and totals from your order data.
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 22px 34px 8px; background-color: #ffffff;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td width="50%" valign="top" style="padding: 0 8px 12px 0;">
                                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                                            style="background-color: #f5f3ff; border: 1px solid #ddd6fe;">
                                            <tr>
                                                <td style="padding: 16px 18px;">
                                                    <div style="font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: #6d28d9;">
                                                        Order Number
                                                    </div>
                                                    <div style="margin-top: 8px; font-size: 18px; line-height: 1.4; font-weight: 700; color: #18181b;">
                                                        {{ $orderNumber }}
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="50%" valign="top" style="padding: 0 0 12px 8px;">
                                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                                            style="background-color: #faf5ff; border: 1px solid #e9d5ff;">
                                            <tr>
                                                <td style="padding: 16px 18px;">
                                                    <div style="font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: #7e22ce;">
                                                        Current Status
                                                    </div>
                                                    <div style="margin-top: 8px; font-size: 18px; line-height: 1.4; font-weight: 700; color: #18181b;">
                                                        {{ $statusLabel }}
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%" valign="top" style="padding: 0 8px 12px 0;">
                                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                                            style="background-color: #ffffff; border: 1px solid #e4e4e7;">
                                            <tr>
                                                <td style="padding: 16px 18px;">
                                                    <div style="font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: #71717a;">
                                                        Ordered On
                                                    </div>
                                                    <div style="margin-top: 8px; font-size: 15px; line-height: 1.6; font-weight: 700; color: #18181b;">
                                                        {{ $placedAt }}
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="50%" valign="top" style="padding: 0 0 12px 8px;">
                                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                                            style="background-color: #ffffff; border: 1px solid #e4e4e7;">
                                            <tr>
                                                <td style="padding: 16px 18px;">
                                                    <div style="font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: #71717a;">
                                                        Order Total
                                                    </div>
                                                    <div style="margin-top: 8px; font-size: 18px; line-height: 1.4; font-weight: 700; color: #18181b;">
                                                        ${{ $grandTotal }}
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 8px 34px 12px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                                style="background-color: #1d1b31;">
                                <tr>
                                    <td style="padding: 20px 22px;">
                                        <div style="font-size: 12px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: #c4b5fd;">
                                            Quick Summary
                                        </div>
                                        <div style="margin-top: 10px; font-size: 24px; line-height: 1.3; font-weight: 700; color: #ffffff;">
                                            {{ $totalItems }} item{{ $totalItems === 1 ? '' : 's' }} across {{ $orders->count() }} line{{ $orders->count() === 1 ? '' : 's' }}
                                        </div>
                                        <div style="margin-top: 8px; font-size: 14px; line-height: 1.7; color: #ddd6fe;">
                                            Product name, quantity, selected variants, unit price, and line total are shown below.
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 0 34px 8px;">
                            @forelse ($orders as $order)
                                @php
                                    $productName = $order?->product?->name ?? 'Your item';
                                    $orderStatus = $order?->order_status ? ucfirst($order->order_status) : 'Confirmed';
                                    $quantity = max((int) ($order?->qty ?? 1), 1);
                                    $unitPriceValue = (float) ($order?->price ?? 0);
                                    $unitPrice = number_format($unitPriceValue, 2);
                                    $lineTotal = number_format($unitPriceValue * $quantity, 2);
                                    $variants = collect($order?->ordervariants ?? []);
                                @endphp

                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                                    style="background-color: #ffffff; border: 1px solid #e4e4e7; margin-bottom: 14px;">
                                    <tr>
                                        <td style="padding: 22px;">
                                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                                                <tr>
                                                    <td valign="top" style="width: 72px; padding: 0 16px 0 0;">
                                                        <div
                                                            style="width: 72px; height: 72px; background: linear-gradient(135deg, #ede9fe 0%, #c4b5fd 100%); color: #5b21b6; text-align: center; line-height: 72px; font-size: 26px; font-weight: 700;">
                                                            {{ strtoupper(substr($productName, 0, 1)) }}
                                                        </div>
                                                    </td>
                                                    <td valign="top">
                                                        <div style="font-size: 20px; line-height: 1.3; font-weight: 700; color: #18181b;">
                                                            {{ $productName }}
                                                        </div>
                                                        <div style="margin-top: 8px; font-size: 14px; line-height: 1.8; color: #52525b;">
                                                            Status: {{ $orderStatus }}<br>
                                                            Quantity: {{ $quantity }}<br>
                                                            Unit Price: ${{ $unitPrice }}
                                                        </div>

                                                        @if ($variants->isNotEmpty())
                                                            <div style="margin-top: 14px; font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: #6d28d9;">
                                                                Selected Options
                                                            </div>
                                                            <div style="margin-top: 10px;">
                                                                @foreach ($variants as $variant)
                                                                    <span
                                                                        style="display: inline-block; margin: 0 8px 8px 0; padding: 8px 12px; background-color: #f5f3ff; border: 1px solid #ddd6fe; font-size: 13px; font-weight: 700; color: #5b21b6;">
                                                                        {{ ucfirst($variant->key) }}: {{ $variant->value }}
                                                                    </span>
                                                                @endforeach
                                                            </div>
                                                        @endif
                                                    </td>
                                                    <td align="right" valign="top" style="width: 120px;">
                                                        <div style="font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: #71717a;">
                                                            Line Total
                                                        </div>
                                                        <div style="margin-top: 8px; font-size: 21px; line-height: 1.3; font-weight: 700; color: #18181b;">
                                                            ${{ $lineTotal }}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            @empty
                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                                    style="background-color: #ffffff; border: 1px solid #e4e4e7;">
                                    <tr>
                                        <td style="padding: 24px; font-size: 14px; line-height: 1.8; color: #52525b;">
                                            Your order confirmation is ready, but the item list is temporarily unavailable.
                                        </td>
                                    </tr>
                                </table>
                            @endforelse
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 8px 34px 12px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                                style="background-color: #f5f3ff; border: 1px solid #ddd6fe;">
                                <tr>
                                    <td style="padding: 18px 22px; font-size: 14px; line-height: 1.7; color: #6d28d9;">
                                        Items Total
                                    </td>
                                    <td align="right" style="padding: 18px 22px; font-size: 14px; line-height: 1.7; font-weight: 700; color: #18181b;">
                                        ${{ $grandTotal }}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0 22px 18px; font-size: 14px; line-height: 1.7; color: #6d28d9;">
                                        Shipping
                                    </td>
                                    <td align="right" style="padding: 0 22px 18px; font-size: 14px; line-height: 1.7; font-weight: 700; color: #18181b;">
                                        Calculated at checkout
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0 22px 22px; font-size: 18px; line-height: 1.7; font-weight: 700; color: #18181b;">
                                        Grand Total
                                    </td>
                                    <td align="right" style="padding: 0 22px 22px; font-size: 18px; line-height: 1.7; font-weight: 700; color: #18181b;">
                                        ${{ $grandTotal }}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 8px 34px 16px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="background-color: #5b21b6;">
                                        <a href="{{ $trackingUrl }}"
                                            style="display: inline-block; padding: 14px 22px; font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none;">
                                            Track Order
                                        </a>
                                    </td>
                                    <td style="width: 10px;"></td>
                                    <td style="background-color: #ede9fe; border: 1px solid #ddd6fe;">
                                        <a href="{{ $ordersUrl }}"
                                            style="display: inline-block; padding: 14px 22px; font-size: 14px; font-weight: 700; color: #5b21b6; text-decoration: none;">
                                            View Orders
                                        </a>
                                    </td>
                                    <td style="width: 10px;"></td>
                                    <td style="background-color: #ffffff; border: 1px solid #e4e4e7;">
                                        <a href="{{ $shopUrl }}"
                                            style="display: inline-block; padding: 14px 22px; font-size: 14px; font-weight: 700; color: #52525b; text-decoration: none;">
                                            Continue Shopping
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 0 34px 18px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                                style="background-color: #fafafa; border: 1px solid #e4e4e7;">
                                <tr>
                                    <td style="padding: 18px 20px; font-size: 14px; line-height: 1.8; color: #52525b;">
                                        We’ll send you another update when the order status changes. Keep your order number handy in case you need support.
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 0 34px 30px; text-align: center;">
                            <div style="font-size: 12px; line-height: 1.8; color: #a1a1aa;">
                                Confirmation for order <strong style="color: #71717a;">{{ $orderNumber }}</strong>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
