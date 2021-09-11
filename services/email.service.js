const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const CustomError = require('../errors/customError');
const { DEFAULT_EMAIL, DEFAULT_EMAIL_PASSWORD } = require('../constants/constants');
const { registerCongrats, goodBye } = require('../constants/letter-types.enum');
const templatesInfo = require('../email-templates');
const { SERVER_ERROR } = require('../constants/status-codes.enum');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: DEFAULT_EMAIL,
        pass: DEFAULT_EMAIL_PASSWORD
    }
});

const sendEmail = async (email, letterType = registerCongrats, data = {}) => {
    const template = templatesInfo[letterType];

    if (!template) {
        throw new CustomError('Not found template', SERVER_ERROR);
    }

    const { subject } = template.config;

    const letterHtml = await templateParser.render(template.templateName, data);
    console.log('dd');

    await transporter.sendMail({
        from: 'Node JS course',
        to: email,
        subject,
        html: letterHtml
    });
};

const sendLogoutEmail = async (email, data = {}) => {
    await sendEmail(email, goodBye, data);
};

module.exports = {
    sendEmail,
    sendLogoutEmail
};
