require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:username) { |i| "username#{i}" }
    password { '123456' }
  end
end
