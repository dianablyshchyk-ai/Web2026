export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  console.log('Нове замовлення підписки:', body)
  await new Promise((resolve) => setTimeout(resolve, 800))
  if (!body.fullName || !body.fullCard) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Будь ласка, заповніть ім’я та дані картки',
    })
  }

  return {
    status: 'success',
    message: 'Підписка успішно активована',
    data: {
      user: body.fullName,
      plan: body.plan,
      billing: body.billingCycle,
      activatedAt: new Date().toISOString()
    }
  }
})
