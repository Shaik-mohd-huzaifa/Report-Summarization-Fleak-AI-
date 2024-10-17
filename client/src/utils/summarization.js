export const summarizeReports = async (file_name, language, summary_type) =>
  await fetch(
    "https://data.fleak.ai/api/v1/events/8b867f22-6bb5-468b-ad6b-08ed7d19e3a3/dev",
    {
      method: "POST",
      headers: {
        "api-key": import.meta.env.FLEAK_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          bucket_name: "patienteports",
          file_key: file_name,
          language: language,
          summary_type: summary_type,
        },
      ]),
    },
  )
    .then((response) => response.json())
    .then((data) => data.message.content)
    .catch((error) => console.error("Error:", error));
