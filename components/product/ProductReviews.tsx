'use client';

import { useState } from 'react';
import { Star, StarHalf, MessageCircle, ThumbsUp } from 'lucide-react';
import Button from '@/components/custom/Button';

interface Review {
  id: number;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  verified: boolean;
}

interface ProductReviewsProps {
  productId: number;
  productName: string;
}

const ProductReviews = ({ productId, productName }: ProductReviewsProps) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [userName, setUserName] = useState('');

  // Mock reviews data - in a real app, this would come from an API
  const [reviews] = useState<Review[]>([
    {
      id: 1,
      userName: "Sarah M.",
      rating: 5,
      date: "2024-01-15",
      comment: "Absolutely love these licorice ropes! The sour cherry flavor is perfectly balanced and the texture is just right. My whole family enjoys them.",
      helpful: 12,
      verified: true
    },
    {
      id: 2,
      userName: "Mike R.",
      rating: 4,
      date: "2024-01-10",
      comment: "Great quality product. The cotton candy flavor tastes exactly like the real thing. Would definitely order again!",
      helpful: 8,
      verified: true
    },
    {
      id: 3,
      userName: "Emma T.",
      rating: 5,
      date: "2024-01-08",
      comment: "These are amazing! The sour apple ropes have that perfect tangy kick. Great for satisfying sweet cravings.",
      helpful: 15,
      verified: false
    },
    {
      id: 4,
      userName: "David C.",
      rating: 4,
      date: "2024-01-05",
      comment: "Good product overall. The blue raspberry flavor is nice, though I wish it was a bit more sour. Still recommend!",
      helpful: 6,
      verified: true
    }
  ]);

  const renderStars = (rating: number, interactive = false, size = 'w-4 h-4') => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`${size} text-yellow-400 fill-current ${interactive ? 'cursor-pointer' : ''}`}
          onClick={interactive ? () => setUserRating(i + 1) : undefined}
          onMouseEnter={interactive ? () => setHoverRating(i + 1) : undefined}
          onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf 
          key="half" 
          className={`${size} text-yellow-400 fill-current`}
        />
      );
    }

    // Fill remaining stars as empty
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`${size} text-gray-300 ${interactive ? 'cursor-pointer hover:text-yellow-200' : ''}`}
          onClick={interactive ? () => setUserRating(i + 1) : undefined}
          onMouseEnter={interactive ? () => setHoverRating(i + 1) : undefined}
          onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
        />
      );
    }

    return stars;
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRating === 0 || !reviewText.trim() || !userName.trim()) {
      alert('Please fill in all fields and select a rating');
      return;
    }

    // In a real app, this would submit to an API
    console.log('Review submitted:', {
      productId,
      userName,
      rating: userRating,
      comment: reviewText
    });

    // Reset form
    setUserRating(0);
    setReviewText('');
    setUserName('');
    setShowReviewForm(false);
    alert('Thank you for your review!');
  };

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-gray-900">Customer Reviews</h3>
        <Button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors flex items-center space-x-2"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Write a Review</span>
        </Button>
      </div>

      {/* Rating Summary */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
            <div className="flex items-center justify-center mt-1">
              {renderStars(averageRating, false, 'w-5 h-5')}
            </div>
            <div className="text-sm text-gray-600 mt-1">{totalReviews} reviews</div>
          </div>
          
          <div className="flex-1">
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = reviews.filter(r => Math.floor(r.rating) === rating).length;
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                  <div key={rating} className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600 w-8">{rating}</span>
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Write Your Review</h4>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex items-center space-x-1">
                {renderStars(hoverRating || userRating, true, 'w-6 h-6')}
                <span className="ml-2 text-sm text-gray-600">
                  {userRating > 0 ? `${userRating} star${userRating !== 1 ? 's' : ''}` : 'Select rating'}
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Share your thoughts about this product..."
                required
              />
            </div>
            
            <div className="flex space-x-3">
              <Button
                type="submit"
                className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors"
              >
                Submit Review
              </Button>
              <Button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  {renderStars(review.rating, false, 'w-4 h-4')}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{review.userName}</span>
                    {review.verified && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">{new Date(review.date).toLocaleDateString()}</div>
                </div>
              </div>
              <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm">{review.helpful}</span>
              </button>
            </div>
            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
