module Api
  module V1
    class ImagesController < ApplicationController
      before_action :authenticate_user

      def index
        query = search_params[:q]
        page = search_params[:page]
        giphy_client = GiphyApi::GiphyClient.new(page: page, query: query, user: authenticated_user)
        giphy_client.search

        render json: giphy_client.response, status: giphy_client.status
      end

      private

      def search_params
        params.permit(:q, :page)
      end
    end
  end
end
