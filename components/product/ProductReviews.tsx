'use client';

import { useState, useEffect } from 'react';
import { Star, StarHalf, MessageCircle, ThumbsUp } from 'lucide-react';
import Button from '@/components/custom/Button';
import { api } from '@/lib/axios';
import { useToast } from '@/hooks/use-toast';

interface Review {
  id: string;
  userName?: string;
  rating: number;
  title?: string;
  comment: string;
  createdAt: string;
  isVerified: boolean;
  guestName?: string;
  user?: {
    firstName: string;
    lastName: string;
  };
}

interface ProductReviewsProps {
  productId: string;
  productName: string;
  reviews?: Review[];
}

const ProductReviews = ({ productId, productName, reviews: initialReviews }: ProductReviewsProps) => {
  const { toast } = useToast();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [guestName, setGuestName] = useState('');
  const [reviews, setReviews] = useState<Review[]>(initialReviews || []);
  const [loading, setLoading] = useState(!initialReviews);
  const [submitting, setSubmitting] = useState(false);

  // Fetch reviews from API if not provided
  useEffect(() => {
    if (!initialReviews) {
      fetchReviews();
    }
  }, [productId, initialReviews]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/reviews/product/${productId}`);
      if (response.success && response.data && response.data.reviews) {
        setReviews(response.data.reviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

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

  // Ensure reviews is always an array
  const reviewsArray = Array.isArray(reviews) ? reviews : [];
  
  const averageRating = reviewsArray.length > 0 
    ? reviewsArray.reduce((sum, review) => sum + review.rating, 0) / reviewsArray.length 
    : 0;
  const totalReviews = reviewsArray.length;

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userRating === 0 || !reviewText.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a rating and review text",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);

      const response = await api.post('/reviews', {
        productId,
        rating: userRating,
        title: reviewTitle,
        comment: reviewText,
        guestName: guestName || 'Anonymous',
      });

      if (response.success) {
        // Reset form
        setUserRating(0);
        setReviewText('');
        setReviewTitle('');
        setGuestName('');
        setShowReviewForm(false);
        
        // Refresh reviews
        await fetchReviews();
        
        toast({
          title: "Review Submitted!",
          description: "Thank you for your review! It has been posted successfully.",
        });
      }
    } catch (error: any) {
      console.error('Error submitting review:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
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
                const count = reviewsArray.filter(r => Math.floor(r.rating) === rating).length;
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Name (Optional)</label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter your name or leave blank for 'Anonymous'"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Review Title (Optional)</label>
              <input
                type="text"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Summarize your review"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
              <div className="flex items-center space-x-1">
                {renderStars(hoverRating || userRating, true, 'w-6 h-6')}
                <span className="ml-2 text-sm text-gray-600">
                  {userRating > 0 ? `${userRating} star${userRating !== 1 ? 's' : ''}` : 'Select rating'}
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Review *</label>
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
                disabled={submitting}
                className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
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
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading reviews...</p>
        </div>
      ) : reviewsArray.length === 0 ? (
        <div className="text-center py-8 text-gray-600 border border-gray-200 rounded-lg p-8">
          <MessageCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-lg font-semibold mb-2">No reviews yet</p>
          <p>Be the first to review this product!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviewsArray.map((review) => (
            <div key={review.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(review.rating, false, 'w-4 h-4')}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">
                        {review.user ? `${review.user.firstName} ${review.user.lastName}` : review.guestName || review.userName || 'Anonymous'}
                      </span>
                      {review.isVerified && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">{new Date(review.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
              {review.title && (
                <h6 className="font-semibold text-gray-800 mb-2">{review.title}</h6>
              )}
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductReviews;


