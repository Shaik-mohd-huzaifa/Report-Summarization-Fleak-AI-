import { useState } from "react";
import { pinata } from "../../utils/config";
import { languages, types } from "./../../assets/data/data";
import "./reportSummarization.styles.scss";
import Markdown from "react-markdown";
import { summarizeReports } from "../../utils/summarization";
import uploadFile from "../../utils/fileupload";

const initial_option_state = {
  language: "",
  summary_type: "",
};

function ReportSummarization() {
  const [selectedFile, setSelectedFile] = useState("");
  const [summary, setSummary] = useState("");
  const [inputData, setInputData] = useState(initial_option_state);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async () => {
    try {
      await uploadFile(selectedFile, selectedFile.name);
      console.log("File Uploaded, Summarizating....");
      const data = await summarizeReports(
        selectedFile.name,
        inputData.language,
        inputData.summary_type,
      ); // Await the async call
      setSummary(data);
    } catch (error) {
      console.log(error);
    }
  };

  const HandleChange = (e) => {
    const { name, value } = e.target; // Correctly destructure the target properties
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="report-summary-container">
        <div className="filters-bar">
          {/* Language Selector */}
          <p className="header">Report Summarization</p>
          <div className="">
            <select
              id="language"
              onChange={HandleChange}
              name="language"
              value={inputData.language} // Control the selected value
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Choose a Language</option>
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>

            {/* Summary Type Selector */}
            <select
              id="summary_type"
              onChange={HandleChange}
              name="summary_type"
              value={inputData.summary_type} // Control the selected value
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Choose Summarization Type</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <button onClick={handleSubmission} className="submit-button">
              Submit
            </button>
          </div>
        </div>

        <div className="file-upload-container">
          <div className="file-upload flex items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={changeHandler}
              />
            </label>
          </div>
        </div>

        <div className="summary-container border-2 border-gray-300 border-dashed rounded-lg bg-50">
          {summary && <Markdown>{summary}</Markdown>}
        </div>
      </div>
    </>
  );
}

export default ReportSummarization;
