<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
</head>

<body style="margin: 0; padding: 0; background-color: #f4efe8; font-family: Arial, Helvetica, sans-serif; color: #1f2937;">
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
        style="background-color: #f4efe8; margin: 0; padding: 28px 14px;">
        <tr>
            <td align="center">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                    style="max-width: 680px; background-color: #fffdf9; border: 1px solid #eadfce;">
                    <tr>
                        <td style="background-color: #16302b; padding: 34px 34px 28px;">
                            <div
                                style="display: inline-block; padding: 7px 12px; background-color: #e7b66b; color: #16302b; font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase;">
                                Order Receipt
                            </div>
                            <div style="margin-top: 18px; font-size: 30px; line-height: 1.2; color: #fffdf9; font-weight: 700;">
                                Thanks, {{ $customerName }}.
                            </div>
                            <div style="margin-top: 10px; max-width: 520px; font-size: 15px; line-height: 1.7; color: #d8e2dc;">
                                Your order has been placed successfully. Here is a clear summary of the items and totals from your order data.
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 22px 34px 8px; background-color: #fffdf9;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td width="50%" valign="top" style="padding: 0 8px 12px 0;">
                                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                                            style="background-color: #f8f2e8; border: 1px solid #eadfce;">
                                            <tr>
                                                <td style="padding: 16px 18px;">
                                                    <div style="font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: #8a6a3d;">
                                                        Order Number
                                                    </div>
                                                    <div style="margin-top: 8px; font-size: 18px; line-height: 1.4; font-weight: 700; color: #16302b;">
                                                        {{ $orderNumber }}
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="50%" valign="top" style="padding: 0 0 12px 8px;">
                                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                                            style="background-color: #eef5f1; border: 1px solid #d7e4dc;">
                                            <tr>
                                                <td style="padding: 16px 18px;">
                                                    <div style="font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: #4a6b61;">
                                                        Current Status
                                                    </div>
                                                    <div style="margin-top: 8px; font-size: 18px; line-height: 1.4; font-weight: 700; color: #16302b;">
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
                                            style="background-color: #ffffff; border: 1px solid #eadfce;">
                                            <tr>
                                                <td style="padding: 16px 18px;">
                                                    <div style="font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: #6b7280;">
                                                        Ordered On
                                                    </div>
                                                    <div style="margin-top: 8px; font-size: 15px; line-height: 1.6; font-weight: 700; color: #1f2937;">
                                                        {{ $placedAt }}
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="50%" valign="top" style="padding: 0 0 12px 8px;">
                                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                                            style="background-color: #ffffff; border: 1px solid #eadfce;">
                                            <tr>
                                                <td style="padding: 16px 18px;">
                                                    <div style="font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: #6b7280;">
                                                        Order Total
                                                    </div>
                                                    <div style="margin-top: 8px; font-size: 18px; line-height: 1.4; font-weight: 700; color: #16302b;">
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
                                style="background-color: #16302b;">
                                <tr>
                                    <td style="padding: 20px 22px;">
                                        <div style="font-size: 12px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: #e7b66b;">
                                            Quick Summary
                                        </div>
                                        <div style="margin-top: 10px; font-size: 24px; line-height: 1.3; font-weight: 700; color: #fffdf9;">
                                            {{ $totalItems }} item{{ $totalItems === 1 ? '' : 's' }} across {{ $orders->count() }} line{{ $orders->count() === 1 ? '' : 's' }}
                                        </div>
                                        <div style="margin-top: 8px; font-size: 14px; line-height: 1.7; color: #d8e2dc;">
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
                                    style="background-color: #ffffff; border: 1px solid #eadfce; margin-bottom: 14px;">
                                    <tr>
                                        <td style="padding: 22px;">
                                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                                                <tr>
                                                    <td valign="top" style="width: 72px; padding: 0 16px 0 0;">
                                                        <div
                                                            style="width: 72px; height: 72px; background-color: #f2e5d3; color: #8a5d22; text-align: center; line-height: 72px; font-size: 26px; font-weight: 700;">
                                                            {{ strtoupper(substr($productName, 0, 1)) }}
                                                        </div>
                                                    </td>
                                                    <td valign="top">
                                                        <div style="font-size: 20px; line-height: 1.3; font-weight: 700; color: #16302b;">
                                                            {{ $productName }}
                                                        </div>
                                                        <div style="margin-top: 8px; font-size: 14px; line-height: 1.8; color: #4b5563;">
                                                            Status: {{ $orderStatus }}<br>
                                                            Quantity: {{ $quantity }}<br>
                                                            Unit Price: ${{ $unitPrice }}
                                                        </div>

                                                        @if ($variants->isNotEmpty())
                                                            <div style="margin-top: 14px; font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: #8a6a3d;">
                                                                Selected Options
                                                            </div>
                                                            <div style="margin-top: 10px;">
                                                                @foreach ($variants as $variant)
                                                                    <span
                                                                        style="display: inline-block; margin: 0 8px 8px 0; padding: 8px 12px; background-color: #f8f2e8; border: 1px solid #eadfce; font-size: 13px; font-weight: 700; color: #6c4f29;">
                                                                        {{ ucfirst($variant->key) }}: {{ $variant->value }}
                                                                    </span>
                                                                @endforeach
                                                            </div>
                                                        @endif
                                                    </td>
                                                    <td align="right" valign="top" style="width: 120px;">
                                                        <div style="font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: #6b7280;">
                                                            Line Total
                                                        </div>
                                                        <div style="margin-top: 8px; font-size: 21px; line-height: 1.3; font-weight: 700; color: #16302b;">
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
                                    style="background-color: #ffffff; border: 1px solid #eadfce;">
                                    <tr>
                                        <td style="padding: 24px; font-size: 14px; line-height: 1.8; color: #4b5563;">
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
                                style="background-color: #f8f2e8; border: 1px solid #eadfce;">
                                <tr>
                                    <td style="padding: 18px 22px; font-size: 14px; line-height: 1.7; color: #6c4f29;">
                                        Items Total
                                    </td>
                                    <td align="right" style="padding: 18px 22px; font-size: 14px; line-height: 1.7; font-weight: 700; color: #16302b;">
                                        ${{ $grandTotal }}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0 22px 18px; font-size: 14px; line-height: 1.7; color: #6c4f29;">
                                        Shipping
                                    </td>
                                    <td align="right" style="padding: 0 22px 18px; font-size: 14px; line-height: 1.7; font-weight: 700; color: #16302b;">
                                        Calculated at checkout
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0 22px 22px; font-size: 18px; line-height: 1.7; font-weight: 700; color: #16302b;">
                                        Grand Total
                                    </td>
                                    <td align="right" style="padding: 0 22px 22px; font-size: 18px; line-height: 1.7; font-weight: 700; color: #16302b;">
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
                                    <td style="background-color: #16302b;">
                                        <a href="{{ $trackingUrl }}"
                                            style="display: inline-block; padding: 14px 22px; font-size: 14px; font-weight: 700; color: #fffdf9; text-decoration: none;">
                                            Track Order
                                        </a>
                                    </td>
                                    <td style="width: 10px;"></td>
                                    <td style="background-color: #e7b66b;">
                                        <a href="{{ $ordersUrl }}"
                                            style="display: inline-block; padding: 14px 22px; font-size: 14px; font-weight: 700; color: #16302b; text-decoration: none;">
                                            View Orders
                                        </a>
                                    </td>
                                    <td style="width: 10px;"></td>
                                    <td style="background-color: #fffdf9; border: 1px solid #eadfce;">
                                        <a href="{{ $shopUrl }}"
                                            style="display: inline-block; padding: 14px 22px; font-size: 14px; font-weight: 700; color: #6c4f29; text-decoration: none;">
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
                                style="background-color: #eef5f1; border: 1px solid #d7e4dc;">
                                <tr>
                                    <td style="padding: 18px 20px; font-size: 14px; line-height: 1.8; color: #36574d;">
                                        We’ll send you another update when the order status changes. Keep your order number handy in case you need support.
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 0 34px 30px; text-align: center;">
                            <div style="font-size: 12px; line-height: 1.8; color: #8b9099;">
                                Confirmation for order <strong style="color: #4b5563;">{{ $orderNumber }}</strong>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
