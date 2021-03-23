require 'rails_helper'

RSpec.describe Api::V1::ImagesController, type: :controller do
  describe 'GET #index' do
    let(:user) { create(:user) }
    context 'with logged-in user' do
      let(:valid_params) do
        {

          page: 0,
          q: 'cats'
        }
      end

      it 'responds with a HTTP status code of 200' do
        token = JWT.encode({ user_id: user.id }, ENV['JWT_SECRET_KEY'], 'HS256')
        request.headers['Authorization'] = "Bearer #{token}"
        get 'index', params: valid_params
        expect(response).to have_http_status(200)
      end
    end

    context 'without authentication' do
      let(:valid_params) do
        {

          page: 0,
          q: 'cats'
        }
      end

      it 'responds with a HTTP status code of 401' do
        get 'index', params: valid_params
        expect(response).to have_http_status(401)
      end
    end
  end
end
