require 'rails_helper'

RSpec.describe "/posts", type: :request do
  let(:valid_attributes) {
    { title: "Sample Post", content: "This is a sample post content." }
  }

  let(:invalid_attributes) { { title: "", content: "" } }

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
    let!(:post) { Post.create! valid_attributes }

    before { get post_url(post), as: :json }

    it "renders a successful response" do
      expect(response).to be_successful
    end

    it "returns the requested post" do
      expect(JSON.parse(response.body)["title"]).to eq(post.title)
    end
  end

  describe "POST /create" do
    subject do
      post posts_url, params: params, as: :json
    end

    context "with valid parameters" do
      let(:params) { { post: valid_attributes } }

      it "creates a new Post" do
        expect { subject }.to change(Post, :count).by(1)
      end

      it "returns a response with a created http status" do
        subject
        expect(response).to have_http_status(:created)
      end

      it "renders a JSON response with the new post" do
        subject
        expect(JSON.parse(response.body)["title"]).to eq("Sample Post")
      end
    end

    context "with invalid parameters" do
      let(:params) { { post: invalid_attributes } }

      it "does not create a new Post" do
        expect { subject }.to change(Post, :count).by(0)
      end

      it "returns a response with an unprocessable entity http status" do
        subject
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "returns a JSON response with errors for the new post" do
        subject
        expect(JSON.parse(response.body)).to have_key("errors")
      end
    end
  end

  describe "PATCH /update" do
    let!(:post) { Post.create! valid_attributes }

    subject { patch post_url(post), params: params, as: :json }

    context "with valid parameters" do
      let(:new_attributes) {
        { title: "Updated Post", content: "This is updated content." }
      }
      let(:params) { { post: new_attributes } }

      it "updates the requested post" do
        expect { subject }.to change { post.reload.title }.from("Sample Post").to("Updated Post")
      end

      it "returns a response with http status ok" do
        subject
        expect(response).to have_http_status(:ok)
      end

      it "returns a JSON response with the post" do
        subject
        expect(JSON.parse(response.body)["title"]).to eq("Updated Post")
      end
    end

    context "with invalid parameters" do
      let(:params) { { post: invalid_attributes } }

      it "does not update the post" do
        expect { subject }.to_not change { post.reload.title }
      end

      it "returns a response with http status unprocessable entity" do
        subject
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "returns a JSON response with errors for the post" do
        subject
        expect(JSON.parse(response.body)).to have_key("errors")
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
