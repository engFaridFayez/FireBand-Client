import emailjs from "@emailjs/browser";
import type { BookingPayload } from "@/types/booking";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const EmailService = {
    async sendBookingEmail(booking: {
        full_name: string;
        phone: string;
        email: string;
        event_date: string;
        event_time: string;
        location: string;
        category: string;
        sub_category: string;
        duration: string;
        team_members: number;
        custom_sub_category: string;
        notes: string;
    }) {
        const response = await emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            {
                full_name: booking.full_name,
                phone: booking.phone,
                email: booking.email || "-",
                event_date: booking.event_date,
                event_time: booking.event_time,
                location: booking.location,
                category: booking.category,
                sub_category: booking.sub_category,
                duration: booking.duration,
                team_members: booking.team_members,
                custom_sub_category: booking.custom_sub_category || "-",
                notes: booking.notes || "-",
            },
            { publicKey: PUBLIC_KEY },
        );

        return response;
    },
};

export default EmailService;