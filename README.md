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
usare funzione per ottenere gli slot
aggiungere descrizione




1700 colori sono troppi? puoi creare la tua lista preferita dicendo..

per aggiungere
per rimuovere
per ottenere un preferito
per avere tutta la lista
