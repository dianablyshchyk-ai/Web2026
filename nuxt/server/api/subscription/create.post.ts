export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  console.log('Отримано новий запит на підписку:', body)

  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (!body.fullName || !body.cardNumber) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Будь ласка, заповніть усі обов’язкові поля',
    })
  }

  return {
    status: 'success',
    message: 'Підписка успішно створена!',
    receivedData: {
      plan: body.plan,
      user: body.fullName,
      date: new Date().toISOString()
    }
  }
})
