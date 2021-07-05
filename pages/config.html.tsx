import Script from "next/script";

export default function Panel() {
    return (
        <html lang="en">
        <head>
            <meta charSet="UTF-8"/>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Document</title>
        </head>
        <body>
        <Script src="https://extension-files.twitch.tv/helper/v1/twitch-ext.min.js"></Script>
        <h1>Hello Config</h1>
        </body>
        </html>);
}
