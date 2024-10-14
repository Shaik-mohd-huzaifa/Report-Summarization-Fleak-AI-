# Report Summarization Using Fleak AI Workflow

A tool for healthcare industry which will help patient summarize their healthcare reports in any format and language of choice. This tool will help people with language barriers to understand the reports in a layman manner.

![](https://github.com/Shaik-mohd-huzaifa/Report-Summarization-Fleak-AI-/blob/1b8b13649b40b5db8737effc6ea7b08a21a3144c/Demo.png)

## Built using Fleak AI

__What is Fleak AI?__
Fleak is a low-code, serverless platform that empowers data teams to instantly build and deploy scalable APIs. Seamlessly integrate with your existing AI and data stack—no infrastructure management required.

## Report Summarization Fleak API Workflow


![](https://github.com/Shaik-mohd-huzaifa/Report-Summarization-Fleak-AI-/blob/1b8b13649b40b5db8737effc6ea7b08a21a3144c/workflow.png)

## How did the Workflow invoked and where?

- The workflow is deployed on fleak.ai and it is invoked using __API Endpoint__
- We are calling the Endpoint in our react client app.
- Code for API Endpoint calling
## Function for API Endpoint Calling
```js
export const summarizeReports = async (file_id, language, summary_type) =>
  await fetch(
    "https://data.fleak.ai/api/v1/events/8b867f22-6bb5-468b-ad6b-08ed7d19e3a3/prod", // WorkFlow API endpoint
    {
      method: "POST",
      headers: {
        "api-key": import.meta.env.FLEAK_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          file_id:
                file_id,
          language: language,
          summary_type: summary_type,
        },
      ]),
    },
  )
    .then((response) => response.json())
    .then((data) => data.outputEvents[0].choices[0].message.content)
    .catch((error) => console.error("Error:", error));

```

## React Component where the function is called 
  ```js
  const handleSubmission = async () => {
    try {
      const upload = await pinata.upload.file(selectedFile);
      const file_id = upload.cid; // Use 'const' for the variable
      console.log("File Uploaded, Summarizating....");
      const data = await summarizeReports(
        file_id,
        inputData.language,
        inputData.summary_type,
      ); // Await the async call
      setSummary(data);
    } catch (error) {
      console.log(error);
    }
  };

  ```

This is a Vite React application that utilizes environment variables for configuration. The project is set up to use the following environment variables:

- `FLEAK_API_KEY`
- `VITE_PINATA_JWT`
- `VITE_GATEWAY_URL`

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/Shaik-mohd-huzaifa/Report-Summarization-Fleak-AI-)
   cd Report Summarization Fleak AI/client

2. **Install dependencies**

   Install the project dependencies using npm or yarn:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root of your project and add the following:

   ```env
   # .env
   FLEAK_API_KEY=your_fleak_api_key_value
   VITE_PINATA_JWT=your_vite_pinata_jwt_value
   VITE_GATEWAY_URL=your_vite_gateway_url_value
   ```

   Make sure to replace `your_fleak_api_key_value`, `your_vite_pinata_jwt_value`, and `your_vite_gateway_url_value` with your actual values.

4. **Run the development server**

   Start the Vite development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:5173`.

## Scripts

- `npm run dev` or `yarn dev`: Starts the development server.
- `npm run build` or `yarn build`: Builds the project for production.
- `npm run preview` or `yarn preview`: Locally preview the production build.

## Using Environment Variables in the Code

In Vite, environment variables must be prefixed with `VITE_` to be accessible in the code. For example:

```javascript
// src/config.js
export const FLEAK_API_KEY = import.meta.env.FLEAK_API_KEY;
export const VITE_PINATA_JWT = import.meta.env.VITE_PINATA_JWT;
export const VITE_GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL;
```

You can then use these variables anywhere in your React components.

## Build for Production

To build the project for production, run:

```bash
npm run build
# or
yarn build
```

The output will be in the `dist` folder.

## Deployment

After building the project, you can deploy the contents of the `dist` folder to any static hosting service, such as [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com/), or [GitHub Pages](https://pages.github.com/).

