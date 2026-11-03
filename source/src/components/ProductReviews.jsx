import { useState } from "react";

function getSavedReviews(storageKey) {
  try {
    const saved = localStorage.getItem(storageKey);
    const parsed = saved ? JSON.parse(saved) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function ProductReviews({ productId }) {
  const storageKey = `shopsy-reviews-${productId}`;

  const [reviews, setReviews] = useState(() =>
    getSavedReviews(storageKey)
  );

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedComment = comment.trim();

    if (!trimmedName || !trimmedComment) return;

    const newReview = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: trimmedName,
      rating,
      comment: trimmedComment,
      date: new Date().toLocaleDateString("en-IN"),
    };

    const updatedReviews = [newReview, ...reviews];

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(updatedReviews)
      );

      setReviews(updatedReviews);
      setName("");
      setRating(5);
      setComment("");
    } catch (error) {
      console.error("Unable to save product review:", error);
    }
  }

  const averageRating = reviews.length
    ? (
        reviews.reduce(
          (sum, review) => sum + Number(review.rating || 0),
          0
        ) / reviews.length
      ).toFixed(1)
    : "0.0";

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Customer Reviews
      </h2>

      <p className="mt-2 text-gray-600">
        ⭐ {averageRating} / 5 · {reviews.length} review(s)
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor={`review-name-${productId}`}
            className="mb-1 block text-sm font-medium"
          >
            Your Name
          </label>

          <input
            id={`review-name-${productId}`}
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
            required
            maxLength={60}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Your Rating
          </label>

          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                aria-label={`Rate ${star} out of 5`}
                aria-pressed={rating === star}
                className={`text-3xl transition ${
                  star <= rating
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor={`review-comment-${productId}`}
            className="mb-1 block text-sm font-medium"
          >
            Your Review
          </label>

          <textarea
            id={`review-comment-${productId}`}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="What did you think about this product?"
            required
            maxLength={1000}
            rows={4}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
        >
          Submit Review
        </button>
      </form>

      <div className="mt-8 space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500">
            No reviews yet. Be the first to review this product!
          </p>
        ) : (
          reviews.map((review) => {
            const reviewRating = Math.min(
              5,
              Math.max(0, Number(review.rating) || 0)
            );

            return (
              <article
                key={review.id}
                className="rounded-xl bg-gray-50 p-4"
              >
                <div className="flex flex-wrap justify-between gap-2">
                  <p className="font-semibold text-gray-900">
                    {review.name}
                  </p>

                  <span className="text-sm text-gray-500">
                    {review.date}
                  </span>
                </div>

                <p className="mt-1 text-yellow-500">
                  {"★".repeat(reviewRating)}
                  <span className="text-gray-300">
                    {"★".repeat(5 - reviewRating)}
                  </span>
                </p>

                <p className="mt-2 whitespace-pre-wrap text-gray-700">
                  {review.comment}
                </p>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}

export default ProductReviews;