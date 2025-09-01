FactoryBot.define do
  factory :post do
    title { Faker::Book.title }
    content { Faker::Lorem::Paragraphs(sentence_count: 5) }
  end
end
