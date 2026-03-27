<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
</head>

<body
    style="margin: 0; padding: 0; background-color: #f6f5ff; font-family: Arial, Helvetica, sans-serif; color: #18181b;">
    @php
        $customerName = $user?->name ?? 'Customer';
        $trackingUrl = $order && url('/order/');
        $shopUrl = url('/');
        $productName = $order?->product?->name ?? 'Your item';
        $orderNumber = $order?->order_number ?? 'Pending confirmation';
        $orderStatus = $order?->order_status ? ucfirst($order->order_status) : 'Confirmed';
        $quantity = (int) ($order?->qty ?? 1);
        $price = number_format((float) ($order?->price ?? 0), 2);
        $subtotal = number_format((float) (($order?->price ?? 0) * max($quantity, 1)), 2);
        $resolvedTimezone =
            isset($timezone) && in_array($timezone, timezone_identifiers_list(), true)
                ? $timezone
                : config('app.timezone');
        $placedAt =
            $order?->created_at?->copy()?->timezone($resolvedTimezone)?->format('F j, Y g:i A T') ??
            now()->timezone($resolvedTimezone)->format('F j, Y g:i A T');
        $variants = $order?->ordervariants ?? collect();
    @endphp

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
        style="background: linear-gradient(180deg, #f6f5ff 0%, #ffffff 100%); margin: 0; padding: 32px 16px;">
        <tr>
            <td align="center">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                    style="max-width: 640px; background-color: #ffffff; border: 1px solid #e7e5f4; overflow: hidden; box-shadow: 0 18px 50px rgba(76, 29, 149, 0.10);">
                    <tr>
                        <td style="padding: 0;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                                style="background: linear-gradient(135deg, #1d1b31 0%, #5b21b6 55%, #7c3aed 100%);">
                                <tr>
                                    <td style="padding: 40px 36px 32px;">
                                        <div
                                            style="display: inline-block; padding: 8px 14px; border-radius: 999px; background-color: rgba(255, 255, 255, 0.14); color: #f5f3ff; font-size: 12px; letter-spacing: 1.4px; text-transform: uppercase; font-weight: 700;">
                                            Order Confirmed
                                        </div>
                                        <h1
                                            style="margin: 20px 0 12px; font-size: 32px; line-height: 1.2; color: #ffffff; font-weight: 800;">
                                            Thanks for your order, {{ $customerName }}.
                                        </h1>
                                        <p
                                            style="margin: 0; font-size: 15px; line-height: 1.7; color: rgba(245, 243, 255, 0.86);">
                                            We have received your order and started preparing it. Your confirmation
                                            details are below so you can review everything at a glance.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 32px 36px 8px; background-color: #ffffff;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td width="50%" valign="top" style="padding: 0 10px 18px 0;">
                                        <div
                                            style="padding: 20px; border: 1px solid #ddd6fe; background-color: #f5f3ff;">
                                            <div
                                                style="font-size: 12px; text-transform: uppercase; letter-spacing: 1.2px; font-weight: 700; color: #6d28d9; margin-bottom: 8px;">
                                                Order Number
                                            </div>
                                            <div
                                                style="font-size: 18px; line-height: 1.4; font-weight: 800; color: #18181b;">
                                                {{ $orderNumber }}
                                            </div>
                                        </div>
                                    </td>
                                    <td width="50%" valign="top" style="padding: 0 0 18px 10px;">
                                        <div
                                            style="padding: 20px; border: 1px solid #e4e4e7; background-color: #fafafa;">
                                            <div
                                                style="font-size: 12px; text-transform: uppercase; letter-spacing: 1.2px; font-weight: 700; color: #71717a; margin-bottom: 8px;">
                                                Status
                                            </div>
                                            <div
                                                style="font-size: 18px; line-height: 1.4; font-weight: 800; color: #18181b;">
                                                {{ $orderStatus }}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%" valign="top" style="padding: 0 10px 0 0;">
                                        <div
                                            style="padding: 20px; border: 1px solid #e4e4e7; background-color: #ffffff;">
                                            <div
                                                style="font-size: 12px; text-transform: uppercase; letter-spacing: 1.2px; font-weight: 700; color: #71717a; margin-bottom: 8px;">
                                                Ordered On
                                            </div>
                                            <div
                                                style="font-size: 16px; line-height: 1.5; font-weight: 700; color: #18181b;">
                                                {{ $placedAt }}
                                            </div>
                                        </div>
                                    </td>
                                    <td width="50%" valign="top" style="padding: 0 0 0 10px;">
                                        <div
                                            style="padding: 20px; border: 1px solid #e4e4e7; background-color: #ffffff;">
                                            <div
                                                style="font-size: 12px; text-transform: uppercase; letter-spacing: 1.2px; font-weight: 700; color: #71717a; margin-bottom: 8px;">
                                                Estimated Total
                                            </div>
                                            <div
                                                style="font-size: 16px; line-height: 1.5; font-weight: 700; color: #18181b;">
                                                ${{ $subtotal }}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 28px 36px 12px;">
                            <div
                                style="border: 1px solid #e4e4e7; padding: 28px; background: linear-gradient(180deg, #ffffff 0%, #faf5ff 100%);">
                                <div
                                    style="font-size: 13px; text-transform: uppercase; letter-spacing: 1.4px; font-weight: 700; color: #6d28d9; margin-bottom: 14px;">
                                    Order Summary
                                </div>
                                <table role="presentation" cellpadding="0" cellspacing="0" border="0"
                                    width="100%">
                                    <tr>
                                        <td valign="top" style="padding: 0 16px 18px 0;">
                                            <div
                                                style="width: 72px; height: 72px; background: linear-gradient(135deg, #ede9fe 0%, #c4b5fd 100%); text-align: center; line-height: 72px; font-size: 26px; font-weight: 800; color: #5b21b6;">
                                                {{ strtoupper(substr($productName, 0, 1)) }}
                                            </div>
                                        </td>
                                        <td valign="top" style="padding-bottom: 18px;">
                                            <div
                                                style="font-size: 22px; line-height: 1.3; font-weight: 800; color: #18181b; margin-bottom: 8px;">
                                                {{ $productName }}
                                            </div>
                                            <div
                                                style="font-size: 15px; line-height: 1.7; color: #52525b; margin-bottom: 14px;">
                                                Quantity: {{ $quantity }}<br>
                                                Unit Price: ${{ $price }}
                                            </div>

                                            @if ($variants->isNotEmpty())
                                                <div
                                                    style="font-size: 13px; text-transform: uppercase; letter-spacing: 1.2px; font-weight: 700; color: #6d28d9; margin-bottom: 10px;">
                                                    Selected Options
                                                </div>
                                                @foreach ($variants as $variant)
                                                    <div
                                                        style="display: inline-block; margin: 0 8px 8px 0; padding: 8px 12px; border-radius: 999px; background-color: #f5f3ff; color: #5b21b6; font-size: 13px; font-weight: 700; border: 1px solid #ddd6fe;">
                                                        {{ ucfirst($variant->key) }}: {{ $variant->value }}
                                                    </div>
                                                @endforeach
                                            @endif
                                        </td>
                                    </tr>
                                </table>

                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                                    style="border-top: 1px solid #e4e4e7; padding-top: 18px; margin-top: 8px;">
                                    <tr>
                                        <td
                                            style="padding-top: 18px; font-size: 14px; line-height: 1.7; color: #71717a;">
                                            Subtotal
                                        </td>
                                        <td align="right"
                                            style="padding-top: 18px; font-size: 14px; line-height: 1.7; color: #18181b; font-weight: 700;">
                                            ${{ $subtotal }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            style="padding-top: 6px; font-size: 14px; line-height: 1.7; color: #71717a;">
                                            Shipping
                                        </td>
                                        <td align="right"
                                            style="padding-top: 6px; font-size: 14px; line-height: 1.7; color: #18181b; font-weight: 700;">
                                            Calculated at checkout
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            style="padding-top: 10px; font-size: 18px; line-height: 1.7; color: #18181b; font-weight: 800;">
                                            Total
                                        </td>
                                        <td align="right"
                                            style="padding-top: 10px; font-size: 18px; line-height: 1.7; color: #18181b; font-weight: 800;">
                                            ${{ $subtotal }}
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>



                    <tr>
                        <td style="padding: 20px 36px 16px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="background-color: #5b21b6;">
                                        <a href="{{ $trackingUrl }}"
                                            style="display: inline-block; padding: 14px 24px; font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none;">
                                            Track Your Order
                                        </a>
                                    </td>
                                    <td style="width: 12px;"></td>
                                    <td style="background-color: #f5f3ff; border: 1px solid #ddd6fe;">
                                        <a href="{{ $shopUrl }}"
                                            style="display: inline-block; padding: 14px 24px; font-size: 14px; font-weight: 700; color: #5b21b6; text-decoration: none;">
                                            Continue Shopping
                                        </a>
                                    </td>
                                    <td style="width: 12px;"></td>
                                    <td style="background-color: #f5f3ff; border: 1px solid #ddd6fe;">
                                        <a onclick="window.print()"
                                            style="display: inline-block; padding: 14px 24px; font-size: 14px; font-weight: 700; color: #5b21b6; text-decoration: none;">
                                            Print invoice
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 8px 36px 36px;">
                            <div style="padding: 20px 22px; background-color: #fafafa; border: 1px solid #e4e4e7;">
                                <div style="font-size: 14px; line-height: 1.8; color: #52525b;">
                                    We’ll send another update as soon as your order moves forward. If you have any
                                    questions, just reply to this email and we’ll help from there.
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 0 36px 28px; text-align: center;">
                            <p style="margin: 0; font-size: 12px; line-height: 1.8; color: #a1a1aa;">
                                This confirmation was sent for order <strong
                                    style="color: #71717a;">{{ $orderNumber }}</strong>.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
