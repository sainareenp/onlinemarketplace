"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RatePage() {
  const [rating, setRating] = useState<number | null>(null);
  const [usefulnessRating, setUsefulnessRating] = useState<number | null>(null);
  const [productRating, setProductRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleRating = (question: string, value: number) => {
    if (question === "usefulness") {
      setUsefulnessRating(value);
    } else if (question === "product") {
      setProductRating(value);
    } else {
      setRating(value);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // Optionally save the ratings to a database or API here
  };

  return (
                      <div className="flex items-center justify-center min-h-screen w-screen bg-background px-4">
<Card className="w-full max-w-md p-6 shadow-md rounded-lg">
<CardHeader>
          <CardTitle className="text-2xl text-center">Rate SecureMarket</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p>We’d love your feedback! Please answer the following questions:</p>

          {/* Question 1: How useful is the app? */}
          <div>
            <p className="mb-2">How useful is this app?</p>
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5].map((num) => (
                <Button
                  key={num}
                  variant={usefulnessRating === num ? "default" : "outline"}
                  onClick={() => handleRating("usefulness", num)}
                >
                  {num} ⭐
                </Button>
              ))}
            </div>
          </div>

          {/* Question 2: Did you find your relevant products? */}
          <div>
            <p className="mb-2">Did you find your relevant products?</p>
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5].map((num) => (
                <Button
                  key={num}
                  variant={productRating === num ? "default" : "outline"}
                  onClick={() => handleRating("product", num)}
                >
                  {num} ⭐
                </Button>
              ))}
            </div>
          </div>

          {/* General Question: Overall Experience */}
          <div>
            <p className="mb-2">How would you rate your overall experience?</p>
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5].map((num) => (
                <Button
                  key={num}
                  variant={rating === num ? "default" : "outline"}
                  onClick={() => handleRating("overall", num)}
                >
                  {num} ⭐
                </Button>
              ))}
            </div>
          </div>

          {/* Show feedback message after submission */}
          {submitted && (
            <div className="mt-4 text-green-500 text-center">
              <p>Thanks for your feedback! Your ratings are valuable to us.</p>
            </div>
          )}

          {/* Submit Button */}
          {!submitted && (
            <div className="text-center mt-4">
              <Button onClick={handleSubmit}>Submit Feedback</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
