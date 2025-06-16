import { inngest } from "../client.js";
import User from "../../models/userModel.js";
import { NonRetriableError } from "inngest";
import { sendMail } from "../../utils/mailer.js";

export const onUserSignup = inngest.createFunction(
    { id: "on-user-signup", retries: 2 },
    { event: "user/signup" },
    async ({ event, step }) => {
        try {
            const { email } = event.data;
            const user = await step.run("get-user-email", async () => {
                const userObj = await User.findOne({ email });
                if (!userObj) {
                    throw new NonRetriableError("User not found");
                }
                return userObj;
            });

            await step.run("send-welcome-email", async () => {
                const subject = `Welcome to the app`;
                const message = `Hi,
                    \n\n
                    Thanks for signing up. We're glad to have you onboard!
                `;
                await sendMail(user.email, subject, message);
            });

            return { success: true };
        } catch (error) {
            console.error("Error in onUserSignup: ", error);
            return { success: false }
        }
    }
);