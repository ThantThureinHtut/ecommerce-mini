<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PrintInvoiceEachMail extends Mailable
{
    use Queueable, SerializesModels;

    public ?Order $order;
    public string $timezone;
    /**
     * Create a new message instance.
     */

    public function __construct(Order $order, ?string $timezone = null)
    {
        $this->order = $order?->loadMissing(['product', 'user', 'ordervariants']);
        $this->timezone = in_array($timezone, timezone_identifiers_list(), true)
            ? $timezone
            : config('app.timezone');
    }


    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope();
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.print-order-mail',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
