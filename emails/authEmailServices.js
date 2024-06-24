import { createTransport } from  '../config/nodemailer.js'


export async function sendEmailVerification({name, email, token}) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )


    //Enviar Email de verificación

    const info = await transporter.sendMail({
        from: 'Fred Foo 👻 app salon <appsalon@correo.com>',
        to: email,
        subject: 'Verifica tu cuenta',
        text: 'Hola, haz   click en el siguiente enlace para verificar tu cuenta',
        html: `<p>Hola ${name}, haz click en el siguiente enlace para verificar tu cuenta</p>
        <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}">Verificar cuenta</a>
        <p>Si no has solicitado este correo, ignóralo</p>
        `
    });

    console.log("Mensaje enviado", info.messageId);

}