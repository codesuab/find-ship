<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title>Your FindShip Verification Code</title>
    <style>
        :root {
            --primary-color: #f4671d;
            --primary-hover: #d35d1e;
            --bg-color: #f4f7f6;
            --card-bg: #ffffff;
            --text-main: #0f172a;
            --text-secondary: #475569;
            --text-muted: #64748b;
            --border-color: #e2e8f0;
            --otp-bg: #f8fafc;
            --otp-border: #cbd5e1;
            --font-main: 'Inter', Helvetica, Arial, sans-serif;
            --font-mono: 'Inter', Courier, monospace;
        }

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        body {
            margin: 0;
            padding: 0;
            width: 100%;
            word-break: break-word;
            -webkit-font-smoothing: antialiased;
            background-color: var(--bg-color, #f4f7f6);
        }

        *::selection {
            color: white;
            background: var(--primary-color);
        }

        *::-moz-selection {
            color: white;
            background: var(--primary-color);
        }

        /* Essential reset for tables */
        table,
        td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        /* Image reset */
        img {
            border: 0;
            line-height: 100%;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }

        /* Default typography */
        h1,
        h2,
        h3,
        p,
        a {
            font-family: var(--font-main, 'Inter', Helvetica, Arial, sans-serif);
            color: var(--text-main, #1e293b);
        }

        /* Main container styling */
        .wrapper {
            width: 100%;
            table-layout: fixed;
            background-color: var(--bg-color, #f4f7f6);
            padding-bottom: 60px;
        }

        .webkit {
            max-width: 600px;
            background-color: var(--card-bg, #ffffff);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
            margin: 40px auto 0;
        }

        .outer {
            Margin: 0 auto;
            width: 100%;
            max-width: 600px;
            border-spacing: 0;
            font-family: var(--font-main, 'Inter', Helvetica, Arial, sans-serif);
            color: var(--text-secondary, #475569);
        }

        .logo {
            width: 50px;
            height: 50px;
        }

        @media screen and (max-width: 600px) {
            .wrapper {
                padding-bottom: 30px;
            }

            .webkit {
                margin: 20px auto 0;
                width: 95% !important;
                /* Force width on mobile */
                border-radius: 12px;
            }

            .content-padding {
                padding: 30px 20px !important;
            }

            h1 {
                font-size: 24px !important;
            }

            .otp-container {
                padding: 12px 20px !important;
            }

            .otp-text {
                font-size: 28px !important;
                letter-spacing: 6px !important;
            }

            p {
                font-size: 15px !important;
            }

            .footer-links td {
                display: block;
                text-align: center;
                padding: 5px 0 !important;
            }

            .footer-separator {
                display: none;
            }
        }
    </style>
    <!--[if mso]>
    <style type="text/css">
        body, table, td, h1, p, a {font-family: Arial, sans-serif !important;}
    </style>
    <![endif]-->
</head>

<body>
    <div class="wrapper">
        <!--[if mso]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top">
        <![endif]-->

        <div class="webkit">
            <table class="outer" align="center">

                <tr>
                    <td style="padding: 40px 40px 0; text-align: center;" class="content-padding">
                        <!-- Placeholder for Logo -->
                        <img src="{{asset('/media/system/find-ship-logo.avif')}}" class="logo">
                    </td>
                </tr>

                <tr>
                    <td style="padding: 10px 40px 30px; text-align: center;" class="content-padding">
                        <h1
                            style="margin: 0 0 16px; font-size: 28px; font-weight: 700; color: var(--text-main, #0f172a); line-height: 1.3;">
                            Your verification code
                        </h1>
                        <p
                            style="margin: 0 0 32px; font-size: 16px; line-height: 1.6; color: var(--text-secondary, #475569);">
                            Welcome to <strong>FindShip</strong>! Use the verification code below to complete your
                            sign-in process.
                        </p>

                        <table border="0" cellspacing="0" cellpadding="0"
                            style="margin: 0 auto; width: 100%; max-width: 300px;">
                            <tr>
                                <td align="center" class="otp-container"
                                    style="background-color: var(--otp-bg, #f8fafc); border-radius: 8px; padding: 16px 32px; border: 2px dashed var(--otp-border, #cbd5e1);">
                                    <span class="otp-text" style="font-family: var(--font-mono, 'Inter', Courier, monospace); font-size: 36px; font-weight: 700; color: var(--text-main, #0f172a); letter-spacing: 8px; display: inline-block; padding-left: 8px;">{{$data['otp']}}</span>
                                </td>
                            </tr>
                        </table>

                        <p style="margin: 32px 0 0; font-size: 14px; line-height: 1.5; color: var(--text-muted, #64748b);"
                            class="text-muted">
                            This code will expire in 10 minutes.<br>
                            If you did not request this code, please safely ignore this email.
                        </p>
                    </td>
                </tr>

                <tr>
                    <td style="padding: 30px 40px 40px; border-top: 1px solid var(--border-color, #e2e8f0); background-color: var(--otp-bg, #f8fafc);"
                        class="content-padding divider">
                        <p style="margin: 0; font-size: 12px; color: var(--text-muted, #94a3b8); text-align: center;"
                            class="text-muted">
                            &copy; 2026 {{config('app.name')}}. All rights reserved.<br>
                            123 Logistics Way, Suite 100, San Francisco, CA 94107
                        </p>

                        <table class="footer-links" align="center" border="0" cellpadding="0" cellspacing="0"
                            style="margin-top: 20px; width: 100%; max-width: 300px;">
                            <tr>
                                <td align="center" style="padding: 0 10px;">
                                    <a href="#"
                                        style="color: var(--text-muted, #94a3b8); text-decoration: none; font-size: 13px; font-weight: 500;">Privacy
                                        Policy</a>
                                </td>
                                <td align="center" class="footer-separator"
                                    style="color: var(--otp-border, #cbd5e1); width: 20px;">&bull;</td>
                                <td align="center" style="padding: 0 10px;">
                                    <a href="#"
                                        style="color: var(--text-muted, #94a3b8); text-decoration: none; font-size: 13px; font-weight: 500;">Terms
                                        of Service</a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

            </table>
        </div>

        <!--[if mso]>
        </td>
        </tr>
        </table>
        <![endif]-->
    </div>
</body>

</html>