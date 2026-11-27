
import cron from "node-cron";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import supabaseAdmin from "../supabaseAdmin.js";
import { sendPaymentReminder } from "../services/emailService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const emailFile = path.join(
    __dirname,
    "../data/sentEmails.json"
);

async function getSentEmails() {
    const contents = await fs.readFile(emailFile, "utf8");
    return JSON.parse(contents);
}

async function saveSentEmails(emails) {
    await fs.writeFile(
        emailFile,
        JSON.stringify(emails, null, 2)
    );
}

export async function checkSixtyDayReservations() {
    console.log("Checking 60-day reservations...");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const targetDate = new Date(today);

    // CHANGE 60 TO 45 WHEN FULLY DONE TO MEET REQUIREMENTS.
    targetDate.setDate(targetDate.getDate() + 60);

    const arrivalDate = targetDate.toISOString().split("T")[0];

    const { data: bookings, error } = await supabaseAdmin
        .from("bookings")
        .select("*")
        .eq("reservation_type", "sixty_day")
        .eq("arrival_date", arrivalDate)
        .eq("status", "pending");

    if (error) {
        console.error("Booking retrieval failed:", error);
        return;
    }

    const sentEmails = await getSentEmails();

    for (const booking of bookings ?? []) {

        if (sentEmails[booking.id]) {
            continue;
        }

        try {
            const { data, error } =
                await supabaseAdmin.auth.admin.getUserById(
                    booking.user_id
                );

            if (error || !data.user?.email) {
                throw new Error("Guest email not found.");
            }

            await sendPaymentReminder(
                booking,
                data.user.email
            );

            sentEmails[booking.id] = {
                sentAt: new Date().toISOString()
            };

            await saveSentEmails(sentEmails);

            console.log(
                `Payment email sent for booking ${booking.id}`
            );

        } catch (error) {
            console.error(
                `Failed to process booking ${booking.id}:`,
                error.message
            );
        }
    }
}

// Run every morning at 8 AM.
cron.schedule("0 8 * * *", checkSixtyDayReservations);

// this is for testing purposes. When restarting backend, it sends payment emails immediately. Otherwise sent at 8 AM
checkSixtyDayReservations(); 
