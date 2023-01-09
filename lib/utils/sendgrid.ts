import mail from "@sendgrid/mail";
mail.setApiKey(process.env.SENDGRID_API_KEY!);

export const emailVerificationMessage = (userEmail: string, userName: string, verification_token: string) => {
    return {
        to: userEmail,
        from: {
            name: "Gyan Fortress",
            email: "no-reply@ibcoder.com",
        },
        templateId: process.env.SENDGRID_EMAIL_VERIFICATION_TEMPLATE_ID!,
        dynamicTemplateData: {
            username: userName,
            emailVerificationLink: `${process.env.NEXTAUTH_URL}/api/users/verify/?token=${verification_token}`,
            openHours: 24
        },
    };
};

export const emailContactFormMessage = (name: string, email: string, subject: string, message: string) => {
    return {
        to: email,
        from: {
            name: "Gyan Fortress",
            email: "no-reply@ibcoder.com",
        },
        templateId: process.env.SENDGRID_CONTACT_FORM_TEMPLATE_ID!,
        dynamicTemplateData: {
            name,
            email,
            subject,
            message
        },
    };
};

export const sendEmail = async (message: any) => {
    try {
        const response = await mail.send(message);
        if (response[0].statusCode === 202) return response[0].statusCode;
    } catch (error: any) {
        console.error(error?.message);
    }
};
