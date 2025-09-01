require 'rails_helper'

RSpec.describe "/posts", type: :request do
  let(:valid_attributes) {
    { title: "Sample Post", content: "This is a sample post content." }
  }

  let(:invalid_attributes) { {} }

  describe "GET /index" do
    let!(:post) { Post.create! valid_attributes }

    before { get posts_url, as: :json }

    it "renders a successful response" do
      expect(response).to be_successful
    end

    it "returns a list of posts" do
      expect(JSON.parse(response.body)).to be_an_instance_of(Array)
    end

    it "returns all posts" do
      expect(JSON.parse(response.body).size).to eq(1)
    end

    it "includes the created post in the response" do
      expect(JSON.parse(response.body).first["title"]).to eq(post.title)
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      post = Post.create! valid_attributes
      get post_url(post), as: :json
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Post" do
        expect {
          post posts_url,
               params: { post: valid_attributes }, headers: valid_headers, as: :json
        }.to change(Post, :count).by(1)
      end

      it "renders a JSON response with the new post" do
        post posts_url,
             params: { post: valid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:created)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Post" do
        expect {
          post posts_url,
               params: { post: invalid_attributes }, as: :json
        }.to change(Post, :count).by(0)
      end

      it "renders a JSON response with errors for the new post" do
        post posts_url,
             params: { post: invalid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested post" do
        post = Post.create! valid_attributes
        patch post_url(post),
              params: { post: new_attributes }, headers: valid_headers, as: :json
        post.reload
        skip("Add assertions for updated state")
      end

      it "renders a JSON response with the post" do
        post = Post.create! valid_attributes
        patch post_url(post),
              params: { post: new_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors for the post" do
        post = Post.create! valid_attributes
        patch post_url(post),
              params: { post: invalid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested post" do
      post = Post.create! valid_attributes
      expect {
        delete post_url(post), headers: valid_headers, as: :json
      }.to change(Post, :count).by(-1)
    end
  end
end
