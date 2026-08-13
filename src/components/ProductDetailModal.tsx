import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Star, 
  ShoppingCart, 
  Heart, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  CheckCircle2, 
  Send, 
  User as UserIcon,
  MessageSquare
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    setActiveTab,
    addToCart,
    toggleWishlist,
    isInWishlist,
    reviews,
    addReview,
    currentUser
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Review Form state
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  if (!selectedProduct) {
    return (
      <div className="text-center py-12 space-y-3">
        <p className="text-slate-400">No product selected.</p>
        <button
          onClick={() => setActiveTab('store')}
          className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
        >
          Return to Store
        </button>
      </div>
    );
  }

  const images = [selectedProduct.imageUrl, ...(selectedProduct.additionalImages || [])];
  const productReviews = reviews.filter(r => r.productId === selectedProduct.id);
  const inWish = isInWishlist(selectedProduct.id);
  const effectivePrice = selectedProduct.discountPrice || selectedProduct.price;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addReview(selectedProduct.id, newRating, newComment);
    setNewComment('');
  };

  return (
    <div className="space-y-6">
      
      {/* Back Button */}
      <button
        onClick={() => setActiveTab('store')}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-xs font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Products Catalog
      </button>

      {/* Main Product Specs Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-100">
        
        {/* Left: Images */}
        <div className="space-y-4">
          <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
            <img
              src={images[activeImageIndex]}
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-3 left-3 px-3 py-1 rounded-md text-xs font-bold bg-slate-950/80 text-amber-300 border border-amber-500/30">
              {selectedProduct.categoryName}
            </span>
          </div>

          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx ? 'border-amber-500 scale-105' : 'border-slate-800 opacity-60'
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info & Actions */}
        <div className="space-y-5 flex flex-col justify-between">
          
          <div className="space-y-3">
            
            {/* Title & SKU */}
            <div>
              <div className="text-xs font-mono text-slate-400">SKU: {selectedProduct.sku}</div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1 leading-snug">
                {selectedProduct.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center text-amber-400 font-bold">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(selectedProduct.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-700'
                    }`}
                  />
                ))}
                <span className="ml-1.5">{selectedProduct.rating} / 5.0</span>
              </div>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">{productReviews.length} Ratings & Reviews</span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-3xl font-extrabold text-amber-400">
                ₹{effectivePrice.toLocaleString()}
              </span>
              {selectedProduct.discountPrice && (
                <>
                  <span className="text-sm text-slate-500 line-through">
                    ₹{selectedProduct.price.toLocaleString()}
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    SAVE ₹{(selectedProduct.price - selectedProduct.discountPrice).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
              {selectedProduct.detailedDescription || selectedProduct.description}
            </p>

            {/* Stock indicator */}
            <div className="text-xs">
              <span className="text-slate-400">Availability: </span>
              {selectedProduct.stock > 0 ? (
                <span className="text-emerald-400 font-bold">In Stock ({selectedProduct.stock} units)</span>
              ) : (
                <span className="text-rose-400 font-bold">Out of Stock</span>
              )}
            </div>

          </div>

          {/* Action Box */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            
            <div className="flex items-center gap-3">
              {/* Quantity selector */}
              <div className="flex items-center border border-slate-700 rounded-xl bg-slate-800/80">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-slate-300 hover:text-white font-bold"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                  className="px-3 py-2 text-slate-300 hover:text-white font-bold"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => addToCart(selectedProduct, quantity)}
                disabled={selectedProduct.stock <= 0}
                className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add {quantity} to Cart (₹{(effectivePrice * quantity).toLocaleString()})
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(selectedProduct.id)}
                className={`p-3 rounded-xl border transition-colors ${
                  inWish
                    ? 'bg-rose-500 border-rose-500 text-white'
                    : 'border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Heart className={`w-5 h-5 ${inWish ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-slate-400 border-t border-slate-800">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Genuine Item</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Express Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-amber-400 shrink-0" />
                <span>7 Days Easy Return</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Specifications Table */}
      {selectedProduct.specifications && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-3">
          <h3 className="font-bold text-sm text-amber-400 uppercase tracking-wider">
            Technical Specifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {Object.entries(selectedProduct.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 font-medium">{key}</span>
                <span className="text-slate-100 font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Reviews & Ratings Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-6 text-slate-100">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base text-white">Customer Reviews & Ratings</h3>
          </div>
          <span className="text-xs text-slate-400">{productReviews.length} Reviews</span>
        </div>

        {/* Submit Review Form */}
        <form onSubmit={handleReviewSubmit} className="bg-slate-950/60 border border-slate-800/90 rounded-xl p-4 space-y-3">
          <h4 className="text-xs font-bold text-slate-300">Write a Review for {selectedProduct.name}</h4>
          
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Your Rating:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setNewRating(star)}
                  className="p-1 text-amber-400 hover:scale-110 transition-transform"
                >
                  <Star className={`w-4 h-4 ${star <= newRating ? 'fill-amber-400' : 'text-slate-700'}`} />
                </button>
              ))}
            </div>
            <span className="font-bold text-amber-400">{newRating} Stars</span>
          </div>

          <textarea
            rows={2}
            placeholder="Share your experience with this product..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            required
          />

          <button
            type="submit"
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            Submit Review
          </button>
        </form>

        {/* Reviews List */}
        <div className="space-y-3">
          {productReviews.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No reviews yet for this product. Be the first to leave one!</p>
          ) : (
            productReviews.map((rev) => (
              <div key={rev.id} className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-950 text-indigo-300 flex items-center justify-center font-bold text-[10px]">
                      {rev.userName.charAt(0)}
                    </div>
                    <span className="font-bold text-slate-200">{rev.userName}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{rev.createdAt}</span>
                </div>

                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-800'}`}
                    />
                  ))}
                </div>

                <p className="text-slate-300 leading-relaxed">{rev.comment}</p>
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
};
