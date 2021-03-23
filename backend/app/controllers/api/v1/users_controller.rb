module Api
  module V1
    class UsersController < ApplicationController
      def create
        if user.save
          token = JWT.encode({ user_id: user.id }, ENV['JWT_SECRET_KEY'], 'HS256')
          render json: { user: user, token: token }, status: :created
        else
          render json: { errors: user.errors }, status: :unprocessable_entity
        end
      end

      private

      def user
        @user ||= User.new(user_params)
      end

      def user_params
        params.permit(:username, :password)
      end
    end
  end
end
