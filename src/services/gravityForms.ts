export interface SubmissionResponse {
  isSuccess: boolean;
  message?: string;
}

export const submitToGravityForm = async (
  formType: 'general' | 'client' | 'partnership' | 'talent' | 'newsletter',
  fieldData: Record<string, any>
): Promise<SubmissionResponse> => {
  const isDev = import.meta.env.DEV;

  try {
    const response = await fetch("/api/submit-enquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formType, ...fieldData }),
    });

    // Fallback for local development when running pure Vite dev server (which has no backend serverless proxy)
    if (isDev && response.status === 404) {
      console.warn(`Dev mode fallback: /api/submit-enquiry returned 404 for ${formType}. Simulating successful form submission.`);
      return { isSuccess: true };
    }

    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse response as JSON. Response text:", responseText);
      return {
        isSuccess: false,
        message: responseText.includes("An error occurred")
          ? "Server function crashed. Please check Vercel logs."
          : `Server returned non-JSON: ${responseText.slice(0, 100)}`
      };
    }

    if (response.ok && data.is_valid) {
      return { isSuccess: true };
    } else {
      let errMsg = data.message || "Failed to submit form.";
      if (data.details) {
        errMsg += ` (${typeof data.details === 'object' ? JSON.stringify(data.details) : data.details})`;
      }
      return { 
        isSuccess: false, 
        message: errMsg 
      };
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    if (isDev) {
      console.warn("Dev mode fallback: Network error occurred. Simulating successful form submission.");
      return { isSuccess: true };
    }
    return { isSuccess: false, message: "Network error occurred." };
  }
};
