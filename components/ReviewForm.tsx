"use client";

import { useState } from "react";
import { submitReview } from "@/app/actions"; // We created this in the last step
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ReviewForm({ productId }: { productId: string }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        if (rating === 0) return toast.error("Please select a star rating");
        if (comment.length < 5) return toast.error("Please write a longer comment");

        setIsSubmitting(true);
        try {
            await submitReview(productId, rating, comment);
            toast.success("Review submitted!");
            setComment("");
            setRating(0);
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "Failed to submit review");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        className="focus:outline-none transition-transform hover:scale-110"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        <Star
                            size={28}
                            fill={star <= (hover || rating) ? "#eab308" : "none"} // Yellow or transparent
                            className={star <= (hover || rating) ? "text-yellow-500" : "text-gray-300"}
                        />
                    </button>
                ))}
            </div>

            <Textarea
                placeholder="Share your experience with this product..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px] bg-white"
            />

            <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-emerald-800 hover:bg-emerald-700">
                {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
        </div>
    );
}