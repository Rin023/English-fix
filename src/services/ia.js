
const COHERE_API_KEY = 'P3OYbMcIQDKQcQcbrq0nSD5DdaVba5MlPNis1qYo'
const COHERE_API_GENERATE_URL = 'https://api.cohere.ai/v1/generate'


// curl--location--request POST 'https://api.cohere.ai/v1/generate' \
// --header 'Authorization: BEARER P3OYbMcIQDKQcQcbrq0nSD5DdaVba5MlPNis1qYo' \
// --header 'Content-Type: application/json' \
// --data - raw '{
// "model": "command-xlarge-beta",
//     "prompt": "Write a LinkedIn post about starting a career in tech:",
//         "max_tokens": 300,
//             "temperature": 0.9,
//                 "k": 0,
//                     "stop_sequences": [],
//                         "return_likelihoods": "NONE"
//     }'

export async function fixMyEnglish(input) {
    const data = {
        model: 'command-xlarge-beta',
        prompt: `This is spell checker generator.
        --
        Incorrect sample: "I are good!"
        Correct samble: "I am good!"
        --
        Incorrect sample: "I have 22 years old."
        Correct sample:"I am 22 years old."
        --
        Incorrect sample: "I don't can know"
        Correct sample: "I don't know"
        --
        Incorrect sample: "${input}"
        Correct sample:`,
        max_tokens: 40,
        temperature: 0.3,
        k: 0,
        p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop_sequences: ['--'],
        return_likeklihoods: 'NONE'

    }

    const response = await fetch(COHERE_API_GENERATE_URL, {
        method: 'POST',
        headers: {
            Authorization: `BEARER ${COHERE_API_KEY}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
    console.log(response)

    const { text } = response.generations[0]
    return text
        .replace('--', '')
        .replaceAll('"', '')
        .trim()
}


