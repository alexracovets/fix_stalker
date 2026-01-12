'use server'

import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { google } from 'googleapis'

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI,
)

const scopes = [process.env.GMAIL_SCOPE || 'https://mail.google.com/']

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  scope: scopes,
})

console.log('Authorize this app by visiting this url:', url)

export async function generateSMTP(): Promise<void> {
  const rl = readline.createInterface({ input, output })

  try {
    const code = await rl.question('Enter the code from that page here: ')
    const { tokens } = await oauth2Client.getToken(code)

    if (!tokens.refresh_token) {
      console.error('No refresh_token returned. Ensure prompt=consent and correct scope.')
      return
    }

    console.log('Refresh token:', tokens.refresh_token)
  } catch (error) {
    console.error('Error retrieving access token', error)
  } finally {
    rl.close()
  }
}
