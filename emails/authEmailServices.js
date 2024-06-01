import { createTransport } from  '../config/nodemailer.js'


export async function sendEmailVerification({name, email, token}) {
    const transporter = createTransport(
        "sandbox.smtp.mailtrap.io",
        2525,
        "3ea54951641626",
        "37750cee2fe701"
    )


    //Enviar Email de verificación

    const info = await transporter.sendMail({
        from: 'Fred Foo 👻 app salon',
        to: email,
        subject: 'Verifica tu cuenta',
        text: 'Hola, haz   click en el siguiente enlace para verificar tu cuenta',
        html: `<p>Hola ${name}, haz click en el siguiente enlace para verificar tu cuenta</p>
        <a href="http://localhost:3000/api/auth/verify/${token}">Verificar cuenta</a>
        <p>Si no has solicitado este correo, ignóralo</p>
        `
    });

    console.log("Mensaje enviado", info.messageId);

}