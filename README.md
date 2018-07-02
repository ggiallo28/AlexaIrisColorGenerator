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
