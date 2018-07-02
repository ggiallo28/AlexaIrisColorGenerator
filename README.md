# alexa-random-number-generator
Random number generator for Amazon Alexa

{
    "Version": "2008-10-17",
    "Statement": [
        {
            "Sid": "AllowPublicRead",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::color-generator/*"
        }
    ]
}


TODO
Correggere i colori
Verde -> Tè Verde ?
Rosso -> Rosso Opaco

gestire colori sconosciuti errore


TEST:
OK: chiedi a iride un colore casuale

OK: chiedi a iride una combinazione analoga con il rosso
OK: chiedi a iride una combinazione analoga
OK: chiedi a iride una combinazione con il rosso
OK: chiedi a iride una combinazione
OK: chiedi a iride una combinazione asdasd con il asdasd
OK: chiedi a iride una combinazione asdsd (la sceglie a caso)
OK: chiedi a iride una combinazione con il asdasd

OK: chiedi a iride aggiungi un colore
    - rosso
    - no
    - verde
    - certo
OK: chiedi a iride aggiungi il ciano (colore non in lista)
OK: chiedi a iride aggiungi il ciano (colore già in lista)

chiedi a iride aggiungi il asdasdasd <Audio only response>

OK: chiedi a iride rimuovi il ciano (colore già in lista)
OK: chiedi a iride rimuovi il ciano (colore non in lista)
chiedi a iride rimuovi il asdasdasd <Audio only response>

chiedi a iride un colore casuale dai preferiti (non capisce)
OK: Chiedi a Iride un colore preferito (quindi è un problema di modello)

OK: chiedi a iride quali sono i miei colori preferiti
