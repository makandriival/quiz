export async function POST(request: Request) {
  const body = await request.json()

  // Save answers to db
  
  return new Response(`Pretend to save answers to db!`, { status: 200 })
}