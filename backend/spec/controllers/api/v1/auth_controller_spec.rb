require 'rails_helper'

RSpec.describe Api::V1::AuthController, type: :controller do
  describe 'POST #login' do
    let(:user) { create(:user) }
    context 'with valid parameters' do
      let(:valid_params) do
        {

          username: user.username,
          password: user.password
        }
      end

      it 'responds with a HTTP status code of 200' do
        post 'login', params: valid_params
        expect(response).to have_http_status(200)
      end

      it 'returns the user and a JWT encoded token' do
        post 'login', params: valid_params
        parsed_body = JSON.parse(response.body)
        expect(parsed_body['user']['id']).to eq User.last.id
        expect(parsed_body['token']).to eq JWT.encode({ user_id: user.id }, ENV['JWT_SECRET_KEY'], 'HS256')
      end
    end

    context 'with invalid parameters' do
      let(:invalid_params) do
        {

          username: 'username',
          password: '123456'
        }
      end

      it 'responds with a HTTP status code of 401' do
        post 'login', params: invalid_params
        expect(response).to have_http_status(401)
      end
    end
  end
end
