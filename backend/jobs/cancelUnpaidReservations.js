
import cron from "node-cron";
import supabaseAdmin from "../supabaseAdmin.js";

export async function cancelUnpaidReservations() {
    console.log("Checking unpaid 60-day reservations...");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data: bookings, error } = await supabaseAdmin
        .from("bookings")
        .select("*")
        .eq("reservation_type", "sixty_day")
        .eq("status", "pending");

    if (error) {
        console.error("Failed to retrieve bookings:", error);
        return;
    }

    for (const booking of bookings ?? []) {
        const arrivalDate = new Date(
            booking.arrival_date + "T00:00:00"
        );

        const deadline = new Date(arrivalDate);
        deadline.setDate(deadline.getDate() - 30);

        if (today < deadline) {
            continue;
        }

        const { error: updateError } = await supabaseAdmin
            .from("bookings")
            .update({
                status: "cancelled",
                cancelled_at: new Date().toISOString()
            })
            .eq("id", booking.id)
            .eq("status", "pending");

        if (updateError) {
            console.error(
                `Failed to cancel booking ${booking.id}:`,
                updateError
            );
            continue;
        }

        console.log(`Cancelled unpaid booking: ${booking.id}`);
    }
}

// Run every morning at 8 AM.
cron.schedule("0 8 * * *", cancelUnpaidReservations);
