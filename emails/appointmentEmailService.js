import { createTransport } from  '../config/nodemailer.js'




export async function sendEmailAppointment({date, time}){

    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

      //Enviar Email de verificación

      const info = await transporter.sendMail({
        from: 'Fred Foo 👻 app salon <citas@correo.com>',
        to: 'admin@appsalon.com',
        subject: 'Nueva cita',
        text: 'AppSalon - Nueva cita',
        html: `<p>Hola Admin, tienes una nueva cita</p>
        <p>La cita sería el día: ${date}, a las ${time} horas</p></p>
        `
    });

    console.log("Mensaje enviado", info.messageId);

}

export async function sendEmailUpdateAppointment({date, time}){

    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

      //Enviar Email de verificación

      const info = await transporter.sendMail({
        from: 'Fred Foo 👻 app salon <citas@correo.com>',
        to: 'admin@appsalon.com',
        subject: 'Cita Actualizada',
        text: 'AppSalon - Cita Actualizada',
        html: `<p>Hola Admin, un usuario a modificado una cita</p>
        <p>La cita sería el día: ${date}, a las ${time} horas</p></p>
        `
    });

    console.log("Mensaje enviado", info.messageId);

      
}

    export async function sendEmailCancelledAppointment({date, time}){

        const transporter = createTransport(
            process.env.EMAIL_HOST,
            process.env.EMAIL_PORT,
            process.env.EMAIL_USER,
            process.env.EMAIL_PASS
        )
    
          //Enviar Email de verificación
    
          const info = await transporter.sendMail({
            from: 'Fred Foo 👻 app salon <citas@correo.com>',
            to: 'admin@appsalon.com',
            subject: 'Cita Cancelada',
            text: 'AppSalon - Cita Cancelada',
            html: `<p>Hola Admin, un usuario a cancelado una cita</p>
            <p>La cita que estaba programada para: ${date}, a las ${time} horas fue cancelada.</p></p>
            `
        });
    
        console.log("Mensaje enviado", info.messageId);
    
    }