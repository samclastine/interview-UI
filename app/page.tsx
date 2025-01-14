"use client";

import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import styles from "../styles/page.module.css";
import { usePayloadContext } from "@/context/payloadProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { scriptPayload, setScriptPayload, setResultPayload, score, setScore, resultPayload } = usePayloadContext();
  const [value, setValue] = useState<string>();
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter(); // Next.js router

  const handleInputChange = (event: any) => {
    setScriptPayload(event.target.value);
  };
  const extractOverallScore = (payload: any) => {
    console.log("Raw Payload:", payload);
    try {
      const cleanPayload = payload
        .replace(/```json|```/g, "") // Remove Markdown code block markers
        .replace(/\n/g, "") // Remove newline characters
        .trim(); // Trim any extra whitespace
  
      console.log("Cleaned Payload:", cleanPayload);
  
      const parsedPayload = JSON.parse(cleanPayload);
      let score = parsedPayload.Overall_Score;
  
      if (typeof score === "string" && score.includes("%")) {
        // Remove '%' and convert to integer
        score = parseInt(score.replace("%", ""), 10);
      }
  
      console.log("Processed Overall Score:", score);
      return score || null; // Return the processed score or null if invalid
    } catch (error: any) {
      console.error("Failed to parse JSON:", error.message);
      return null; // Return null if parsing fails
    }
  };
  
  const handleClick = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch("https://0pdqa41x4c.execute-api.eu-north-1.amazonaws.com/api/payload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({ script: scriptPayload }),
      });

      if (!response.ok) {
        throw new Error("Failed to send payload to server");
      }

      const result = await response.json();
      setResultPayload(result);
      let _score = await extractOverallScore(result.message.Result)
      console.log(_score);
      
      setScore(_score)
      console.log("Payload sent successfully", result);

      // Redirect to the dashboard after success
      router.push("/dashboard");
    } catch (error) {
      console.error("Error sending payload:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <section className={styles["sectionPage"]}>
      <div className={styles["parentContainer"]}>
        <Textarea
          className={styles.textArea}
          label="Video Script"
          placeholder="Enter your video script"
          minRows={25}
          value={value}
          onInput={handleInputChange}
        />
        <Button
          color="primary"
          className={styles.button}
          onPress={handleClick}
          isDisabled={loading} // Disable button while loading
        >
          {loading ? "Loading..." : "Next"} {/* Change button text while loading */}
        </Button>
      </div>
    </section>
  );
}
