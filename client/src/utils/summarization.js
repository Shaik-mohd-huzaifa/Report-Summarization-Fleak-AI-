export const summarizeReports = async (file_id, language, summary_type) =>
  await fetch(
    "https://data.fleak.ai/api/v1/events/8b867f22-6bb5-468b-ad6b-08ed7d19e3a3/prod",
    {
      method: "POST",
      headers: {
        "api-key": import.meta.env.VITE_PINATA_JWT,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          file_id: file_id,
          language: language,
          summary_type: summary_type,
        },
      ]),
    },
  )
    .then((response) => response.json())
    .then((data) => data.outputEvents[0].choices[0].message.content)
    .catch((error) => console.error("Error:", error));