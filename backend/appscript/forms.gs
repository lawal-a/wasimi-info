/**
 * Wasimi — Google App Script for form submission notifications
 *
 * Setup (once per form):
 * 1. Open your Google Form → click the three-dot menu → Script editor
 * 2. Paste this file (or the relevant function) into Code.gs
 * 3. Edit the CONFIG block below
 * 4. Click Run → onFormSubmit (to grant permissions)
 * 5. Triggers → Add trigger → onFormSubmit → On form submit
 *
 * Repeat for each of the 5 forms, changing FORM_TYPE each time.
 */

// ─── Edit this block ───────────────────────────────────────────────────────────
const CONFIG = {
  NOTIFY_EMAIL: 'lawal.abiodun101@gmail.com',  // who receives notifications
  FORM_TYPE: 'Pledge',           // Pledge | Volunteer | Refer | Subscribe | Give
  SHEET_NAME: 'Responses',       // the Sheet tab name (auto-created by Forms)
}
// ───────────────────────────────────────────────────────────────────────────────

function onFormSubmit(e) {
  const responses = e.response.getItemResponses()

  const lines = responses.map(r =>
    `<b>${r.getItem().getTitle()}</b><br>${r.getResponse()}`
  )

  const submitted = Utilities.formatDate(
    new Date(), Session.getScriptTimeZone(), 'dd MMM yyyy HH:mm'
  )

  const html = `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#211A10">
      <div style="background:#17110A;padding:20px 24px;border-bottom:2px solid #B8862F">
        <p style="color:#D6A84A;font-size:11px;letter-spacing:3px;margin:0;text-transform:uppercase">
          WASIMI · ${CONFIG.FORM_TYPE} Form
        </p>
        <h2 style="color:#F1E9D3;margin:8px 0 0;font-size:20px">
          New ${CONFIG.FORM_TYPE} submission
        </h2>
      </div>
      <div style="padding:24px;background:#F1E9D3;line-height:1.7">
        ${lines.join('<br><br>')}
        <hr style="border:none;border-top:1px solid #DDD3B8;margin:24px 0">
        <p style="color:#6B5C3F;font-size:12px;margin:0">
          Submitted ${submitted} via Wasimi Info
        </p>
      </div>
    </div>
  `

  GmailApp.sendEmail(
    CONFIG.NOTIFY_EMAIL,
    `[Wasimi] New ${CONFIG.FORM_TYPE} — ${submitted}`,
    'A new form was submitted. See the HTML version for details.',
    { htmlBody: html, name: 'Wasimi Info' }
  )
}

/**
 * Optional: run this once to verify your script is working.
 * It will send a test notification to NOTIFY_EMAIL.
 */
function testNotification() {
  GmailApp.sendEmail(
    CONFIG.NOTIFY_EMAIL,
    `[Wasimi] Script test — ${CONFIG.FORM_TYPE}`,
    'App Script is connected and working for the ' + CONFIG.FORM_TYPE + ' form.',
    { name: 'Wasimi Info' }
  )
  Logger.log('Test email sent to ' + CONFIG.NOTIFY_EMAIL)
}
