module GiphyApi
  class GiphyClient
    API_ENDPOINT = 'https://api.giphy.com/v1/gifs/search?'.freeze
    LIMIT = 25

    attr_accessor :data, :page, :query, :response, :status, :user

    def initialize(page:, query:, user:)
      self.page = page
      self.query = query
      self.user = user
    end

    def search
      response = RestClient.get(API_ENDPOINT + url_params)
      @data = JSON.parse(response)['data']
      @status = :ok
      @response = mapped_images
    rescue RestClient::ExceptionWithResponse => e
      @status = :bad_request
      @response = e
    end

    private

    def url_params
      @url_params ||= "api_key=#{ENV['GIPHY_API_KEY']}&q=#{query}&" \
            "limit=#{LIMIT}&offset=#{offset}"
    end

    def offset
      @offset ||= page.to_i * LIMIT
    end

    def mapped_images
      @data.map do |image|
        favorite_image = user.favorite_images.find_by(external_id: image['id'])
        {
          id: favorite_image&.id,
          external_id: image&.[]('id'),
          url: image&.[]('images')&.[]('original')&.[]('url'),
          favorite: !favorite_image.nil?
        }
      end
    end
  end
end
