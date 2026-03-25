import mjml2html from "mjml";

export function resendOTP({ otp }) {
  const { html, errors } = mjml2html(`
  <mjml>
      <mj-head>
        <mj-attributes>
          <mj-all font-family="Arial, sans-serif" />
        </mj-attributes>
      </mj-head>

      <mj-body background-color="#f4f4f5">

        <!-- Header -->
        <mj-section background-color="black" padding="24px">
          <mj-column>
              <mj-image width="100px" src="https://res.cloudinary.com/da0fscj4t/image/upload/v1774354304/logo_kiwjpw.png"></mj-image>
          </mj-column>
        </mj-section>

        <!-- Body -->
        <mj-section background-color="#ffffff" padding="32px">
          <mj-column>
            <mj-text font-size="20px" font-weight="bold" color="#111111">
            Verify your email address
            </mj-text>
            <mj-text font-size="15px" color="#555555" line-height="24px">
            This is your final OTP attempt for account verification.

You have only 1 attempt remaining. If the verification fails, your request will be temporarily blocked.


Please ensure you enter the correct OTP.

If you didn’t request this, please ignore this email.

            </mj-text>
            <mj-text font-weight="bold" font-size="18px" align="center">
              Verification code
            </mj-text>
            
            <mj-text align="center" font-weight="bold" font-size="20px">
             ${otp}
            </mj-text>
            <mj-text align="center">
              (This code is valid for 5 minutes)
            </mj-text>
  
          </mj-column>
        </mj-section>

        <!-- Footer -->
        <mj-section padding="16px">
          <mj-column>
            <mj-text align="center" font-size="12px" color="#aaaaaa">
              If you didn't sign up, ignore this email.
            </mj-text>
          </mj-column>
        </mj-section>

      </mj-body>
    </mjml>
  `);

  if (errors.length > 0) {
    console.error("MJML errors:", errors);
  }

  return html;
}
