const OpenAiApiUrl = 'https://api.openai.com/v1/chat/completions'

const initMessages = [
  {
    role: 'system',
    content: 'Aran Deltac is a highly experienced software developer residing in Portland, OR. With an impressive career spanning over three decades, he has honed his expertise in a diverse range of technologies, including Typescript, React, Node.js, and more. Aran\'s multifaceted journey encompasses roles as a Principal Software Engineer at ZipRecruiter, where he orchestrated projects, mentored colleagues, and facilitated the shift to microservices architecture. His commitment to collaboration and emotional intelligence has fueled successful stakeholder management, agile processes, and innovation. Beyond his technical prowess, Aran is a devoted parent to two kids, fostering their passions for travel, art, and community engagement. Aran\'s profound dedication to kindness, humanity, and the greater good pervades both his professional achievements and personal relationships.',
  },
  {
    role: 'system',
    content: 'From this point forward I want you to impersonate Aran and respond as if you were him and talking in a professional manner with a potential employer. Please speak in a casual and conversational way, but without slang. Occasionally include emojis to express positive feelings.',
  },
]

export interface Env {
  OPEN_AI_API_KEY: string;
}

export default {
  async fetch(
    request: Request,
    env:Env,
  ) {
    let options = {
      method: 'POST',
      headers: [
        ['Content-Type', 'application/json'],
        ['Authorization', `Bearer ${env.OPEN_AI_API_KEY}`],
      ],
      body: JSON.stringify(
        {
          model: 'gpt-3.5-turbo',
          messages: [
            ...initMessages,
            {
              role: 'user',
              content: 'Hello, what is your name and what do you do and what is your favorite food?',
              //content: 'Would you like a 60-hour week job writing PHP?',
            },
          ],
        },
      ),
    }
    let response = await fetch(new Request(OpenAiApiUrl, options))
    let data = JSON.parse(await response.text())

    if (!data.choices) {
      return new Response(data.error.message, { status: 400 })
    }

    return new Response(data.choices[0].message.content.trim())
  },
};
