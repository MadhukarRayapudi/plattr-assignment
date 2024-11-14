import React, { Component } from "react";
import "./index.css";

class ReviewsPage extends Component {
  state = {
    reviews: [],
    bookTitle: "",
    author: "",
    reviewContent: "",
    reviewerName: "",
    error: null, // Store error message in state
  };

  componentDidMount() {
    this.fetchReviews();
  }

  // Fetch reviews with error handling
  fetchReviews = async () => {
    try {
      const response = await fetch("http://localhost:3000/reviews/");
      if (!response.ok) {
        throw new Error(`Failed to fetch reviews: ${response.statusText}`);
      }
      const data = await response.json();
      this.setState({ reviews: data });
    } catch (error) {
      console.error("Error fetching reviews:", error);
      this.setState({ error: error.message });
    }
  };

  // Submit review with error handling
  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/reviews/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookTitle: this.state.bookTitle,
          author: this.state.author,
          reviewContent: this.state.reviewContent,
          reviewerName: this.state.reviewerName,
        }),
      });

      if (!response.ok) {
        console.error("Failed to submit review. Status:", response.status);
        throw new Error("Failed to submit review");
      }

      // Reset form and fetch reviews again after successful submission
      this.setState(
        {
          bookTitle: "",
          author: "",
          reviewContent: "",
          reviewerName: "",
        },
        () => {
          this.fetchReviews();
        }
      );
    } catch (error) {
      console.error("Error submitting review:", error);
      this.setState({ error: error.message });
    }
  };

  // Delete review
  handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/reviews/${id}/`, { method: "DELETE" });
      this.fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
      this.setState({ error: error.message });
    }
  };

  // Handle input change
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { reviews, bookTitle, author, reviewContent, reviewerName, error } = this.state;

    return (
      <div className="reviews-container">
        <h1 className="reviews-title">Book Reviews</h1>
        {error && <p className="error-message">{error}</p>}
        <form className="review-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="bookTitle"
            value={bookTitle}
            onChange={this.handleChange}
            placeholder="Book Title"
            required
          />
          <input
            type="text"
            name="author"
            value={author}
            onChange={this.handleChange}
            placeholder="Author"
            required
          />
          <textarea
            name="reviewContent"
            value={reviewContent}
            onChange={this.handleChange}
            placeholder="Review Content"
            required
          />
          <input
            type="text"
            name="reviewerName"
            value={reviewerName}
            onChange={this.handleChange}
            placeholder="Reviewer’s Name"
            required
          />
          <button type="submit">Submit Review</button>
        </form>
        <ul className="review-list">
          {reviews.map((review) => (
            <li key={review.id} className="review-item">
              <h2>{review.book_title}</h2>
              <p><strong>Author:</strong> {review.author}</p>
              <p>{review.review_content}</p>
              <p><strong>Reviewed by:</strong> {review.reviewer_name}</p>
              <button onClick={() => this.handleDelete(review.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ReviewsPage;
