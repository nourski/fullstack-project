module Api
  module V1
    class AuthController < ApplicationController
      def login
        user = User.find_by(username: login_params[:username])
        if user&.authenticate(login_params[:password])
          token = JWT.encode({ user_id: user.id }, ENV['JWT_SECRET_KEY'], 'HS256')
          render json: { user: user, token: token }
        else
          render json: { error: 'invalid login' }, status: :unauthorized
        end
      end

      private

      def login_params
        params.permit(:username, :password)
      end
    end
  end
end
