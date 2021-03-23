module Api
  module V1
    class FavoriteImagesController < ApplicationController
      before_action :authenticate_user

      def index
        render json: authenticated_user.favorite_images
      end

      def create
        if favorite_image.save
          render json: favorite_image, status: :ok
        else
          render json: {}, status: :unprocessable_entity
        end
      end

      def destroy
        favorite_image = authenticated_user.favorite_images.find(params[:id])
        favorite_image.destroy

        render json: {}, status: :ok
      rescue ActiveRecord::RecordNotFound
        render json: {}, status: :not_found
      end

      private

      def favorite_image_params
        params.permit(:external_id, :url, :keyword)
      end

      def favorite_image
        @favorite_image ||= authenticated_user.favorite_images.new(favorite_image_params)
      end
    end
  end
end
