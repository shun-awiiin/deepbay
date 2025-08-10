'use server'

export interface SeminarRegistrationState {
  success: boolean
  message: string
  errors?: { email?: string; name?: string }
}

export async function registerSeminar(
  _prevState: SeminarRegistrationState | null,
  formData: FormData
): Promise<SeminarRegistrationState> {
  // Simulate processing delay
  await new Promise((r) => setTimeout(r, 900))

  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const company = String(formData.get('company') || '').trim()
  const plan = String(formData.get('plan') || '').trim()

  const errors: SeminarRegistrationState['errors'] = {}
  if (!name) errors.name = 'お名前は必須です'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = '有効なメールアドレスをご入力ください'

  if (errors.email || errors.name) {
    return { success: false, message: '入力内容をご確認ください', errors }
  }

  // In a real app, you'd store this in your CRM/DB or send to your ESP here.
  console.log('Seminar registration:', { name, email, company, plan })

  return {
    success: true,
    message: 'お申し込みを受け付けました。詳細をメールでご案内します。'
  }
}
