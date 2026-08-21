<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title>Verify your {{config('app.name')}} account</title>
    <style>
        :root {
            --primary-color: #f4671d; /* Deeper, more corporate blue */
            --bg-color: #f3f4f6;
            --card-bg: #ffffff;
            --text-main: #0f172a;
            --text-secondary: #374151;
            --text-muted: #6b7280;
            --border-color: #e5e7eb;
            --otp-bg: #f9fafb;
            --otp-border: #d1d5db;
            --warning-bg: #fef2f2;
            --warning-text: #991b1b;
            --font-main: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            --font-mono: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
        }

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        
        body {
            margin: 0;
            padding: 0;
            width: 100%;
            word-break: break-word;
            -webkit-font-smoothing: antialiased;
            background-color: var(--bg-color, #f3f4f6);
        }

        table, td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            border: 0;
            line-height: 100%;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }

        h1, h2, h3, p, a {
            font-family: var(--font-main, 'Inter', Helvetica, Arial, sans-serif);
            color: var(--text-main, #111827);
        }

        .wrapper {
            width: 100%;
            table-layout: fixed;
            background-color: var(--bg-color, #f3f4f6);
            padding-bottom: 60px;
            padding-top: 40px;
        }

        .webkit {
            max-width: 600px;
            background-color: var(--card-bg, #ffffff);
            border-radius: 8px; /* Slightly sharper corners for a professional look */
            border: 1px solid var(--border-color, #e5e7eb);
            overflow: hidden;
            margin: 0 auto;
        }

        .outer {
            Margin: 0 auto;
            width: 100%;
            max-width: 600px;
            border-spacing: 0;
            font-family: var(--font-main, 'Inter', Helvetica, Arial, sans-serif);
            color: var(--text-secondary, #374151);
        }

        @media screen and (max-width: 600px) {
            .wrapper {
                padding-top: 20px;
                padding-bottom: 20px;
            }
            .webkit {
                width: 95% !important;
                border-radius: 8px;
            }
            .content-padding {
                padding: 32px 24px !important;
            }
            h1 {
                font-size: 22px !important;
            }
            .otp-container {
                padding: 16px 20px !important;
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
                padding: 8px 0 !important;
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
                
                <!-- Header / Logo -->
                <tr>
                    <td style="padding: 40px 48px 0;" class="content-padding">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td align="left">
                                   <img src="{{asset('/media/system/find-ship-logo.avif')}}" class="findship logo">
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <!-- Main Content -->
                <tr>
                    <td style="padding: 10px 48px 30px;" class="content-padding">
                        <h1 style="margin: 0 0 16px; font-size: 24px; font-weight: 600; color: var(--text-main, #111827); line-height: 1.3;">
                            Verify your identity
                        </h1>
                        <p style="margin: 0 0 32px; font-size: 15px; line-height: 1.6; color: var(--text-secondary, #374151);">
                            We received a request to sign in to your <strong>FindShip</strong> account. Please enter the following single-use verification code to securely access your account.
                        </p>
                        
                        <!-- OTP Box -->
                        <table border="0" cellspacing="0" cellpadding="0" style="width: 100%;">
                            <tr>
                                <td align="center" class="otp-container" style="background-color: var(--otp-bg, #f9fafb); border-radius: 6px; padding: 20px 32px; border: 1px solid var(--otp-border, #d1d5db);">
                                    <span class="otp-text" style="font-family: var(--font-mono, 'SFMono-Regular', Consolas, monospace); font-size: 32px; font-weight: 600; color: var(--text-main, #111827); letter-spacing: 12px; display: inline-block; padding-left: 12px;">{{$data['otp']}}</span>
                                </td>
                            </tr>
                        </table>
                        
                        <!-- Security Warning -->
                        <p style="margin: 32px 0 0; font-size: 14px; line-height: 1.5; color: var(--text-muted, #6b7280);" class="text-muted">
                            This code is valid for the next 10 minutes.
                        </p>
                        
                        <div style="margin-top: 16px; padding: 12px 16px; background-color: var(--warning-bg, #fef2f2); border-left: 4px solid var(--warning-text, #991b1b); border-radius: 0 4px 4px 0;">
                            <p style="margin: 0; font-size: 13px; line-height: 1.5; color: var(--warning-text, #991b1b);">
                                <strong>Security Notice:</strong> Never share this code with anyone. FindShip personnel will never ask you for this code. If you did not request this, please ignore this email or contact support.
                            </p>
                        </div>
                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td style="padding: 32px 48px; border-top: 1px solid var(--border-color, #e5e7eb); background-color: var(--otp-bg, #f9fafb);" class="content-padding divider">
                        
                        <table class="footer-links" align="center" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 20px; width: 100%; max-width: 400px;">
                            <tr>
                                <td align="center" style="padding: 0 12px;">
                                    <a href="#" style="color: var(--primary-color, #1d4ed8); text-decoration: none; font-size: 13px; font-weight: 500;">Contact Support</a>
                                </td>
                                <td align="center" class="footer-separator" style="color: var(--otp-border, #d1d5db); width: 10px;">|</td>
                                <td align="center" style="padding: 0 12px;">
                                    <a href="#" style="color: var(--primary-color, #1d4ed8); text-decoration: none; font-size: 13px; font-weight: 500;">Privacy Policy</a>
                                </td>
                                <td align="center" class="footer-separator" style="color: var(--otp-border, #d1d5db); width: 10px;">|</td>
                                <td align="center" style="padding: 0 12px;">
                                    <a href="#" style="color: var(--primary-color, #1d4ed8); text-decoration: none; font-size: 13px; font-weight: 500;">Terms of Service</a>
                                </td>
                            </tr>
                        </table>

                        <p style="margin: 0; font-size: 12px; line-height: 1.5; color: var(--text-muted, #6b7280); text-align: center;" class="text-muted">
                            &copy; 2026 {{config('app.name')}}. All rights reserved.<br>
                            123 Logistics Way, Suite 100, San Francisco, CA 94107
                        </p>
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